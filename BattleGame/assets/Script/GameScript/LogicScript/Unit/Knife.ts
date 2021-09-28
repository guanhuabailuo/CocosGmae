import { RoomTickType } from "../../../Net/WebSocket/Code";
import GameCenter from "../../GameCenter";
import DestoryViewAction from "../../ViewScript/ViewAction/DestoryViewAction";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import DestoryUnitAction from "../LogicAction/DestoryUnitAction";
import MoveAction from "../LogicAction/MoveAction";
import PositionAction from "../LogicAction/PositionAction";
import BaseUnit, { UnitType } from "./BaseUnit";

export default class Knife extends BaseUnit{

    dir:cc.Vec2;
    speed:number;

    constructor(uuid:string,position:cc.Vec3){
        super(uuid,UnitType.Bullet,position);
    }

    start(dt:number){
      
    }

    update(dt:number){
       
    }

    

}

