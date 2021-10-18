// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { gameData } from "../Framework/GameScript/GameData/GameData";
import TargetNode from "./GamePlayUI/TargetNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelNode extends cc.Component {

    @property(cc.Node)
    levelContent:cc.Node = undefined;

    @property(cc.Prefab)
    levelNodePrefab:cc.Prefab = undefined;
    levelConfig: {};

    

    onLoad(){
        this.loadConfig("LevelConfig", this.levelConfig);
    }

    start () {
        
    }

    loadConfig(name: string, target: {}) {
        cc.assetManager.loadBundle("Config", (error, bondle) => {
            bondle.load(name, cc.JsonAsset, (error, ass) => {
                let JsonAsset = ass as cc.JsonAsset
                this.levelConfig = JsonAsset.json
                gameData.allConfig = JsonAsset.json;
                let length = gameData.allConfig.length;

                for (let i = 0; i < length; i++) {
                    const levelConfig = gameData.allConfig[i];
                    let initCard = levelConfig.initCard;
                    let fengNum = initCard.feng;
                    let ziNum = initCard.zi;
                    let tiaoNum = initCard.tiao;
                    let tongNum = initCard.tong;
                    let wanNum = initCard.wan;
                    let levelNode =  cc.instantiate(this.levelNodePrefab);
                    levelNode.getChildByName("level").getComponent(cc.Label).string = ""+(i+1)
                    let  stringTemp = "条x"+tiaoNum+" 万x"+wanNum+" 筒x"+tongNum+"\n字x"+ziNum+" 风x"+fengNum;
                    levelNode.getChildByName("discribe").getComponent(cc.Label).string = stringTemp;
                    levelNode.setParent(this.levelContent);
                    levelNode.on(cc.Node.EventType.TOUCH_END,this.StartGame,this)
                }
            })
        })
    }

    StartGame(event:cc.Event){
        let levelItem = event.target as cc.Node; 
        let level =  levelItem.getSiblingIndex();
        console.info(level);
        gameData.setCurrentleve(level);
        cc.director.loadScene("helloworld",()=>{

        })
    }


}
