// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConfigNode from "../Config/ConfigNode";
import { EventId } from "../Define/EventId";
import { CardType } from "../Define/Type";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "../GamePlay/Card";
import GamePlay, { Game_Play_ins } from "../GamePlay/GamePlay";
import { CombTag } from "../GamePlay/WinFilter/Filter";
import BaseState, { StateStatus } from "../StateMachine/BaseState";
import CheckCardState from "../StateMachine/CheckCardState";
import DrawCardState from "../StateMachine/DrawCardState";
import ExchangeCardState from "../StateMachine/ExchangeCardState";
import CardNode from "./CardNode";
import CardPoolNode from "./CardPoolNode";
import SendCardPoolNode from "./SendCardPoolNode";
import WinCardPoolNode from "./WinCardPoolNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayNode extends cc.Component {
    

    @property({type:cc.Prefab})
    card:cc.Prefab = null;

    @property({type:cc.Node})
    cardPool:cc.Node = null;

    @property({type:cc.Node})
    sendCardPoolNode:cc.Node = null;

    @property({type:cc.Node})
    winCardPoolNode:cc.Node = null;

    @property({type:cc.Label})
    leftCardNum:cc.Label;

    @property({type:cc.Label})
    scoreLabel:cc.Label;

    @property({type:cc.Button})
    skipBtn:cc.Button;

    gamePlay:GamePlay;

    allCard:Array<CardInfo>;

    allCardNode:Array<cc.Node>;
    allEmptyCardNode:Array<cc.Node>;

    score:number = 0;
    
    states:Array<BaseState>;

    currentStateIndex:number = 0 ;

    onLoad(){
        this.gamePlay = Game_Play_ins;
        this.gamePlay.cardPoolNode = this.cardPool.getComponent(CardPoolNode);
        this.gamePlay.sendCardPoolNode = this.sendCardPoolNode.getComponent(SendCardPoolNode);
        this.gamePlay.gamePlayNode = this;
        this.gamePlay.winCardPoolNode = this.winCardPoolNode.getComponent(WinCardPoolNode);

        EVENT.on(EventId.card_comb,this.onCardComb,this,false);

        EVENT.on(EventId.addScore,this.addScore,this,false);

        this.states = new Array();

        this.states.push(new DrawCardState(this.skipBtn));

        this.states.push(new ExchangeCardState());

        this.states.push(new CheckCardState());

        this.currentStateIndex = 0;

        this.allCardNode = new Array();
        this.allEmptyCardNode = new Array();
        this.allCard = this.createOneGroupCardInfo();
        this.allCard.sort((a,b)=>{
            return Math.random()-0.5;
        })
        let emptyCardInfo:CardInfo = {number:-1,cardType:CardType.empty,pic:"Card/back"}
        for (let i = 0; i < this.allCard.length; i++) {
            const CardInfo = this.allCard[i];
            let cardNode =  this.createCardNode(CardInfo.cardType,CardInfo.number,CardInfo.pic);
            let emptyNode = this.createCardNode(emptyCardInfo.cardType,emptyCardInfo.number,emptyCardInfo.pic);
            this.allCardNode.push(cardNode)
            this.allEmptyCardNode.push(emptyNode)
        }

        this.updateLeftCardUI()
        this.addScore(0);
    }

    addScore(addScore:number) {
       this.score += addScore;
       this.scoreLabel.string = ""+this.score;
    }


    onCardComb(tag:CombTag){
        for (let i = 0; i < 3; i++) {
            let index = tag.card[i].node.getSiblingIndex();
            let cardNode =  this.allEmptyCardNode.pop();
            Game_Play_ins.winCardPoolNode.join(tag.card[i].node.getComponent(CardNode));
            this.gamePlay.cardPoolNode.join(cardNode.getComponent(CardNode),index);
        }
        this.updateLeftCardUI();
    }

    update(dt){
        if(this.states[this.currentStateIndex].status == StateStatus.none){
            this.states[this.currentStateIndex].start();
        }
        if(this.states[this.currentStateIndex].status == StateStatus.running){
            this.states[this.currentStateIndex].update(dt);
        }
        if(this.states[this.currentStateIndex].status == StateStatus.end){
            this.states[this.currentStateIndex].end();
            this.states[this.currentStateIndex].reset();
            this.currentStateIndex++;
            if(this.currentStateIndex == 3){
                this.currentStateIndex = 0;
            }
        }
    }




    createOneGroupCardInfo():Array<CardInfo>{
        let allCard:Array<CardInfo> = new Array();
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j <= 9; j++) {
                for (let k = 0; k < 4; k++) {
                    let cardInfo:CardInfo = {}; 
                    cardInfo.number = j
                    if(i == 1){
                        cardInfo.cardType = CardType.tiao
                        cardInfo.pic = "Card/tiao_"+j;
                    }
                    if(i == 2){
                        cardInfo.cardType = CardType.tong
                        cardInfo.pic = "Card/tong_"+j;
                    }
                    if(i == 3){
                        cardInfo.cardType = CardType.wan
                        cardInfo.pic = "Card/wan_"+j;
                    }
                    allCard.push(cardInfo);
                }
            }
        }

        for (let i = 1; i <= 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cardInfo:CardInfo = {}; 
                cardInfo.number = i
                cardInfo.cardType = CardType.feng
                cardInfo.pic = "Card/feng_"+i;
                allCard.push(cardInfo);
            }
        }

        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < 4; j++) {
                let cardInfo:CardInfo = {}; 
                cardInfo.number = i
                cardInfo.cardType = CardType.zi
                cardInfo.pic = "Card/zi_"+i;
                allCard.push(cardInfo);
            }
        }
        return allCard;
    }


    start () {
        

        const deadCard:Array<CardInfo> = new Array;
        let deadCardInfo = {number:-1,cardType:CardType.dead,pic:"back/bg_game_huge_1"}

        let levelConfig = ConfigNode.INS.getCurrentLevelConfig();
        for (let i = 0; i < levelConfig.dead.length; i++) {
            const element = levelConfig.dead[i];
            deadCard[element] = deadCardInfo;
            
        }
        for (let i = 0; i < 49; i++) {
            let cardNode:cc.Node = null;
            if(deadCard[i]){
                 cardNode = this.createCardNode(deadCardInfo.cardType,deadCardInfo.number,deadCardInfo.pic);; 
            }else{
                cardNode = this.allCardNode.pop();
            }
            
            let cp = cardNode.getComponent(CardNode);
            this.gamePlay.cardPoolNode.join(cp,i);
        }
        this.updateLeftCardUI();
    }

    updateLeftCardUI(){
        this.leftCardNum.string = this.allCard.length+"";
    }

    createCardNode(cardType:CardType,num:number,path?:string){
        let cardNode = cc.instantiate(this.card);
        let cardCp = cardNode.getComponent(CardNode);
        if(path){
            cc.assetManager.loadBundle("Texture",(error,bundle)=>{
                bundle.load<cc.SpriteFrame>(path,cc.SpriteFrame,(error,asset)=>{
                    cardCp.img.spriteFrame = asset;
                })
            })
        }
        let card:Card = new Card(cardType,num);
        cardCp.card = card;
        card.node = cardNode;
        return cardNode;
    }

    drawCard() {
        this.updateLeftCardUI();
        let cardNode =  this.allCardNode.pop();
        this.sendCardPoolNode.getComponent(SendCardPoolNode).join(cardNode.getComponent(CardNode));
    }
    
}


export interface CardInfo{
    cardType?:CardType;
    pic?:string;
    number?:number;
}