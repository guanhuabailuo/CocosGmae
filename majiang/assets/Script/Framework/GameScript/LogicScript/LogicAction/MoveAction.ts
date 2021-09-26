import BaseLogicAction from "./BaseLogicAction";

export default class MoveAction extends BaseLogicAction{
    
    private _dir: cc.Vec3;
    
    constructor(targetUid:string,dir:cc.Vec3){
        super(targetUid);
        this._dir = dir;
    }

    public get dir(): cc.Vec3 {
        return this._dir;
    }

}