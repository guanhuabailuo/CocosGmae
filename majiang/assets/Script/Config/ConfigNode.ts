import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { gameData } from "../Framework/GameScript/GameData/GameData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfigNode extends cc.Component {

    levelConfig: {};

    public static INS: ConfigNode;

    @property({ type: cc.Node })
    settingNode: cc.Node = undefined;

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = undefined;

    @property({ type: cc.AudioClip })
    click: cc.AudioClip = undefined;

    @property(cc.Node)
    bakcBgmNode: cc.Node = undefined;

    @property(cc.Node)
    musicEffect: cc.Node = undefined;

    @property(cc.Node)
    volumeNode: cc.Node = undefined;


    @property(cc.Node)
    openNode: cc.Node = undefined;

    @property(cc.Node)
    closeNode: cc.Node = undefined;

    @property(cc.Node)
    openCloseSelectNode: cc.Node = undefined;

    @property(cc.Node)
    typeSelctNode: cc.Node = undefined;

    @property(cc.Node)
    volProgressNode: cc.Node = undefined;

    enableFunc: Function = undefined;

    _clickAduioNum = -1;

    _bgmAduioNum = -1;

    _bgmStarted = false;


    onLoad() {
        this.settingNode.scale = 0;
        cc.assetManager.loadBundle("Texture");
        cc.assetManager.loadBundle("Config");
        
        EVENT.on(EventId.open_setting_view, this.openSetting, this);
        EVENT.on(EventId.Button_touch, this.onTouchButton, this);
        ConfigNode.INS = this;
        gameData.load();

        if (gameData.isOpenBgm()) {
            this._bgmAduioNum = cc.audioEngine.playMusic(this.bgm, true);
            this._bgmStarted = true;
        }

        this.bakcBgmNode.on(cc.Node.EventType.TOUCH_START, this.onSetttingTypeSelect, this);

        this.musicEffect.on(cc.Node.EventType.TOUCH_START, this.onSetttingTypeSelect, this);

        this.volumeNode.on(cc.Node.EventType.TOUCH_START, this.onSetttingTypeSelect, this);

        this.bakcBgmNode.opacity = 150;
        this.volumeNode.opacity = 150;
        this.musicEffect.opacity = 150;

        this.openNode.on(cc.Node.EventType.TOUCH_START, this.onOpenCloseSelect, this);

        this.closeNode.on(cc.Node.EventType.TOUCH_START, this.onOpenCloseSelect, this);

        this.volProgressNode.on(cc.Node.EventType.TOUCH_MOVE,this.onVolProgressChange,this);

    }
    onVolProgressChange(event:cc.Event.EventTouch|number) {
        let progress = undefined;
        if(event instanceof cc.Event.EventTouch ){
            let localPos = this.volProgressNode.convertToNodeSpaceAR(event.touch.getLocation());
            progress = localPos.y/this.volProgressNode.height;
        }else{
            progress = event;
        }
        progress = Math.min(1,progress);
        progress = Math.max(0,progress);
        gameData._volume = progress;
        cc.audioEngine.setMusicVolume(gameData._volume);
        this.volProgressNode.getComponentInChildren(cc.Sprite).fillRange = progress;
    }


    onOpenCloseSelect(event: cc.Event | cc.Node) {
        let target = undefined;
        if (event instanceof cc.Event) {
            target = event.target;
        } else {
            target = event;
        }
        this.openNode.opacity = 150;
        this.closeNode.opacity = 150;
        target.opacity = 255;
        let spCp = this.openCloseSelectNode.getComponent(cc.Sprite);
        spCp.fillRange = 0;
        this.openCloseSelectNode.setParent(target);
        cc.tween(spCp).to(0.1, { fillRange: 1 }).start();

        if (target == this.openNode) {
            this.enableFunc(true);
        } else {
            this.enableFunc(false);
        }
    }

    onBgmSelect() {
        this.enableFunc = this.enabledBgm;
        let node = gameData.isOpenBgm() ? this.openNode : this.closeNode;
        this.onOpenCloseSelect(node);


    }

    onMusicEffectSelect() {
        this.enableFunc = this.enabledButtonEffect;
        let node = gameData.isOpenButtonEffect() ? this.openNode : this.closeNode;
        this.onOpenCloseSelect(node);

    }

    onVolumeSelect() {
        this.openNode.active = false;
        this.closeNode.active = false;
        this.volProgressNode.active = true;
        this.onVolProgressChange(gameData._volume);
    }

    onSetttingTypeSelect(event: cc.Event) {

        this.openNode.active = true;
        this.closeNode.active = true;
        this.volProgressNode.active = false;

        this.bakcBgmNode.opacity = 150;
        this.volumeNode.opacity = 150;
        this.musicEffect.opacity = 150;

        let target = event.target as cc.Node;

        let worldPos = this.typeSelctNode.parent.convertToWorldSpaceAR(this.typeSelctNode.position);

        this.typeSelctNode.setParent(target);

        this.typeSelctNode.position = this.typeSelctNode.parent.convertToNodeSpaceAR(worldPos);

        cc.tween(this.typeSelctNode).to(0.1, { position: cc.v3(0, 0, 0) }).start();

        target.opacity = 255;

        if (target == this.bakcBgmNode) {
            this.onBgmSelect();
        }

        if (target == this.musicEffect) {
            this.onMusicEffectSelect();
        }

        if (target == this.volumeNode) {
            this.onVolumeSelect();
        }

    }

    removeCanvas() {
        cc.Canvas.instance.node.removeChild(this.node);
    }

    joinCanvas() {
        cc.Canvas.instance.node.addChild(this.node);
    }


    

    getCurrentLevelConfig() {
        return this.levelConfig[0];
    }

    openSetting() {
        this.onTouchButton();
        this.settingNode.active = true;
        cc.tween(this.settingNode).to(0.2, { scale: 1 }).start();
    }

    closeSetting() {
        this.onTouchButton();
        gameData.save();
        cc.tween(this.settingNode).to(0.2, { scale: 0 }).start().call(() => {
            this.settingNode.active = false;
        });
    }

    changeVolume(slider: cc.Slider) {
        gameData._volume = slider.progress;
        cc.audioEngine.setMusicVolume(gameData._volume);
    }

    enabledBgm(enable: boolean) {
        if (enable) {
            if (!this._bgmStarted) {
                this._bgmAduioNum = cc.audioEngine.playMusic(this.bgm, true);
                this._bgmStarted = true;
            }
            cc.audioEngine.resumeMusic();
        } else {
            cc.audioEngine.pauseMusic();
        }
        gameData.setOpenBgm(enable);

    }

    enabledButtonEffect(enable: boolean) {
        gameData.setOpenButtonEffect(enable);
    }

    onTouchButton() {
        if (!gameData.isOpenButtonEffect()) {
            return;
        }
        cc.audioEngine.stop(this._clickAduioNum);
        this._clickAduioNum = cc.audioEngine.playEffect(this.click, false);
    }


}