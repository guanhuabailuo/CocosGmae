import { CardType } from "../Define/Type";
import CardPoolNode from "../UI/CardPoolNode";
import GamePlayNode from "../UI/GamePlayNode";
import SendCardPoolNode from "../UI/SendCardPoolNode";
import WinCardPoolNode from "../UI/WinCardPoolNode";
import CardPool from "./CardPool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlay{

    private _cardPoolNode: CardPoolNode;

    private _gamePlayNode: GamePlayNode;
    public get gamePlayNode(): GamePlayNode {
        return this._gamePlayNode;
    }
    public set gamePlayNode(value: GamePlayNode) {
        this._gamePlayNode = value;
    }
    
    constructor(){
        
    }

    public get cardPoolNode(): CardPoolNode {
        return this._cardPoolNode;
    }
    public set cardPoolNode(value: CardPoolNode) {
        this._cardPoolNode = value;
    }
    private _sendCardPoolNode: SendCardPoolNode;
    public get sendCardPoolNode(): SendCardPoolNode {
        return this._sendCardPoolNode;
    }
    public set sendCardPoolNode(value: SendCardPoolNode) {
        this._sendCardPoolNode = value;
    }

    private _winCardPoolNode: WinCardPoolNode;
    public get winCardPoolNode(): WinCardPoolNode {
        return this._winCardPoolNode;
    }
    public set winCardPoolNode(value: WinCardPoolNode) {
        this._winCardPoolNode = value;
    }

    


}

export const Game_Play_ins = new GamePlay();