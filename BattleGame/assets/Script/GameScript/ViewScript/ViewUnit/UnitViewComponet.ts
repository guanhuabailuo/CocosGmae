// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseViewComponet from "../BaseViewComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitViewComponet extends BaseViewComponet {


    gameUpdate(dt:number){

    }

}
