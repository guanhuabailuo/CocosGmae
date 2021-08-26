// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "../GamePlay/Card";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardNode extends cc.Component {
    

    @property({type:cc.Label})
    label:cc.Label = null;

    @property({type:cc.Node})
    border:cc.Node;

    card:Card;

    tween:cc.Tween;

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
        this.border.opacity = 0;
        EVENT.on(EventId.Exchange_Card_Start,this.onCardExchageStart,this,false);
        EVENT.on(EventId.Exchange_Card_End,this.onCardExchageEnd,this,false)
        
    }

    onCardExchageStart(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    onCardExchageEnd(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
        if (this.tween) {
            this.tween.stop();
            this.tween = undefined;
            this.border.opacity = 0;
        }
    }

    initUnit(unit:Card){
        this.card = unit;
        this.card.init(this.node);
        this.label.string ="" +this.card.number+this.card.type;
    }

    onSelect() {
        this.tween =  cc.tween(this.border).to(1,{opacity:255}).to(1,{opacity:50}).to(1,{opacity:255}).start();
    }

    onTouchStart(event:cc.Event.EventTouch){
       event.card = this;
    }

    onTouchMove(event:cc.Event.EventTouch){

    }
    


}
