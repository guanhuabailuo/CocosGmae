import { CardInfo } from "../../../../UI/GamePlayNode";
import BaseLogicAction from "./BaseLogicAction";

export default class RemoveAction extends BaseLogicAction{
    
    cardinfo:CardInfo;
   
    
    constructor(targetUid:string,cardInfo:CardInfo){
        super(targetUid);
        this.cardinfo = cardInfo;
    }

    

}