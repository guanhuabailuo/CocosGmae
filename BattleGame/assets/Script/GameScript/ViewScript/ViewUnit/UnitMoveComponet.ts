// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseViewComponet from "../BaseViewComponet";
import MoveViewAction from "../ViewAction/MoveViewAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitMoveComponet extends cc.Component {

    _target:cc.Vec3;

    start () {

    }

    update(dt){
        if(this._target){
            this.node.position = this.node.position.lerp(this._target,1);
        }

    }

    handlerAction(action:MoveViewAction){
        this._target = action.position;
    }

}
