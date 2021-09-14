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
export default class UnitCollideComponet extends cc.Component {

    collisionEnter:((other:cc.Node,self:cc.Node)=>void);
    
    target:any;

    init(target:any,collisionEnter:(other:cc.Node,self:cc.Node)=>void){
        this.target = target;
        this.collisionEnter = collisionEnter;
    }

    start () {

    }

    update(dt){
       
    }

    handlerAction(action:MoveViewAction){
       
    }

    onCollisionEnter(other:cc.Node,self:cc.Node){
        this.collisionEnter.call(this.target,other,self);
    }
    

}
