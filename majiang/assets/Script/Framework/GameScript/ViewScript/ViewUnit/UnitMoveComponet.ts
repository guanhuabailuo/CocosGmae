// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "../../GameCenter";
import TouchRemoveAction from "../../LogicScript/LogicAction/TouchRemoveAction";
import MoveViewAction from "../ViewAction/MoveViewAction";
import TouchMoveViewAction from "../ViewAction/TouchMoveViewAction";
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
        cc.tween(this.node).to(0.1,{position:pos}).start();
    }


    handlerTouchMove(action:TouchMoveViewAction){
        let index =  this.getComponent(CardInfoComponet).card.poolIndex;
        let pos = GameCenter.GAME_CENTER._poolBox.caculatePosByIndex(index);
        let target = new cc.Vec3(action.position.x,action.position.y) ;
        let dis = target.sub(pos).len();
        if(dis>=150){
            GameCenter.GAME_CENTER.pushLogicAction(new TouchRemoveAction(this.getComponent(CardInfoComponet).card.id+""));
        }
        this.node.setPosition(action.position);
    }

    reuse(){
       
    }

    unuse(){
        
    }

}
