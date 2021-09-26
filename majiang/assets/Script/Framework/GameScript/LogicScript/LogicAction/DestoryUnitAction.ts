import { CardInfo } from "../../../../UI/GamePlayNode";
import BaseLogicAction from "./BaseLogicAction";

export default class DestoryUnitAction extends BaseLogicAction{
    
    cards:CardInfo[];

    constructor(targetUid:string,cardInfos:CardInfo[]){
        super(targetUid);
        this.cards = cardInfos;
    }


}