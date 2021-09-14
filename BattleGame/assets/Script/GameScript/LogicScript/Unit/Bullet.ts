import { RoomTickType } from "../../../Net/WebSocket/Code";
import GameCenter from "../../GameCenter";
import DestoryViewAction from "../../ViewScript/ViewAction/DestoryViewAction";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import DestoryUnitAction from "../LogicAction/DestoryUnitAction";
import MoveAction from "../LogicAction/MoveAction";
import PositionAction from "../LogicAction/PositionAction";
import BaseUnit, { UnitType } from "./BaseUnit";

export default class Bullet extends BaseUnit{

    dir:cc.Vec2;
    speed:number;

    constructor(uuid:string,position:cc.Vec3,dir:cc.Vec2,speed:number){
        super(uuid,UnitType.Bullet,position);
        this.dir = dir;
        this.speed = speed;
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
    }

    

}

export interface BulletData{
    pos:cc.Vec3;
    dir:cc.Vec2;
    speed:number;
    damage:number;

}