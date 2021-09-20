// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "../../GameCenter";
import TouchMoveAction from "../../LogicScript/LogicAction/TouchMoveAction";
import TouchStartAction from "../../LogicScript/LogicAction/TouchStartAction";
import BaseViewComponet from "../BaseViewComponet";
import MoveViewAction from "../ViewAction/MoveViewAction";
import TouchMoveViewAction from "../ViewAction/TouchMoveViewAction";
import UnitMoveComponet from "./UnitMoveComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitViewComponet extends BaseViewComponet {

    gameUpdate(dt:number){
        
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,false);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,false);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,false);
    }

    onTouchStart(event:cc.Event){
        let cp =  event.getCurrentTarget().getComponent(UnitViewComponet);
        if(cp){
            let action:TouchStartAction = new TouchStartAction(cp.unitId);
            GameCenter.GAME_CENTER.pushLogicAction(action);
        }
    }

    onDestroy(){
        this.node.targetOff(this);
    }

    onTouchMove(event:cc.Event.EventTouch){
        let cp =  event.getCurrentTarget().getComponent(UnitViewComponet);
        if(cp){
            let pos =   event.getCurrentTarget().parent.convertToNodeSpaceAR(event.getLocation());
            let action:TouchMoveAction = new TouchMoveAction(cp.unitId,pos);
            GameCenter.GAME_CENTER.pushLogicAction(action);
        }
    }

    onTouchEnd(event:cc.Event.EventTouch){
        let cp =  event.getCurrentTarget().getComponent(UnitViewComponet);
        if(cp){
            GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(cp.unitId,undefined));
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
