import { RoomTickType } from "../../../Net/WebSocket/Code";
import GameCenter from "../../GameCenter";
import DestoryViewAction from "../../ViewScript/ViewAction/DestoryViewAction";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import DestoryUnitAction from "../LogicAction/DestoryUnitAction";
import MoveAction from "../LogicAction/MoveAction";
import PositionAction from "../LogicAction/PositionAction";
import LogicTimer from "../Timer";
import BaseUnit, { UnitType } from "./BaseUnit";
import { BulletData } from "./Bullet";

export default class Monster extends BaseUnit{

    attackTimer:LogicTimer;
    speed: number;
    dir: cc.Vec2;

    constructor(uuid:string,position:cc.Vec3,speed:number,dir:cc.Vec2){
        super(uuid,UnitType.Monster,position);
        this.attackTimer = new LogicTimer(this,1,this.attack);
        this.speed = speed;
        this.dir = dir;
    }


    start(dt:number){
        
    }

    update(dt:number){
        this._position.x += dt*this.speed*this.dir.x;
        this._position.y += dt*this.speed*this.dir.y;
        if(Math.abs(this._position.x) > GameCenter.GAME_CENTER.size.width + 50 || Math.abs(this._position.y) > GameCenter.GAME_CENTER.size.height + 100  ){
            GameCenter.GAME_CENTER.pushLogicAction(new DestoryUnitAction(this._uuid));
            GameCenter.GAME_CENTER.pushViewAction(new DestoryViewAction(this._uuid));
            return;
        }
        GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(this._uuid,this._position));
        this.attackTimer.update(dt);
    }

    attack(){
        let data:BulletData = {pos:new cc.Vec3(this._position.x,this._position.y-80,0),dir: new cc.Vec2(0,-1),speed:200,damage:10}
        GameCenter.GAME_CENTER.createBullet(this._uuid,this._unitType,data);
    }
    

}