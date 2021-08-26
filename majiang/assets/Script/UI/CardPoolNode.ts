// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "../GamePlay/Card";
import CardPool from "../GamePlay/CardPool";
import GamePlay, { Game_Play_ins } from "../GamePlay/GamePlay";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardPoolNode extends cc.Component {

    cardPool:CardPool;

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
        this.cardPool = Game_Play_ins.cardPool;
        EVENT.on(EventId.Exchange_Card_Start,this.onCardExchageStart,this,false);
        EVENT.on(EventId.Exchange_Card_End,this.onCardExchageEnd,this,false)
    }

    onCardExchageStart(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    onCardExchageEnd(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
    }
    



    onTouchStart(event:cc.Event.EventTouch){
        if ( !event.card) {
            return;
        }
        if ( !(event.card instanceof CardNode)) {
            return;
        }
        let currentTaret =  event.card  as CardNode;
        let cardCp  = currentTaret.getComponent(CardNode);
        if(!cardCp){
            return;
        }
        let card = cardCp.card;
        if (this.cardPool.containCard(card)) {
            return;
        }
        if (this.cardPool.canAddSelectCard()) {
            this.cardPool.addSelectCard(card);
            cardCp.onSelect();
        }

        if (this.cardPool.canStartExchange()) {
            EVENT.emit(EventId.Exchange_Card_Start);
            this.cardPool.exchange();
            let a = this.cardPool.selectCards[0];
            let b = this.cardPool.selectCards[1];
            this.exchangeCardSiblingIndex(a,b);
            this.cardPool.selectCards = new Array();
            EVENT.emit(EventId.Exchange_Card_End)
        }
    }

    exchangeCardSiblingIndex(a:Card,b:Card){
        let aIndex =  a.node.getSiblingIndex();
        let bIndex = b.node.getSiblingIndex();
        a.node.setSiblingIndex(bIndex);
        b.node.setSiblingIndex(aIndex);
    }


}
