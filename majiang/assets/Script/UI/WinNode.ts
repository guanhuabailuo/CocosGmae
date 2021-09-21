// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { getWinName, getWinScore, WinModle } from "../Framework/GameScript/LogicScript/FilterNew";
import { Game_Play_ins } from "../GamePlay/GamePlay";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property({type:cc.Node})
    winView:cc.Node = null;
    @property({type:cc.Prefab})
    tag:cc.Prefab = null;
    
    @property({type:cc.Label})
    socre:cc.Label = null;

    _TagPool:cc.NodePool = null;

    onLoad(){
        EVENT.on(EventId.win,this.onWin,this,false)
        this.winView.scale = 0;
        this.winView.active = false;
        this._TagPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
           this._TagPool.put(cc.instantiate(this.tag));   
        }
    }


    
    start () {

    }

    onWin(tags:Array<WinModle>){
        let allSocre = 0;
        this.winView.active = true;
        
        for (let i = 0; i < tags.length; i++) {
            let model = tags[i];
            let name = getWinName(model);
            let score = getWinScore(model);
            let node = this._TagPool.get();
            node.getChildByName("Name").getComponent(cc.Label).string = name;
            node.getChildByName("Score").getComponent(cc.Label).string = score+"";
            node.setParent(this.winView);
            allSocre += score;
        }
        this.socre.string = "分数:"+allSocre;
        EVENT.emit(EventId.addScore,allSocre);
        cc.tween(this.winView).to(0.1,{scale:1}).to(2,{}).to(0.5,{scale:0}).call(()=>{
            this.winView.active = false;
            this.winView.children.forEach(e=>{
                this._TagPool.put(e);
            })
        }).start()
    }
}
