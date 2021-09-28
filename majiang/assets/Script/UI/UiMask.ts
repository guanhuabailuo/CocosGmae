// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start () {
        EVENT.on(EventId.game_animation_start,this.onGameAnimationStart,this,false);
        EVENT.on(EventId.game_animation_end,this.onGameAnimationEnd,this,false);
        this.node.active = false;
    }

    onGameAnimationStart(){
        this.node.active = true;
    }
    onGameAnimationEnd(){
        this.node.active = false;
    }

}
