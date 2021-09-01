import GameCenter from "../../GameCenter";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import MoveAction from "../LogicAction/MoveAction";
import BaseUnit, { UnitType } from "./BaseUnit";

export default class Player extends BaseUnit{

    constructor(uuid:string,unitType:UnitType,position:cc.Vec3){
        super(uuid,unitType,position);
    }  

    start(dt:number){

    }

    update(dt:number){

    }

    destory(dt:number){

    }

    handlerMoveAction(moveAction:MoveAction){
        let tempX = this._position.x + moveAction.dir.x;
        let tempY = this._position.y + moveAction.dir.y;
        this._position = new cc.Vec3(tempX,tempY);
        GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(this._uuid,this._position))
    }

}