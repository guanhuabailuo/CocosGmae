// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "../../GameCenter";
import TouchStartAction from "../../LogicScript/LogicAction/TouchStartAction";
import BaseViewComponet from "../BaseViewComponet";
import UnitMoveComponet from "./UnitMoveComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitViewComponet extends BaseViewComponet {

    gameUpdate(dt:number){
        
    }


    

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,false);
    }

    onTouchStart(event:cc.Event){
        let cp =  event.getCurrentTarget().getComponent(UnitViewComponet);
        if(cp){
            let action:TouchStartAction = new TouchStartAction(cp.unitId);
            GameCenter.GAME_CENTER.pushLogicAction(action);
        }
       
    }

    reuse(){
        let moveCp = this.getComponent(UnitMoveComponet);
        if(moveCp){
            moveCp.reuse();
        }
    }

    unuse(){
        let moveCp = this.getComponent(UnitMoveComponet);
        if(moveCp){
            moveCp.unuse();
        }
    }

}
