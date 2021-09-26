import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { gameData } from "../Framework/GameScript/GameData/GameData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ConfigNode extends cc.Component {
    
    levelConfig:{};

    public static INS:ConfigNode;

    @property({type:cc.Node})
    settingNode:cc.Node = undefined;

    @property({type:cc.AudioClip})
    bgm:cc.AudioClip = undefined;

    @property({type:cc.AudioClip})
    click:cc.AudioClip = undefined;


    @property({type:cc.Slider})
    volumeSlider:cc.Slider = undefined;

    @property({type:cc.Toggle})
    bgmToggle:cc.Toggle = undefined;

    @property({type:cc.Toggle})
    buttonToggle:cc.Toggle = undefined;

    _clickAduioNum = -1;

    _bgmAduioNum = -1;

    _buttonEffect = true;

    _bgmStarted = false;
    onLoad(){
        this.settingNode.scale = 0;
        cc.assetManager.loadBundle("Texture");
        cc.assetManager.loadBundle("Config");
        this.loadConfig("LevelConfig",this.levelConfig);
        EVENT.on(EventId.open_setting_view,this.openSetting,this);
        EVENT.on(EventId.Button_touch,this.onTouchButton,this);
        ConfigNode.INS = this;
        gameData.load();
        this.volumeSlider.progress = gameData._volume;
        this.bgmToggle.isChecked = gameData.isOpenBgm();
        if(gameData.isOpenBgm()){
            this._bgmAduioNum = cc.audioEngine.playMusic(this.bgm,true);
            this._bgmStarted = true;
        }
        this.buttonToggle.isChecked = gameData.isOpenButtonEffect();
    }


    removeCanvas(){
        cc.Canvas.instance.node.removeChild(this.node);
    }

    joinCanvas(){
        cc.Canvas.instance.node.addChild(this.node);
    }


    loadConfig(name:string,target:{}){
        cc.assetManager.loadBundle("Config",(error,bondle)=>{
            bondle.load(name,cc.JsonAsset,(error,ass)=>{
                let JsonAsset = ass as cc.JsonAsset
                this.levelConfig = JsonAsset.json
                gameData.allConfig = JsonAsset.json;
            })
        })       
    }

    getCurrentLevelConfig() {
      return this.levelConfig[0];
    }

    openSetting(){
        this.onTouchButton();
        this.settingNode.active = true;
        cc.tween(this.settingNode).to(0.2,{scale:1}).start();
    }

    closeSetting(){
        this.onTouchButton();
        gameData.save();
        cc.tween(this.settingNode).to(0.2,{scale:0}).start().call(()=>{
            this.settingNode.active = false;
        });
    }

    changeVolume(slider:cc.Slider){
        gameData._volume  = slider.progress;
        cc.audioEngine.setMusicVolume(gameData._volume);
    }

    enabledBgm(ta:cc.Toggle){
        if(ta.isChecked){
            if(!this._bgmStarted){
                this._bgmAduioNum = cc.audioEngine.playMusic(this.bgm,true);
                this._bgmStarted = true;
            }
            cc.audioEngine.resumeMusic();
        }else{
            cc.audioEngine.pauseMusic();
        }
        gameData.setOpenBgm(ta.isChecked);
        
    }

    enabledButtonEffect(ta:cc.Toggle){
        gameData.setOpenButtonEffect(ta.isChecked);
    }

    onTouchButton(){
        if(!gameData.isOpenButtonEffect()){
            return;
        }
        cc.audioEngine.stop(this._clickAduioNum);
        this._clickAduioNum = cc.audioEngine.playEffect(this.click,false);
    }


}