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
import { CombTag, duanyaojiuFilter, qingyiseFilter, WinFilter, WinModle, WinTag } from "../GamePlay/WinFilter/Filter";
import CardNode from "./CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    tags:Array<CombTag> = new Array();
    
    filters:Array<WinFilter> = new Array();

    @property({type:cc.Node})
    root1:cc.Node = null;
    @property({type:cc.Node})
    root2:cc.Node = null;
    @property({type:cc.Node})
    root3:cc.Node = null;
    @property({type:cc.Node})
    root4:cc.Node = null;

    index:number = 0; 

    onLoad(){
        this.filters.push(new qingyiseFilter());
        this.filters.push(new duanyaojiuFilter());
    }

    start () {
       EVENT.on(EventId.card_comb,this.onCardComb,this,false);  
    }

    join(cardNode:CardNode){
        cardNode.poolType = PoolType.WinPool;
        cardNode.node.scale = 0.7;
        let index = Math.floor(this.index/3);
        console.info(index);
        if(index == 0){
            cardNode.node.setParent(this.root1);
        }
        if(index == 1){
            cardNode.node.setParent(this.root2);
        }
        if(index == 2){
            cardNode.node.setParent(this.root3);
        }
        if(index == 3){
            cardNode.node.setParent(this.root4);
        }
        this.index ++;
    }

    onCardComb(tag:CombTag){
        this.tags.push(tag);
        const winTags:Array<WinModle> = new Array();
        if(this.tags.length>=4){
            for (let i = 0; i < this.filters.length; i++) {
                const filter = this.filters[i];
                let winTag =  filter.check(this.tags[0],this.tags[1],this.tags[2],this.tags[3])
                if(winTag != WinModle.none){
                    winTags.push(winTag);
                }
            }
            this.index = 0;
            this.tags = new Array();
            this.root1.destroyAllChildren();
            this.root2.destroyAllChildren();
            this.root3.destroyAllChildren();
            this.root4.destroyAllChildren();
            EVENT.emit(EventId.win,winTags);
        }
    }
}
