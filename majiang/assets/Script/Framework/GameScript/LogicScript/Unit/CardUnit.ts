import Card from "../../../../GamePlay/Card";
import { CardInfo } from "../../../../UI/GamePlayNode";
import BaseUnit, { UnitType } from "./BaseUnit";

export default class CardUnit extends BaseUnit{
    
     _card:CardInfo;

    constructor(uuid:string,position:cc.Vec3,card:CardInfo){
        super(uuid,UnitType.Player,position);
        this._card = card;
    }






}