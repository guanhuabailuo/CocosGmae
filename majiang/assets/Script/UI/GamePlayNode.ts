// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { CardType } from "../Define/Type";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "../GamePlay/Card";
import GamePlay, { Game_Play_ins } from "../GamePlay/GamePlay";
import { CombTag } from "../GamePlay/WinFilter/Filter";
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

    gamePlay:GamePlay;

    allCard:Array<CardInfo>;

    score:number = 0; 

    onLoad(){
        this.gamePlay = Game_Play_ins;
        this.gamePlay.cardPoolNode = this.cardPool.getComponent(CardPoolNode);
        this.gamePlay.sendCardPoolNode = this.sendCardPoolNode.getComponent(SendCardPoolNode);
        this.gamePlay.gamePlayNode = this;
        this.gamePlay.winCardPoolNode = this.winCardPoolNode.getComponent(WinCardPoolNode);
        cc.assetManager.loadBundle("Texture");
        cc.assetManager.bundles

        EVENT.on(EventId.card_comb,this.onCardComb,this,false);

        EVENT.on(EventId.addScore,this.addScore,this,false);
    }
    addScore(addScore:number) {
       this.score += addScore;
       this.scoreLabel.string = "分数:"+this.score;
    }


    onCardComb(tag:CombTag){

        for (let i = 0; i < 3; i++) {
            let index = tag.card[i].node.getSiblingIndex();
            let cardInfo = this.allCard.pop();
            let cardNode =  this.createCardNode(cardInfo.cardType,cardInfo.number,cardInfo.pic);
            Game_Play_ins.winCardPoolNode.join(tag.card[i].node.getComponent(CardNode));
            this.gamePlay.cardPoolNode.join(cardNode.getComponent(CardNode),index);
        }
        this.updateLeftCardUI();
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
        this.allCard = this.createOneGroupCardInfo();
        this.allCard.sort((a,b)=>{
            return Math.random()-0.5;
        })


        for (let i = 0; i < 49; i++) {
            let cardInfo = this.allCard.pop();
            let cardNode =  this.createCardNode(cardInfo.cardType,cardInfo.number,cardInfo.pic);
            this.gamePlay.cardPoolNode.join(cardNode.getComponent(CardNode),i);
        }
        let cardInfo = this.allCard.pop();
        let cardNode =  this.createCardNode(cardInfo.cardType,cardInfo.number,cardInfo.pic);
        this.gamePlay.sendCardPoolNode.join(cardNode.getComponent(CardNode));
        this.updateLeftCardUI();
    }

    updateLeftCardUI(){
        this.leftCardNum.string = "剩余牌数:"+this.allCard.length;
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
        let cardInfo = this.allCard.pop();
        this.updateLeftCardUI();
        let cardNode =  this.createCardNode(cardInfo.cardType,cardInfo.number,cardInfo.pic);
        this.sendCardPoolNode.getComponent(SendCardPoolNode).join(cardNode.getComponent(CardNode));
    }
    
}


export interface CardInfo{
    cardType?:CardType;
    pic?:string;
    number?:number;
}