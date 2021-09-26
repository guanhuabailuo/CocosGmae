import { PoolType } from "../../../../Define/Type";
import Card from "../../../../GamePlay/Card";
import { CardInfo } from "../../../../UI/GamePlayNode";
import GameCenter from "../../GameCenter";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
import TouchMoveViewAction from "../../ViewScript/ViewAction/TouchMoveViewAction";
import TouchMoveAction from "../LogicAction/TouchMoveAction";
import BaseUnit, { UnitType } from "./BaseUnit";

export default class CardUnit extends BaseUnit{
    
     _card:CardInfo;

    constructor(uuid:string,position:cc.Vec3,card:CardInfo){
        super(uuid,UnitType.Player,position);
        this._card = card;
    }

    start(){
        GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(this._uuid,undefined));
    }


    handlerTouchMoveAction(action: TouchMoveAction) {
        if(this._card.pooltype == PoolType.SendPool){
            GameCenter.GAME_CENTER.pushViewAction(new TouchMoveViewAction(this._uuid,action.pos));
        }
    }



}