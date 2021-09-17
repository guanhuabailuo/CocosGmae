// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "../../GameCenter";
import MoveViewAction from "../ViewAction/MoveViewAction";
import CardInfoComponet from "./CardInfoComponet";
import UnitViewComponet from "./UnitViewComponet";



const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitMoveComponet extends cc.Component {

    start () {

    }

    update(dt){
        
    }

    handlerAction(action:MoveViewAction){
        let index =  this.getComponent(CardInfoComponet).card.poolIndex;
        let pos = GameCenter.GAME_CENTER._poolBox.caculatePosByIndex(index);
        cc.tween(this.node).to(0.5,{position:pos}).start();
    }

    reuse(){
       
    }

    unuse(){
        
    }

}
