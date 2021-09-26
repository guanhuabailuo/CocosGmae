// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from '../../Define/EventId'
import { CardType, PoolType } from '../../Define/Type'
import Card from '../../GamePlay/Card'
import PoolBox from '../../GamePlay/PoolBox'
import { CardInfo } from '../../UI/GamePlayNode'
import UIRoot from '../../UI/GamePlayUI/UIRoot'
import { EVENT } from '../Event/EventMgr'
import GameData, { gameData } from './GameData/GameData'
import BaseLogicAction from './LogicScript/LogicAction/BaseLogicAction'
import LogicCenter from './LogicScript/LogicCenter'
import LogicTimer from './LogicScript/Timer'
import { UnitType } from './LogicScript/Unit/BaseUnit'
import CardUnit from './LogicScript/Unit/CardUnit'
import BaseViewAction from './ViewScript/ViewAction/BaseViewAction'
import ViewCenter from './ViewScript/ViewCenter'
import CardInfoComponet from './ViewScript/ViewUnit/CardInfoComponet'
import UnitViewComponet from './ViewScript/ViewUnit/UnitViewComponet'


const { ccclass, property } = cc._decorator

@ccclass
export default class GameCenter extends cc.Component {
    
    public static LOGIC_TICK: number = 50

    public static GAME_CENTER: GameCenter
    test:cc.Layout

    @property({ type: cc.Prefab })
    unit: cc.Prefab = undefined

    _ViewCenter: ViewCenter

    _LogicCenter: LogicCenter

    _cardNodePool:cc.NodePool;

    _deadNodePool:cc.NodePool;

    _poolBox:PoolBox;

    onLoad() {
        this.initNodePool();
        this.initDeadNodePool();
        this._poolBox = new PoolBox(gameData._currentConfig.poolSize,1050,900,0);
        this._ViewCenter = this.getComponent(ViewCenter);
        this._LogicCenter = new LogicCenter();
        GameCenter.GAME_CENTER = this;
    }

    start(){
        let deadNums =  gameData._currentConfig.dead as number[]
        let poolSize = gameData._currentConfig.poolSize*gameData._currentConfig.poolSize
        for (let i = 0; i < poolSize; i++) {
            let node:cc.Node = null;
            if(deadNums.indexOf(i) != -1){
                node = this._deadNodePool.get();
            }else{
                node =  this._cardNodePool.get();
            }
            node.scale = gameData.getScale();
            let pos = this._poolBox.caculatePosByIndex(i);
            let cardInfoCp = node.getComponent(CardInfoComponet);
            let UnitViewcp= node.getComponent(UnitViewComponet);
            if(deadNums.indexOf(i) != -1){
                UnitViewcp.onTouchStart = () => {};
                UnitViewcp.onTouchMove = () => {};
                UnitViewcp.onTouchMove = () => {};
            }
            UnitViewcp.unitId = cardInfoCp.card.id+"";
            cardInfoCp.card.poolIndex = i;
            let unit:CardUnit = new CardUnit(cardInfoCp.card.id+"",pos,cardInfoCp.card);
            this._LogicCenter.addUnit(unit);
            this._ViewCenter.addUnit(UnitViewcp,pos);
        }
        this.addCard2Mo();
        gameData._leftCardNum = this._cardNodePool.size();
        EVENT.emit(EventId.update_card_num);
    }

    addCard2Game(empty: number[]) {
        for (let i = 0; i < empty.length; i++) {
            if(this._cardNodePool.size()>0){
                const poolIndex = empty[i];
                let node =  this._cardNodePool.get();
                node.scale = gameData.getScale();
                let pos = new cc.Vec3(0,-1000);
                let cardInfoCp = node.getComponent(CardInfoComponet);
                let UnitViewcp= node.getComponent(UnitViewComponet);
                UnitViewcp.unitId = cardInfoCp.card.id+"";
                cardInfoCp.card.poolIndex = poolIndex;
                cardInfoCp.card.pooltype = PoolType.GamePool
                let unit:CardUnit = new CardUnit(cardInfoCp.card.id+"",pos,cardInfoCp.card);
                this._LogicCenter.addUnit(unit);
                this._ViewCenter.addUnit(UnitViewcp,pos);
            }
            gameData._leftCardNum = this._cardNodePool.size();
            if(gameData._leftCardNum <= 0){
                this.gameEnd();
            }
            EVENT.emit(EventId.update_card_num);
        }
    }
    gameEnd() {
        this.update = ()=>{};
        UIRoot.UIROOT.openGameEndUI();
    }

    addCard2Mo(){
        if(this._cardNodePool.size()>0){
            let node =  this._cardNodePool.get();
            node.scale = gameData.getScale();
            let pos = new cc.Vec3(430,-800);
            let cardInfoCp = node.getComponent(CardInfoComponet);
            let UnitViewcp= node.getComponent(UnitViewComponet);
            UnitViewcp.unitId = cardInfoCp.card.id+"";
            cardInfoCp.card.poolIndex = -1;
            cardInfoCp.card.pooltype = PoolType.SendPool
            let unit:CardUnit = new CardUnit(cardInfoCp.card.id+"",pos,cardInfoCp.card);
            this._LogicCenter.addUnit(unit);
            this._ViewCenter.addUnit(UnitViewcp,pos);
            gameData._leftCardNum = this._cardNodePool.size();
            EVENT.emit(EventId.update_card_num);
        }
    }

    initNodePool(){
        let cardInfoArray = this.createOneGroupCardInfo();
        cardInfoArray.sort((a,b)=>{
            return Math.random()-0.5;
        })
        this._cardNodePool = new cc.NodePool(UnitViewComponet);
        for (let i = 0; i < cardInfoArray.length; i++) {
            cardInfoArray[i].id = i;
            cardInfoArray[i].pooltype = PoolType.GamePool
            let cardNode = cc.instantiate(this.unit);
            let UnitViewcp:UnitViewComponet = cardNode.getComponent(UnitViewComponet);
            UnitViewcp.init(cardInfoArray[i].id+"",UnitType.Player);
            cardNode.addComponent(CardInfoComponet);
            let cardInfoCp = cardNode.getComponent(CardInfoComponet);
            cardInfoCp.card = cardInfoArray[i];
            this._cardNodePool.put(cardNode);
        }
    }

    initDeadNodePool(){
        this._deadNodePool = new cc.NodePool(UnitViewComponet)
        for (let i = 0; i < 10; i++) {
            let cardInfo:CardInfo = {pooltype:PoolType.none,cardType:CardType.dead,pic:"back/bg_game_huge_1",number:-1,id:1000+i}
            let cardNode = cc.instantiate(this.unit);
            let UnitViewcp:UnitViewComponet = cardNode.getComponent(UnitViewComponet);
            UnitViewcp.init(cardInfo.id+"",UnitType.Player);
            cardNode.addComponent(CardInfoComponet);
            let cardInfoCp = cardNode.getComponent(CardInfoComponet);
            cardInfoCp.card = cardInfo;
            this._deadNodePool.put(cardNode);
        }
    }


    createOneGroupCardInfo():Array<CardInfo>{

        let levelConfig = gameData._currentConfig;
        let initCard = levelConfig.initCard;
        let allCard:Array<CardInfo> = new Array();

        let fengNum = initCard.feng;
        let ziNum = initCard.zi;
        let tiaoNum = initCard.tiao;
        let tongNum = initCard.tong;
        let wanNum = initCard.wan;
        for (let i = 1; i <= 4; i++) {
            for (let j = 0; j < fengNum; j++) {
                let cardInfo:CardInfo = {pooltype:PoolType.none}; 
                cardInfo.number = i
                cardInfo.cardType = CardType.feng
                cardInfo.pic = "Card/feng_"+i;
                allCard.push(cardInfo);
            }
        }

        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < ziNum; j++) {
                let cardInfo:CardInfo = {pooltype:PoolType.none}; 
                cardInfo.number = i
                cardInfo.cardType = CardType.zi
                cardInfo.pic = "Card/zi_"+i;
                allCard.push(cardInfo);
            }
        }
        
        
        for (let j = 1; j <= 9; j++) {
            for (let k = 0; k < tiaoNum; k++) {
                let cardInfo:CardInfo = {pooltype:PoolType.none}; 
                cardInfo.number = j
                cardInfo.cardType = CardType.tiao
                cardInfo.pic = "Card/tiao_"+j;
                allCard.push(cardInfo);
            }
        }

        for (let j = 1; j <= 9; j++) {
            for (let k = 0; k < tongNum; k++) {
                let cardInfo:CardInfo = {pooltype:PoolType.none}; 
                cardInfo.number = j
                cardInfo.cardType = CardType.tong
                cardInfo.pic = "Card/tong_"+j;
                allCard.push(cardInfo);
            }
        }

        for (let j = 1; j <= 9; j++) {
            for (let k = 0; k < wanNum; k++) {
                let cardInfo:CardInfo = {pooltype:PoolType.none}; 
                cardInfo.number = j
                cardInfo.cardType = CardType.wan
                cardInfo.pic = "Card/wan_"+j;
                allCard.push(cardInfo);
            }
        }
        return allCard;
    }

    update(dt) {
        this._LogicCenter.update(dt);
        this._ViewCenter.gameUpdate(dt);
    }

    pushViewAction(action: BaseViewAction) {
        this._ViewCenter.pushAction(action);
    }

    pushLogicAction(action: BaseLogicAction) {
        this._LogicCenter.pushAction(action);
    }

    pushPackage(data: {}) {
        this._LogicCenter.pushPackage(data);
    }

    
}