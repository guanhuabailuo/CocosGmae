import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { Game_Play_ins } from "../GamePlay/GamePlay";
import BaseState from "./BaseState";

export default class ExchangeCardState extends BaseState{

    timer:any

    start(){
        EVENT.emit(EventId.game_animation_end);
        EVENT.on(EventId.Exchange_Card_End,this.onExchangeCardEnd,this,false)
    }

    onExchangeCardEnd(){
        super.end();
    }

    end(){
        EVENT.off(EventId.Exchange_Card_End,this.onExchangeCardEnd,this)
        EVENT.emit(EventId.game_animation_start);
    }

}