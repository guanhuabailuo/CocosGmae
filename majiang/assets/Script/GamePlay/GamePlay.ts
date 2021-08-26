import { CardType } from "../Define/Type";
import CardPool from "./CardPool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlay{

    cardPool:CardPool;
    constructor(){
        this.cardPool = new CardPool();
    }
}

export const Game_Play_ins = new GamePlay();