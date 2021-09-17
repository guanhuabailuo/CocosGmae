import { CardInfo } from "../../../../UI/GamePlayNode";
import BaseViewAction from "./BaseViewAction";

export default class DestoryViewAction extends BaseViewAction{
    
    cards:CardInfo[];

    constructor(targetUid:string,cardInfos:CardInfo[]){
        super(targetUid);
        this.cards = cardInfos;
    }


}