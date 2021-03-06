// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseViewComponet from "../BaseViewComponet";
import UnitMoveComponet from "./UnitMoveComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitViewComponet extends BaseViewComponet {


    gameUpdate(dt:number){
        
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
