

export default class GameData{

    _score:number;
    _leftCardNum:number;
    _gameConfig:{}
    _currentConfig:any;

    constructor(){
        this._score = 0;
        this._leftCardNum = 0;
        this._currentConfig = JSON.parse('{"dead":[0,6,24,42,48],"target":[{"type":"score","target":800},{ "type":"dasixi","target":1},{ "type":"qingyise","target":1}]}');
    }

    reset(){
        this._score = 0;
        this._leftCardNum = 0;
        this._currentConfig = JSON.parse('{"dead":[0,6,24,42,48],"target":[{"type":"score","target":800},{ "type":"dasixi","target":1},{ "type":"qingyise","target":1}]}');
    }

}

export const gameData = new GameData();