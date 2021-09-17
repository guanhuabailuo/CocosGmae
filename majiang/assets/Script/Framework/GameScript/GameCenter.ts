// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CardType } from '../../Define/Type'
import Card from '../../GamePlay/Card'
import PoolBox from '../../GamePlay/PoolBox'
import { CardInfo } from '../../UI/GamePlayNode'
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

    _poolBox:PoolBox;

    onLoad() {
        this.initNodePool();
        this._poolBox = new PoolBox(7,900,1050,0);
        this._ViewCenter = this.getComponent(ViewCenter);
        this._LogicCenter = new LogicCenter();
        GameCenter.GAME_CENTER = this;
    }

    start(){
        for (let i = 0; i < 49; i++) {
            let node =  this._cardNodePool.get();
            let pos = this._poolBox.caculatePosByIndex(i);
            let cardInfoCp = node.getComponent(CardInfoComponet);
            let UnitViewcp= node.getComponent(UnitViewComponet);
            UnitViewcp.unitId = cardInfoCp.card.id+"";
            cardInfoCp.card.poolIndex = i;
            let unit:CardUnit = new CardUnit(cardInfoCp.card.id+"",pos,cardInfoCp.card);
            this._LogicCenter.addUnit(unit);
            this._ViewCenter.addUnit(UnitViewcp,pos);
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
            let cardNode = cc.instantiate(this.unit);
            let UnitViewcp:UnitViewComponet = cardNode.getComponent(UnitViewComponet);
            UnitViewcp.init(cardInfoArray[i].id+"",UnitType.Player);
            cardNode.addComponent(CardInfoComponet);
            let cardInfoCp = cardNode.getComponent(CardInfoComponet);
            cardInfoCp.card = cardInfoArray[i];
            this._cardNodePool.put(cardNode);
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