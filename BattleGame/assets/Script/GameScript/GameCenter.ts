// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseLogicAction from "./LogicScript/LogicAction/BaseLogicAction";
import MoveAction from "./LogicScript/LogicAction/MoveAction";
import LogicCenter from "./LogicScript/LogicCenter";
import { UnitType } from "./LogicScript/Unit/BaseUnit";
import BaseViewAction from "./ViewScript/ViewAction/BaseViewAction";
import MoveViewAction from "./ViewScript/ViewAction/MoveViewAction";
import ViewCenter from "./ViewScript/ViewCenter";
import UnitViewComponet from "./ViewScript/ViewUnit/UnitViewComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCenter extends cc.Component {
    
    

    public static LOGIC_TICK:number = 50;

    public static GAME_CENTER:GameCenter;

    @property({type:cc.Prefab})
    unit:cc.Prefab = undefined;

    _ViewCenter:ViewCenter
    _LogicCenter:LogicCenter;

    _LogicAcitonQueen:Array<BaseLogicAction>;
    _ViewAcitonQueen:Array<BaseViewAction>;



    onLoad(){
        this._ViewCenter = this.getComponent(ViewCenter);
        this._LogicCenter = new LogicCenter();
        this._LogicAcitonQueen = new Array();
        this._ViewAcitonQueen = new Array();
        GameCenter.GAME_CENTER = this;
    }

    start () {
        let id = this._LogicCenter.generateUid();
        let unitNode =  cc.instantiate(this.unit);
        let cp =  unitNode.getComponent(UnitViewComponet);
        cp.unitId = id;
        let unit =  this._LogicCenter.createUnit(id,UnitType.Player);
        this._LogicCenter.addUnit(unit);
        this._ViewCenter.addUnit(cp,unit._position);
        
    }

    update(dt){

        this._LogicCenter.update(dt);
        this._ViewCenter.gameUpdate(dt);
    }

    pushViewAction(action: BaseViewAction) {
        this._ViewCenter.pushAction(action);
    }

    pushLoginAction(action: BaseLogicAction) {
        this._LogicCenter.pushAction(action);
    }
    
}
