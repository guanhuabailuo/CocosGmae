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
import CardPoolNode from "./CardPoolNode";
import SendCardPoolNode from "./SendCardPoolNode";
import WinCardPoolNode from "./WinCardPoolNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayNode extends cc.Component {

    @property({type:cc.Prefab})
    card:cc.Prefab = null;

    @property({type:cc.Node})
    cardPool:cc.Node = null;

    @property({type:cc.Node})
    sendCardPoolNode:cc.Node = null;

    @property({type:cc.Node})
    winCardPoolNode:cc.Node = null;

    gamePlay:GamePlay;

    onLoad(){
        this.gamePlay = Game_Play_ins;
        this.gamePlay.cardPoolNode = this.cardPool.getComponent(CardPoolNode);
        this.gamePlay.sendCardPoolNode = this.sendCardPoolNode.getComponent(SendCardPoolNode);
        this.gamePlay.gamePlayNode = this;
        this.gamePlay.winCardPoolNode = this.winCardPoolNode.getComponent(WinCardPoolNode);
    }

    start () {
        for (let i = 0; i < 16; i++) {
            let cardNode =  this.createCardNode(CardType.tiao,i);
            this.gamePlay.cardPoolNode.join(cardNode.getComponent(CardNode),i);
        }
        let cardNode =  this.createCardNode(CardType.wan,1);
        this.gamePlay.sendCardPoolNode.join(cardNode.getComponent(CardNode));
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
