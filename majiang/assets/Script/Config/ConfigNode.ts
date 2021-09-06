// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConfigNode extends cc.Component {
    
    levelConfig:{};

    public static INS:ConfigNode;

    private static currentLevel = 0;

    onLoad(){
        cc.assetManager.loadBundle("Config");
        this.loadConfig("LevelConfig",this.levelConfig);
        ConfigNode.INS = this;
        cc.game.addPersistRootNode(this.node);

    }


    loadConfig(name:string,target:{}){
        cc.assetManager.loadBundle("Config",(error,bondle)=>{
            bondle.load(name,cc.JsonAsset,(error,ass)=>{
                let JsonAsset = ass as cc.JsonAsset
                this.levelConfig = JsonAsset.json
            })
        })       
    }

    getCurrentLevelConfig() {
      return this.levelConfig[0];
    }

}