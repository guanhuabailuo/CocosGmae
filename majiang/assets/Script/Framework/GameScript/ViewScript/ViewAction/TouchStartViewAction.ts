import BaseViewAction from "./BaseViewAction";

export default class TouchStartViewAction extends BaseViewAction{
    
    private _position: cc.Vec3;
    
    constructor(targetUid:string,position:cc.Vec3){
        super(targetUid);
        this._position = position;
    }

    public get position(): cc.Vec3 {
        return this._position;
    }

}