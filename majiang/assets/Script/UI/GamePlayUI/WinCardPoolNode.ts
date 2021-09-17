// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../../Define/EventId";
import { PoolType } from "../../Define/Type";
import { EVENT } from "../../Framework/Event/EventMgr";
import { CombTag, duanyaojiuFilter, qingyiseFilter, WinFilter, WinModle } from "../../Framework/GameScript/LogicScript/FilterNew";
import Card from "../../GamePlay/Card";

import CardNode from "../CardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinCardPoolNode extends cc.Component {
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

    addCardInfo(nodes:cc.Node[]){
        let index = Math.floor(this.index/3);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.scale = 0.75;
            if(index == 0){
                node.setParent(this.root1);
            }
            if(index == 1){
                node.setParent(this.root2);
            }
            if(index == 2){
                node.setParent(this.root3);
            }
            if(index == 3){
                node.setParent(this.root4);
            }
            this.index ++;
        }
       
    }

    onCardComb(tag:CombTag,nodes:cc.Node[]){
        this.addCardInfo(nodes)
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
