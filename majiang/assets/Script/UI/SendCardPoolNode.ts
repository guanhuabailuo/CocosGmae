// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CardType, PoolType } from "../Define/Type";
import Card from "../GamePlay/Card";
import CardPool from "../GamePlay/CardPool";
import { Game_Play_ins } from "../GamePlay/GamePlay";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SendCardPoolNode extends cc.Component {
    
    
    cardNode:CardNode;

    start () {

    }

    join(cardNode:CardNode){
        this.cardNode = cardNode;
        this.cardNode.poolType = PoolType.SendPool;
        cardNode.node.setParent(this.node);
        cardNode.node.position = cc.Vec3.ZERO;
    }

    skipCard(){
        this.node.destroyAllChildren();
        Game_Play_ins.gamePlayNode.drawCard();
    }


}
