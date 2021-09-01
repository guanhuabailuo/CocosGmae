// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseLogicAction from "./LogicAction/BaseLogicAction";
import BaseUnit, { UnitType } from "./Unit/BaseUnit";
import Player from "./Unit/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LogicCenter{
    
    

    _unitMap:Map<string,BaseUnit>;
    _actionQueen:Array<BaseLogicAction>;
    _idGen = 1;

    constructor(){
        this._unitMap = new Map();
        this._actionQueen = new Array();
    }

    start () {
        this._unitMap = new Map();
        this._actionQueen = new Array();
    }

    update(dt){
        this.handlerActionQueen()
        this._unitMap.forEach((v,k)=>{
            v.update(dt);
        })
    }

    generateUid():string{
        return this._idGen++ +"";
    }

    handlerActionQueen(){
        while(this._actionQueen.length>0){
           const action =  this._actionQueen.pop();
           const handlerUnit = this._unitMap.get(action.targetUid);
           if(handlerUnit){
            handlerUnit.handlerAction(action);
           }else{
               console.info(action.targetUid+"单位不存在");
           }

          
        }
    }

    pushAction(action: BaseLogicAction) {
        this._actionQueen.push(action);
    }

    createUnit(unitId,unitType:UnitType){
        if(unitType == UnitType.Player){
            return new Player(unitId,unitType,new cc.Vec3(0,0,0));
        }
    }

    addUnit(unit: BaseUnit) {
        this._unitMap.set(unit._uuid,unit);
    }

}
