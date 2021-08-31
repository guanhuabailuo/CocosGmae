import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { Game_Play_ins } from "../GamePlay/GamePlay";
import BaseState, { StateStatus } from "./BaseState";

export default class CheckCardState extends BaseState{

    pass:boolean = true;

    timer:number;

    start(){
        this.pass = true;
        this.status = StateStatus.running;
        EVENT.emit(EventId.game_animation_start);
        this.timer =  setInterval(()=>{
            this.pass =  Game_Play_ins.cardPoolNode.cardPool.checkComb();
        },1000);
    }

    update(){
        if(this.pass == false){
            clearInterval(this.timer);
            this.status = StateStatus.end;
            EVENT.emit(EventId.game_animation_end);
        }
    }

    end(){
        
    }

}