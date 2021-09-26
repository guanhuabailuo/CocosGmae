import { CardInfo } from "../../../../UI/GamePlayNode";
import { CombTag } from "../../LogicScript/FilterNew";
import BaseViewAction from "./BaseViewAction";

export default class DestoryViewAction extends BaseViewAction{

    tag:CombTag

    constructor(tag:CombTag){
        super(undefined);
        this.tag = tag;
    }


}