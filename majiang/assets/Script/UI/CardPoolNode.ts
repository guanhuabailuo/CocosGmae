// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { CardType, PoolType } from "../Define/Type";
import { EVENT } from "../Framework/Event/EventMgr";
import { RunManyCallBack } from "../Framework/Utils/Utils";
import Card from "../GamePlay/Card";
import CardPool from "../GamePlay/CardPool";
import GamePlay, { Game_Play_ins } from "../GamePlay/GamePlay";
import { CombTag } from "../GamePlay/WinFilter/Filter";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardPoolNode extends cc.Component {

    cardPool:CardPool;

    layout:cc.Layout;

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
        EVENT.on(EventId.Send_Card_Select,this.onTouchStart,this,false);
        this.cardPool = new CardPool(7);
        EVENT.on(EventId.Exchange_Card_Start,this.onCardExchageStart,this,false);
        EVENT.on(EventId.Exchange_Card_End,this.onCardExchageEnd,this,false);
        
        this.layout = this.getComponent(cc.Layout);
    }



    start () {
        
    }

    onCardExchageStart(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    onCardExchageEnd(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
    }
    
    join(cardNode:CardNode,index?:number){
        cardNode.node.setParent(this.node);
        cardNode.poolType = PoolType.GamePool;
        if(index>-1){
            cardNode.node.setSiblingIndex(index);
            if(!this.cardPool.containCard(cardNode.card)){
                this.cardPool.join(cardNode.card,index);
            }
        }
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
        // if (this.cardPool.containCard(card)) {
        //     return;
        // }
        if (this.cardPool.canAddSelectCard()) {
            this.cardPool.addSelectCard(card);
            cardCp.onSelect();
        }

        if (this.cardPool.canStartExchange()) {
            EVENT.emit(EventId.Exchange_Card_Start);
            this.cardPool.exchange();
            this.layout.enabled = false;
            let a = this.cardPool.selectCards[0];
            let b = this.cardPool.selectCards[1];

            let posb = b.node.position;
            let posa = a.node.position;
            let  callBack: RunManyCallBack = new RunManyCallBack(this,2,()=>{
                this.layout.enabled = true;
                this.exchangeCardSiblingIndex(a,b);
                this.cardPool.selectCards = new Array();
                EVENT.emit(EventId.Exchange_Card_End)
                this.cardPool.checkComb();
            })
            let actionA = cc.tween(a.node).to(0.5,{position:posb}).call(()=>{
                callBack.oncall();
            }).start();
            let actionB = cc.tween(b.node).to(0.5,{position:posa}).call(()=>{
                callBack.oncall();
            }).start();;

            

            
        }
    }

    exchangeCardSiblingIndex(a:Card,b:Card){
        let acp = a.node.getComponent(CardNode);
        let bcp = b.node.getComponent(CardNode);

        if(acp.poolType == PoolType.GamePool&&bcp.poolType == PoolType.GamePool){
            let aIndex =  a.node.getSiblingIndex();
            let bIndex = b.node.getSiblingIndex();
            a.node.setSiblingIndex(bIndex);
            b.node.setSiblingIndex(aIndex);
            return;
        }
        if(acp.poolType == PoolType.GamePool&&bcp.poolType == PoolType.SendPool){
            let aIndex =  a.node.getSiblingIndex();
            let bIndex = b.node.getSiblingIndex();
            Game_Play_ins.sendCardPoolNode.join(acp);
            this.join(bcp,aIndex);
            return;
           
        }

        if(acp.poolType == PoolType.SendPool&&bcp.poolType == PoolType.GamePool){
            let aIndex =  a.node.getSiblingIndex();
            let bIndex = b.node.getSiblingIndex();
            Game_Play_ins.sendCardPoolNode.join(bcp);
            this.join(acp,bIndex);
            return;
        }


        
    }


}
