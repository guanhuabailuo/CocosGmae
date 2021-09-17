// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../../../Define/EventId";
import { EVENT } from "../../Event/EventMgr";
import GameCenter from "../GameCenter";
import { UnitType } from "../LogicScript/Unit/BaseUnit";
import BaseViewComponet from "./BaseViewComponet";
import BaseViewAction from "./ViewAction/BaseViewAction";
import DestoryViewAction from "./ViewAction/DestoryViewAction";
import MoveViewAction from "./ViewAction/MoveViewAction";
import RemoveViewAction from "./ViewAction/RemoveViewAction";
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

           if(action instanceof DestoryViewAction){
               this.removeUnit(action);
               continue;
           }
           if(action instanceof RemoveViewAction){
                this.removeOneUnit(action.targetUid);
                continue;
           }

           const cp = this.nodeMap.get(action.targetUid);
           if(cp){
            cp.handlerAction(action);
           }else{
               console.info(action.targetUid,"cp不存在");
           }
           
        }
    }

    removeOneUnit(id:string){
        let node = this.nodeMap.get(id);
        this.nodeMap.delete(id);
        node?.node.destroy();
    }

    removeUnit(action:DestoryViewAction){
        let nodes:cc.Node[] = []
        for (let i = 0; i < action.tag.card.length; i++) {
            let cp =  this.nodeMap.get(action.tag.card[i].id+"");
            this.nodeMap.delete(action.tag.card[i].id+"");
            nodes.push(cp.node);
        }
        EVENT.emit(EventId.card_comb,action.tag,nodes);
    }

    addUnit(cp: UnitViewComponet,position:cc.Vec3) {
        this.nodeMap.set(cp.unitId,cp);
        cp.node.setParent(this.gameRoot);
        cp.node.setPosition(position);
    }
    
}
