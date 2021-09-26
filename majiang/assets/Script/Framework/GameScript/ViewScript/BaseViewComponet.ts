// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import TouchStartAction from "../LogicScript/LogicAction/TouchStartAction";
import { UnitType } from "../LogicScript/Unit/BaseUnit";
import BaseViewAction from "./ViewAction/BaseViewAction";
import MoveViewAction from "./ViewAction/MoveViewAction";
import TouchMoveViewAction from "./ViewAction/TouchMoveViewAction";
import TouchStartViewAction from "./ViewAction/TouchStartViewAction";
import UnitMoveComponet from "./ViewUnit/UnitMoveComponet";
import UnitTouchComponet from "./ViewUnit/UnitTouchComponet";



const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseViewComponet extends cc.Component {
    
    unitId:string;

    type:UnitType;

    init(unitId:string,type:UnitType){
        this.unitId = unitId;
        this.type = type;
    }

    gameUpdate(dt:number){

    }

    handlerAction(action: BaseViewAction) {
        
        if(action instanceof MoveViewAction){
           let cp = this.getComponent(UnitMoveComponet);
           cp?.handlerAction(action);
        }
        if(action instanceof TouchStartViewAction){
            let cp = this.getComponent(UnitTouchComponet);
            cp?.handlerAction(action);
        }

        if(action instanceof TouchMoveViewAction){
            let cp = this.getComponent(UnitMoveComponet);
            cp?.handlerTouchMove(action);
        }
    }

}


