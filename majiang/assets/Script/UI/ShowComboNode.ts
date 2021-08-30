// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { CombTag, CombType } from "../GamePlay/WinFilter/Filter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Node})
    chi:cc.Node = null

    @property({type:cc.Node})
    peng:cc.Node = null

    onLoad(){
        EVENT.on(EventId.card_comb,this.onCardComb,this,false);
        this.chi.active = false;
        this.peng.active = false;
    }

    start () {

    }

    onCardComb(tag:CombTag){
        let node:cc.Node = null;
        if(tag.winType == CombType.peng){
            node = this.peng;
        }
        
        if(tag.winType == CombType.lianzi){
            node = this.chi;
        }
        node.active = true;
        cc.tween(node).to(1,{scale:3,opacity:255}).to(1,{}).to(1,{scale:0,opacity:0}).call(()=>{
            node.active = false;
        }).start()
    }

    
}
