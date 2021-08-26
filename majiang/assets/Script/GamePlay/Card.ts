import { CardType } from "../Define/Type";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card{
    
    
    type:CardType;

    number:number;

    node:cc.Node;

    constructor(type:CardType,index:number){
        this.type = type;
        this.number = index;
    }

    init(node:cc.Node){
        this.node = node;
    }

}