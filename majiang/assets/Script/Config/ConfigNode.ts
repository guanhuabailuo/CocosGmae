import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";


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

    _clickAduioNum = -1;

    _bgmAduioNum = -1;

    _buttonEffect = true;

    onLoad(){
        this.settingNode.scale = 0;
        cc.assetManager.loadBundle("Texture");
        cc.assetManager.loadBundle("Config");
        this.loadConfig("LevelConfig",this.levelConfig);
        EVENT.on(EventId.open_setting_view,this.openSetting,this);
        EVENT.on(EventId.Button_touch,this.onTouchButton,this);
        this._bgmAduioNum = cc.audioEngine.playMusic(this.bgm,true);
        ConfigNode.INS = this;
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
                console.info(this);
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
        cc.tween(this.settingNode).to(0.2,{scale:0}).start().call(()=>{
            this.settingNode.active = false;
        });
    }

    changeVolume(slider:cc.Slider){
        cc.audioEngine.setMusicVolume(slider.progress);
    }

    enabledBgm(ta:cc.Toggle){
        console.info(ta.isChecked);
        if(ta.isChecked){
            cc.audioEngine.resumeMusic();
           
        }else{
            cc.audioEngine.pauseMusic();
        }
        
    }

    enabledButtonEffect(ta:cc.Toggle){
        this._buttonEffect = ta.isChecked;
    }

    onTouchButton(){
        if(!this._buttonEffect){
            return;
        }
        cc.audioEngine.stop(this._clickAduioNum);
        this._clickAduioNum = cc.audioEngine.playEffect(this.click,false);
    }


}