import { RoomTickType } from "../../../Net/WebSocket/Code";
import GameCenter from "../../GameCenter";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import MoveAction from "../LogicAction/MoveAction";
import PositionAction from "../LogicAction/PositionAction";
import LogicTimer from "../Timer";
import BaseUnit, { UnitType } from "./BaseUnit";
import { BulletData } from "./Bullet";

export default class Player extends BaseUnit{

    constructor(uuid:string,position:cc.Vec3){
        super(uuid,UnitType.Player,position);
        this._AttackTimer = new LogicTimer(this,0.5,()=>{
            let data:BulletData = {pos:new cc.Vec3(this._position.x,this._position.y+80),dir: new cc.Vec2(0,1),speed:300,damage:10}
            GameCenter.GAME_CENTER.createBullet(this._uuid,this._unitType,data);
        },-1)
    }

    _tempX = 0;
    _tempY = 0;

    _posChange = false;

    _AttackTimer:LogicTimer;

    start(dt:number){
        this._tempX = this._position.x;
        this._tempY = this._position.y;
    }

    update(dt:number){
        if(this._posChange){
            let data = {type:RoomTickType.posiiton,uuid:this._uuid,position:{x:this._tempX,y:this._tempY}}
            GameCenter.GAME_CENTER.pushPackage(data);
            this._posChange = false;
        }
        if(this._AttackTimer){
            //this._AttackTimer.update(dt);
        }
    }

    handlerMoveAction(moveAction:MoveAction){
        this._tempX = Math.floor(this._position.x + moveAction.dir.x*20);
        this._tempY = Math.floor(this._position.y + moveAction.dir.y*20);
        this._posChange = true;
    }

    handlerPositionAction(posAction:PositionAction){
        this._position = posAction.pos;
        this._tempX = this._position.x;
        this._tempY = this._position.y;
        GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(this._uuid,this._position))
    }

}