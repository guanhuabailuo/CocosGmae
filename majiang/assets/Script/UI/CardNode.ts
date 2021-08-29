// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { PoolType } from "../Define/Type";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "../GamePlay/Card";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardNode extends cc.Component {
    

    @property({type:cc.Label})
    label:cc.Label = null;

    @property({type:cc.Node})
    border:cc.Node = null;

    @property({type:cc.Sprite})
    img:cc.Sprite;

    private _card: Card;
    
    private _poolType: PoolType;

    

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

    onSelect() {
        if(this.tween){
            this.tween.stop();
        }
        this.tween =  cc.tween(this.border).to(1,{opacity:255}).to(1,{opacity:50}).to(1,{opacity:255}).start();
    }

    onTouchStart(event:cc.Event.EventTouch){
       event.card = this;
       if(this.poolType == PoolType.SendPool){
           this.onSelect();
           EVENT.emit(EventId.Send_Card_Select,event);
       }
    }

    

    public get poolType(): PoolType {
        return this._poolType;
    }
    public set poolType(value: PoolType) {
        this._poolType = value;
    }
    
    public get card(): Card {
        return this._card;
    }
    public set card(value: Card) {
        this._card = value;
        this.card.node = this.node;
        this.label.string ="" +this.card.number+this.card.type;
    }


}
