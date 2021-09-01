import BaseLogicAction from "../LogicAction/BaseLogicAction";
import MoveAction from "../LogicAction/MoveAction";

export default class BaseUnit{
    

    _unitType:UnitType;
    _uuid:string;
    _position:cc.Vec3;

    constructor(uuid:string,unitType:UnitType,position:cc.Vec3){
        this._uuid = uuid;
        this._unitType = unitType;
        this._position = position;
    }    

    start(dt:number){

    }

    update(dt:number){

    }

    destory(dt:number){

    }

    handlerAction(action: BaseLogicAction) {
        if(action instanceof MoveAction){
            this.handlerMoveAction(action);
        }
    }

    handlerMoveAction(action:MoveAction){

    }

}

export enum UnitType{
    Player = "player",
    Wall = "Wall",
    Monster = "Monster",
}