// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CardType } from "../Define/Type";
import Card from "../GamePlay/Card";
import GamePlay, { Game_Play_ins } from "../GamePlay/GamePlay";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Prefab})
    card:cc.Prefab = null;

    @property({type:cc.Node})
    cardPool:cc.Node = null;

    gamePlay:GamePlay;

    onLoad(){
        this.gamePlay = Game_Play_ins;
    }

    start () {
        for (let i = 0; i < 16; i++) {
            let cardNode =  this.createCardNode(CardType.tiao,i);
            cardNode.setParent(this.cardPool);
        }
        
    }

    createCardNode(cardType:CardType,num:number){
        let cardNode = cc.instantiate(this.card);
        let cardCp = cardNode.getComponent(CardNode);
        let card:Card = new Card(cardType,num);
        cardCp.card = card;
        card.node = cardNode;
        return cardNode;
    }

    
}
