import { WinModle } from "../LogicScript/FilterNew";


export default class GameData{
    load() {
        let level =  cc.sys.localStorage.getItem("level")||0;
        this._currentLevel = level;
        this._volume = cc.sys.localStorage.getItem("volume")||0;
        this._bgm = cc.sys.localStorage.getItem("bgm")||0;
        this._buttonEffect = cc.sys.localStorage.getItem("buttonEffect")||0;
        console.info(this);
    }

    save() {
        cc.sys.localStorage.setItem("level",this._currentLevel);
        cc.sys.localStorage.setItem("volume",this._volume);
        cc.sys.localStorage.setItem("bgm",this._bgm);
        cc.sys.localStorage.setItem("buttonEffect",this._buttonEffect);
        console.info(this);
    }
    
    _currentLevel = 0;
    _score:number;
    _leftCardNum:number;
    _gameConfig:{}
    _currentConfig:any;

    _winModels:Array<WinModle>;

    allConfig: any;

    _bgm:number = 0;

    _volume:number = 0;

    _buttonEffect:number = 0;

    isOpenBgm():boolean{
        return this._bgm == 1;
    }

    setOpenBgm(open:boolean){
        if(open){
            this._bgm = 1;
        }else{
            this._bgm = 0;
        }
    }

    setOpenButtonEffect(open:boolean){
        if(open){
            this._buttonEffect = 1;
        }else{
            this._buttonEffect = 0;
        }
    }

    isOpenButtonEffect():boolean{
        return this._buttonEffect == 1;
    }


    constructor(){
        this._score = 0;
        this._leftCardNum = 0;
        this._winModels = new Array();
        this._currentConfig = JSON.parse('{"dead":[],"initCard":{"feng":0,"zi":0,"tiao":0,"wan":8,"tong":0},"poolSize":5,"target":[{"type":"score","target":800},{"type":"duanyaojiu","target":1},{"type":"qingyise","target":1}]}');
    }

    loadNextLevelConfig(){
        // if(this._currentLevel >= this.allConfig.length){
        //     this._currentLevel = 0;
        // }
        // this._currentConfig = this.allConfig[this._currentLevel];
    }

    setCurrentleve(level){
        this._currentLevel = parseInt(level);
        if(this._currentLevel >= this.allConfig.length){
            this._currentLevel = 0;
        }
        this._currentConfig = this.allConfig[this._currentLevel];
    }

    reset(){
        this._score = 0;
        this._leftCardNum = 0;
        this._currentConfig = JSON.parse('{"dead":[0,6,24,42,48],"initCard":{"feng":4,"zi":4,"tiao":4,"wan":4,"tong":4},"target":[{"type":"score","target":800},{"type":"duanyaojiu","target":1},{"type":"qingyise","target":1}]}');
        if(this.allConfig){
            this._currentConfig = this.allConfig[this._currentLevel];
        }
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

    addWinModel(winModel:WinModle){
        this._winModels.push(winModel);
    }

    containTag(targetType: string):number {
        let model:WinModle = undefined;
        if(targetType == "qingyise"){
            model = WinModle.qingyise;
        }
        if(targetType == "duanyaojiu"){
            model = WinModle.duanyaojiu;
        }
        if(targetType == "yibeikou"){
            model = WinModle.yibeikou;
        }
        let count = 0;
        for (let i = 0; i < this._winModels.length; i++) {
            if(this._winModels[i] == model){
                count++;
            }
            
        }
        return count;
    }

}

export const gameData = new GameData();