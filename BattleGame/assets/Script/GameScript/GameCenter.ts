// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NetNode from '../Net/NetNode'
import { RequestCode, ResponseCode, RoomTickType } from '../Net/WebSocket/Code'
import { ClientPackage } from '../Net/WebSocket/WebSocketClient'
import GameData from './GameData/GameData'
import BaseLogicAction from './LogicScript/LogicAction/BaseLogicAction'
import DestoryUnitAction from './LogicScript/LogicAction/DestoryUnitAction'
import MoveAction from './LogicScript/LogicAction/MoveAction'
import OnAttackAction from './LogicScript/LogicAction/OnAttackAction'
import LogicCenter from './LogicScript/LogicCenter'
import LogicTimer from './LogicScript/Timer'
import { UnitType } from './LogicScript/Unit/BaseUnit'
import Bullet, { BulletData } from './LogicScript/Unit/Bullet'
import Knife from './LogicScript/Unit/Knife'
import Monster from './LogicScript/Unit/Monster'
import Player from './LogicScript/Unit/Player'
import BaseViewAction from './ViewScript/ViewAction/BaseViewAction'
import DestoryViewAction from './ViewScript/ViewAction/DestoryViewAction'
import MoveViewAction from './ViewScript/ViewAction/MoveViewAction'
import ViewCenter from './ViewScript/ViewCenter'
import KnifeKeeperComponet from './ViewScript/ViewUnit/KnifeKeeperComponet'
import UnitCollideComponet from './ViewScript/ViewUnit/UnitCollideComponet'
import UnitViewComponet from './ViewScript/ViewUnit/UnitViewComponet'

const { ccclass, property } = cc._decorator

@ccclass
export default class GameCenter extends cc.Component {

    
    public static LOGIC_TICK: number = 50

    public static GAME_CENTER: GameCenter
    test:cc.Layout

    @property({ type: cc.Prefab })
    unit: cc.Prefab = undefined

    @property({type:cc.Prefab})
    knifePrefab = undefined;

    _ViewCenter: ViewCenter

    _LogicCenter: LogicCenter

    _bulletPool: cc.NodePool

    _MonsterPool:cc.NodePool

    _KnifePool:cc.NodePool

    _size:cc.Size;

    _createMonsterTimer:LogicTimer;

    _createKnifeTimer:LogicTimer;

    onLoad() {
        this._ViewCenter = this.getComponent(ViewCenter)
        this._LogicCenter = new LogicCenter();
        GameCenter.GAME_CENTER = this;
        this.initBulletPool();
        this.initMonsterPool();
        this.initKnifePool();
        this._size =  cc.view.getCanvasSize();
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this._createMonsterTimer = new LogicTimer(this,1,()=>{
            //this.createMonster();
        })
        if(GameData.INS.isMaster){
            this._createKnifeTimer = new LogicTimer(this,2,()=>{
                let x = Math.floor(Math.random()*500 - Math.random()*500); 
                let y = Math.floor(Math.random()*500 - Math.random()*500);
                let data = {type:RoomTickType.Create_Knife,position:{x:x,y:y,z:0}}
                this.pushPackage(data);
            })
        }
    }

    createUnitWithMembers() {
        let members = GameData.INS.roomeDate.members
        for (let i = 0; i < members.length; i++) {
            const element = members[i]
            let unitNode = cc.instantiate(this.unit)
            let cp = unitNode.getComponent(UnitViewComponet)
            cp.init(element.uuid,UnitType.Player);
            unitNode.group = "Player"
            let unit = new Player(cp.unitId, new cc.Vec3(i * 100, i * 100, 0));
            this._LogicCenter.addUnit(unit)
            this._ViewCenter.addUnit(cp, unit._position)
        }
    }

    initMonsterPool(){
        this._MonsterPool = new cc.NodePool(UnitViewComponet)
        for (let i = 0; i < 100; i++) {
            let MonsterNode = cc.instantiate(this.unit)
            MonsterNode.group = "Monster"
            MonsterNode.addComponent(UnitCollideComponet)
            let collideCp = MonsterNode.getComponent(UnitCollideComponet)
            let fun = (other: cc.BoxCollider, self: cc.BoxCollider) => {
                let selfCp = self.getComponent(UnitViewComponet)
                let otherCp = other.getComponent(UnitViewComponet)
                GameCenter.GAME_CENTER.pushLogicAction(new OnAttackAction(otherCp.unitId, 10))
                GameCenter.GAME_CENTER.pushLogicAction(new DestoryUnitAction(selfCp.unitId))
                GameCenter.GAME_CENTER.pushViewAction(new DestoryViewAction(selfCp.unitId))
            }
            collideCp.init(collideCp, fun)
            this._MonsterPool.put(MonsterNode)
        }
    }

    initBulletPool() {
        this._bulletPool = new cc.NodePool(UnitViewComponet)
        for (let i = 0; i < 100; i++) {
            let bulletNode = cc.instantiate(this.unit)
            let back: cc.Node = bulletNode.getChildByName('Back')
            let boxCp =  bulletNode.getComponent(cc.BoxCollider);
            boxCp.size = new cc.Size(40,80);
            back.width = 40
            back.height = 80
            bulletNode.addComponent(UnitCollideComponet)
            let collideCp = bulletNode.getComponent(UnitCollideComponet)
            let fun = (other: cc.BoxCollider, self: cc.BoxCollider) => {
                let selfCp = self.getComponent(UnitViewComponet)
                let otherCp = other.getComponent(UnitViewComponet)
                GameCenter.GAME_CENTER.pushLogicAction(new OnAttackAction(otherCp.unitId, 10))
                GameCenter.GAME_CENTER.pushLogicAction(new DestoryUnitAction(selfCp.unitId))
                GameCenter.GAME_CENTER.pushViewAction(new DestoryViewAction(selfCp.unitId))
            }
            collideCp.init(collideCp, fun)
            this._bulletPool.put(bulletNode)
        }
    }

    initKnifePool(){
        this._KnifePool = new cc.NodePool(UnitViewComponet)
        for (let i = 0; i < 200; i++) {
            let knifeNode = cc.instantiate(this.knifePrefab)
            knifeNode.addComponent(UnitCollideComponet)
            let collideCp = knifeNode.getComponent(UnitCollideComponet)
            let fun = (other: cc.BoxCollider, self: cc.BoxCollider) => {
                let knifeKeeperCp =  other.getComponent(KnifeKeeperComponet);
                if(!knifeKeeperCp){
                    return;
                }
                knifeKeeperCp.addKnife(self.node);
            }
            collideCp.init(collideCp, fun)
            this._KnifePool.put(knifeNode)
        }
    }

    createKnife(position:cc.Vec3){
        if(this._KnifePool.size()<=0){
            return
        }
        let knifeNode =  this._KnifePool.get();
        let cp = knifeNode.getComponent(UnitViewComponet);
        let uuid = this._LogicCenter.generateUid();
        cp.init(uuid,UnitType.Knife);
        let bulletUnit = new Knife(uuid,position);
        this._LogicCenter.addUnit(bulletUnit);
        this._ViewCenter.addUnit(cp, position);
    }

    createBullet(parentUuid: string,ownerType:UnitType,data:BulletData) {
        if (this._bulletPool.size() > 0) {
            let bulletNode: cc.Node = this._bulletPool.get();
            if(ownerType == UnitType.Monster){
                bulletNode.group = "MonsterBullet";
            }
            if(ownerType == UnitType.Player){
                bulletNode.group = "PlayerBullet";
            }
            let cp = bulletNode.getComponent(UnitViewComponet);
            let uuid = this._LogicCenter.generateUid();
            cp.init(uuid,UnitType.Bullet);
            let bulletUnit = new Bullet(uuid,data.pos, data.dir, data.speed);
            this._LogicCenter.addUnit(bulletUnit);
            this._ViewCenter.addUnit(cp, data.pos);
        }
    }

    createMonster(){
        if(this._MonsterPool.size()>0){
            let monsterNode: cc.Node = this._MonsterPool.get();
            let cp = monsterNode.getComponent(UnitViewComponet);
            let uuid = this._LogicCenter.generateUid();
            cp.init(uuid,UnitType.Monster);
            let pos:cc.Vec3 = new cc.Vec3(Math.random()*1000,400,0); 
            let monsterUnit = new Monster(uuid,pos,50,new cc.Vec2(0,-1));
            this._LogicCenter.addUnit(monsterUnit);
            this._ViewCenter.addUnit(cp, pos);
        }
    }

    retuenBulletPool(node:cc.Node){
        this._bulletPool.put(node);
    }

    retuenMonsterPool(node:cc.Node){
        this._MonsterPool.put(node);
    }

    start() {
        NetNode.addMessageListener(ResponseCode.RomeTick, this._LogicCenter.onTickMessage, this._LogicCenter);
        this.createUnitWithMembers();
    }

    update(dt) {
        this._LogicCenter.update(dt);
        this._ViewCenter.gameUpdate(dt);
        this._createMonsterTimer.update(dt);
        this._createKnifeTimer?.update(dt);
    }

    pushViewAction(action: BaseViewAction) {
        this._ViewCenter.pushAction(action);
    }

    pushLogicAction(action: BaseLogicAction) {
        this._LogicCenter.pushAction(action);
    }

    pushPackage(data: {}) {
        this._LogicCenter.pushPackage(data);
    }

    get size():cc.Size{
        return this._size;
    }
}