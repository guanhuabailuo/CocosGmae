// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConfigNode from "../Config/ConfigNode";
<<<<<<< HEAD
import { gameData } from "../Framework/GameScript/GameData/GameData";
=======
>>>>>>> main

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {

    }

    StartGame(){
        ConfigNode.INS.removeCanvas();
<<<<<<< HEAD
        //cc.game.addPersistRootNode(ConfigNode.INS.node);
        gameData.loadNextLevelConfig();
=======
        cc.game.addPersistRootNode(ConfigNode.INS.node);
>>>>>>> main
        cc.director.loadScene("helloworld",()=>{
            //ConfigNode.INS.joinCanvas();
        })
    }
   
}
