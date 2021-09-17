

export default class GameData{

    _score:number;
    _leftCardNum:number;
    _gameConfig:{}

    constructor(){
        this._score = 0;
        this._leftCardNum = 0;
    }

    reset(){
        this._score = 0;
        this._leftCardNum = 0;
    }
}

export const gameData = new GameData();