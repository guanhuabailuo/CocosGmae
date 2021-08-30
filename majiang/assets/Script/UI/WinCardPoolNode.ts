// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PoolType } from "../Define/Type";
import Card from "../GamePlay/Card";
import { CombTag } from "../GamePlay/WinFilter/Filter";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    tags:Array<CombTag> = new Array();
    start () {
        
    }

    join(cardNode:CardNode){
        cardNode.poolType = PoolType.WinPool;
        cardNode.node.setParent(this.node);
    }
}
