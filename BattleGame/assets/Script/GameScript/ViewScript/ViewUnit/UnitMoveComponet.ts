// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MoveViewAction from "../ViewAction/MoveViewAction";



const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitMoveComponet extends cc.Component {

    _target:cc.Vec3;

    _temp:number;
    start () {

    }

    update(dt){
        if(this._target){
            this.node.position = this.node.position.lerp(this._target,dt*this._temp);
        }
    }

    handlerAction(action:MoveViewAction){
        this._target = action.position;
        this._temp = this._target.sub(this.node.position).len()/10;
    }

    reuse(){
        this._target = undefined;
    }

    unuse(){
        this._target = undefined;
    }

}
