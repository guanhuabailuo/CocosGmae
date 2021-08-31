// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { Game_Play_ins } from "../GamePlay/GamePlay";
import { WinModle, WinTag } from "../GamePlay/WinFilter/Filter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property({type:cc.Node})
    winView:cc.Node = null;
    @property({type:cc.Node})
    qingyise:cc.Node = null;
    @property({type:cc.Node})
    duanyaojiu:cc.Node = null;
    
    @property({type:cc.Label})
    socre:cc.Label = null;

    onLoad(){
        EVENT.on(EventId.win,this.onWin,this,false)
        this.winView.scale = 0;
        this.winView.active = false;
        this.qingyise.active = false;
        this.duanyaojiu.active = false;
    }
    
    start () {

    }

    onWin(tags:Array<WinModle>){
        let socre = 1000;
        this.winView.active = true;
        if(tags.indexOf(WinModle.qingyise) != -1){
            this.qingyise.active = true;
            socre += 5000;
        }
        if(tags.indexOf(WinModle.duanyaojiu) != -1){
            this.duanyaojiu.active = true;
            socre += 1000;
        }
        this.socre.string = "分数:"+socre;
        EVENT.emit(EventId.addScore,socre);
        cc.tween(this.winView).to(0.1,{scale:1}).to(1,{}).to(0.5,{scale:0}).call(()=>{
            this.winView.active = false;
            this.qingyise.active = false;
            this.duanyaojiu.active = false;
        }).start()
    }
}
