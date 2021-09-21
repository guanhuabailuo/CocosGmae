

export default class GameData{

    _score:number;
    _leftCardNum:number;
    _gameConfig:{}
    _currentConfig:any;

    constructor(){
        this._score = 0;
        this._leftCardNum = 0;
        this._currentConfig = JSON.parse('{"dead":[],"initCard":{"feng":0,"zi":0,"tiao":0,"wan":36,"tong":0},"poolSize":5,"target":[{"type":"score","target":800},{"type":"dasixi","target":1},{"type":"qingyise","target":1}]}');
    }

    reset(){
        this._score = 0;
        this._leftCardNum = 0;
        this._currentConfig = JSON.parse('{"dead":[0,6,24,42,48],"initCard":{"feng":4,"zi":4,"tiao":4,"wan":4,"tong":4},"target":[{"type":"score","target":800},{"type":"dasixi","target":1},{"type":"qingyise","target":1}]}');
    }

    getScale(){
        if(this._currentConfig.poolSize == 5){
            return 1.3;
        }
        if(this._currentConfig.poolSize == 9){
            return 0.7;
        }
        return 1;
    }

}

export const gameData = new GameData();