// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseViewComponet from "./BaseViewComponet";
import BaseViewAction from "./ViewAction/BaseViewAction";
import MoveViewAction from "./ViewAction/MoveViewAction";
import UnitViewComponet from "./ViewUnit/UnitViewComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewCenter extends BaseViewComponet {
    
    

    @property({type:cc.Node})
    gameRoot:cc.Node = undefined;

    nodeMap:Map<string,BaseViewComponet>

    actionQueen:Array<BaseViewAction>;

    onLoad(){
        this.nodeMap = new Map();
        this.actionQueen = new Array();
    }
    
    start () {

    }

    gameUpdate(dt){
        this.handlerActionQueen();
        this.nodeMap.forEach((v,k)=>{
            v.gameUpdate(dt);
        })
    }

    pushAction(action: BaseViewAction) {
        this.actionQueen.push(action);
    }

    handlerActionQueen(){
        while(this.actionQueen.length>0){
           const action =  this.actionQueen.pop();
           const cp = this.nodeMap.get(action.targetUid);
           if(cp){
            cp.handlerAction(action);
           }else{
               console.info(action.targetUid,"cp不存在");
           }
           
        }
    }

    addUnit(cp: UnitViewComponet,position:cc.Vec3) {
        this.nodeMap.set(cp.unitId,cp);
        cp.node.setParent(this.gameRoot);
        cp.node.setPosition(position);
    }
    
}
