import BaseViewAction from "./BaseViewAction";

export default class TouchMoveViewAction extends BaseViewAction{
    
    private _position: cc.Vec2;
    
    constructor(targetUid:string,position:cc.Vec2){
        super(targetUid);
        this._position = position;
      
    }

    public get position(): cc.Vec2 {
        return this._position;
    }

}