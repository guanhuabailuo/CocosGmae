import BaseViewAction from "./BaseViewAction";

export default class TouchStartViewAction extends BaseViewAction{
    
    private _position: cc.Vec3;

    private _show: boolean;
    
    constructor(targetUid:string,position:cc.Vec3,show:boolean){
        super(targetUid);
        this._position = position;
        this._show = show;
    }

    public get position(): cc.Vec3 {
        return this._position;
    }

    public get show(): boolean {
        return this._show;
    }
    

}