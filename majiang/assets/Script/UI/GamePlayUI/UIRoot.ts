// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../../Define/EventId";
import { EVENT } from "../../Framework/Event/EventMgr";
import GameCenter from "../../Framework/GameScript/GameCenter";
import { gameData } from "../../Framework/GameScript/GameData/GameData";
<<<<<<< HEAD
import TargetNode from "./TargetNode";
=======
>>>>>>> main

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIRoot extends cc.Component {
    
    @property({type:cc.Label})
    ScoreLabel:cc.Label = undefined;

    @property({type:cc.Label})
    LeftCardLabel:cc.Label = undefined;

<<<<<<< HEAD
    @property({type:TargetNode})
    targetNode:TargetNode = undefined;

    @property({type:cc.Node})
    gameEnd:cc.Node = undefined;

    static UIROOT:UIRoot;
    start () {
        
=======
    start () {
>>>>>>> main
        this.updateLeftCardUI();
        this.updateScoreUI();
        EVENT.on(EventId.addScore,this.onAddScore,this,false);
        EVENT.on(EventId.update_card_num,this.onChangeCardNum,this,false);
<<<<<<< HEAD
        UIRoot.UIROOT = this;
    }

    openGameEndUI(){
        this.gameEnd.active = true;
    }

    onGameEnd(){
        gameData._currentLevel ++;
        gameData.save();
        cc.director.loadScene("start");
=======
>>>>>>> main
    }

    updateScoreUI(){
        this.ScoreLabel.string = gameData._score +"";
    }

    updateLeftCardUI(){
        this.LeftCardLabel.string = gameData._leftCardNum +"";
    }

    onAddScore(addScore:number){
        gameData._score = gameData._score + addScore;
        this.updateScoreUI();
<<<<<<< HEAD
        this.targetNode?.checkTarget();
=======
>>>>>>> main
    }

    onChangeCardNum(){
        this.updateLeftCardUI();
    }


    
}
