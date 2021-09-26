// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConfigNode from "../Config/ConfigNode";
import { gameData } from "../Framework/GameScript/GameData/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {

    }

    StartGame(){
        ConfigNode.INS.removeCanvas();
        //cc.game.addPersistRootNode(ConfigNode.INS.node);
        gameData.loadNextLevelConfig();
        cc.director.loadScene("helloworld",()=>{
            //ConfigNode.INS.joinCanvas();
        })
    }
   
}
