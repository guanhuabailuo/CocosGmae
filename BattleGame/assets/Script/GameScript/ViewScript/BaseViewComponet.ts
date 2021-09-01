// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseViewAction from "./ViewAction/BaseViewAction";
import MoveViewAction from "./ViewAction/MoveViewAction";
import UnitMoveComponet from "./ViewUnit/UnitMoveComponet";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseViewComponet extends cc.Component {
    
    unitId:string;

    gameUpdate(dt:number){

    }

    handlerAction(action: BaseViewAction) {
        
        if(action instanceof MoveViewAction){
           let cp = this.getComponent(UnitMoveComponet);
           cp.handlerAction(action);
        }
    }

}


