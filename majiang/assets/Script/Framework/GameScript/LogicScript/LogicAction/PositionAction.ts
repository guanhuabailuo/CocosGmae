import BaseLogicAction from "./BaseLogicAction";

export default class PositionAction extends BaseLogicAction{
    
    private _pos: cc.Vec3;
    
    constructor(targetUid:string,pos:cc.Vec3){
        super(targetUid);
        this._pos = pos;
    }

    public get pos(): cc.Vec3 {
        return this._pos;
    }

}