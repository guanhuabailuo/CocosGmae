import BaseLogicAction from "./BaseLogicAction";

export default class TouchMoveAction extends BaseLogicAction{

    pos:cc.Vec2;

    constructor(targetUid:string,pos:cc.Vec2){
        super(targetUid);
        this.pos = pos;
    }

}