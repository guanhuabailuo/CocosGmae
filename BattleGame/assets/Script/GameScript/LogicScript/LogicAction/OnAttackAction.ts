import BaseLogicAction from "./BaseLogicAction";

export default class OnAttackAction extends BaseLogicAction{
    
    _damage:number
    
    constructor(targetUid:string,damage:number){
        super(targetUid);
        this._damage = damage;
    }

    public get damage(): number {
        return this._damage;
    }

}