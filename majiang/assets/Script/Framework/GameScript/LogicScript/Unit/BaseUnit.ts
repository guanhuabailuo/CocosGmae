import BaseLogicAction from "../LogicAction/BaseLogicAction";
import MoveAction from "../LogicAction/MoveAction";
import PositionAction from "../LogicAction/PositionAction";

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

    onDestory(){

    }

    handlerAction(action: BaseLogicAction) {
        if(action instanceof MoveAction){
            this.handlerMoveAction(action);
        }
        if(action instanceof PositionAction){
            this.handlerPositionAction(action);
        }
    }

    handlerMoveAction(action:MoveAction){

    }

    handlerPositionAction(action:PositionAction){

    }

}


export enum UnitType {
    Player = "player",
    Wall = "Wall",
    Monster = "Monster",
    Bullet = "Bullet",
    Knife = "Knife"
}