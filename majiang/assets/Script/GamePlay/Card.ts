import { CardType } from "../Define/Type";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card{
    
    
    private _type: CardType;
    
    private _number: number;

    private _node: cc.Node;
    

    constructor(type:CardType,index:number){
        this.type = type;
        this.number = index;
    }

    public get type(): CardType {
        return this._type;
    }
    public set type(value: CardType) {
        this._type = value;
    }

    public get number(): number {
        return this._number;
    }
    public set number(value: number) {
        this._number = value;
    }

    public get node(): cc.Node {
        return this._node;
    }
    public set node(value: cc.Node) {
        this._node = value;
    }
}