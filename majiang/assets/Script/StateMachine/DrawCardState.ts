import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { Game_Play_ins } from "../GamePlay/GamePlay";
import BaseState, { StateStatus } from "./BaseState";

export default class DrawCardState extends BaseState{

    skipBtn:cc.Button;

    constructor(btn:cc.Button){
        super()
        this.skipBtn = btn;
       
    }

    start(){
        super.start();
        EVENT.on(EventId.Send_Card_Exchange,this.onSendCardExchange,this,false);
        EVENT.on(EventId.Exchange_Card_End,this.onSendCardExchange,this,false);
        EVENT.on(EventId.skip_draw_card,this.onSendCardExchange,this,false);
        Game_Play_ins.gamePlayNode.drawCard();
        this.skipBtn.interactable = true;
    }
    onSendCardExchange() {
        this.status = StateStatus.end;
    }

    end(){
        super.end();
        EVENT.off(EventId.Send_Card_Exchange,this.onSendCardExchange,this);
        EVENT.off(EventId.Exchange_Card_End,this.onSendCardExchange,this);
        EVENT.off(EventId.skip_draw_card,this.onSendCardExchange,this);
        this.skipBtn.interactable = false;
        Game_Play_ins.sendCardPoolNode.node.destroyAllChildren();
    }



}