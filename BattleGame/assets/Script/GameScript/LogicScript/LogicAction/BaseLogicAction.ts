export default class BaseLogicAction{
    private _targetUid: string;
    

    constructor(targetUid:string){
        this._targetUid = targetUid;
    }

    public get targetUid(): string {
        return this._targetUid;
    }

}