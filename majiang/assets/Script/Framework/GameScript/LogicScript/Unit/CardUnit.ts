import Card from "../../../../GamePlay/Card";
import { CardInfo } from "../../../../UI/GamePlayNode";
import GameCenter from "../../GameCenter";
import MoveViewAction from "../../ViewScript/ViewAction/MoveViewAction";
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




}