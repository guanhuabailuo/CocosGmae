// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "../../Framework/GameScript/GameCenter";
import { gameData } from "../../Framework/GameScript/GameData/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIRoot extends cc.Component {
    
    @property({type:cc.Label})
    ScoreLabel:cc.Label = undefined;

    @property({type:cc.Label})
    LeftCardLabel:cc.Label = undefined;

    start () {
        this.updateLeftCardUI();
        this.updateScoreUI();
    }

    updateScoreUI(){
        this.ScoreLabel.string = gameData._score +"";
    }

    updateLeftCardUI(){
        this.LeftCardLabel.string = gameData._leftCardNum +"";
    }

    
}
