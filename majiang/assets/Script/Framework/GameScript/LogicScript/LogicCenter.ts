// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { PoolType } from '../../../Define/Type'
import { CardInfo } from '../../../UI/GamePlayNode'
import GameCenter from '../GameCenter'
import GameData from '../GameData/GameData'
import DestoryViewAction from '../ViewScript/ViewAction/DestoryViewAction'
import MoveViewAction from '../ViewScript/ViewAction/MoveViewAction'
import RemoveViewAction from '../ViewScript/ViewAction/RemoveViewAction'
import TouchStartViewAction from '../ViewScript/ViewAction/TouchStartViewAction'
import CardPool from './CardPoolNew'
import BaseLogicAction from './LogicAction/BaseLogicAction'
import DestoryUnitAction from './LogicAction/DestoryUnitAction'
import PositionAction from './LogicAction/PositionAction'
import RemoveAction from './LogicAction/RemoveAction'
import TouchStartAction from './LogicAction/TouchStartAction'
import BaseUnit, { UnitType } from './Unit/BaseUnit'
import CardUnit from './Unit/CardUnit'


const { ccclass, property } = cc._decorator

@ccclass
export default class LogicCenter {
    _joinMap: Map<string, BaseUnit>
    _unitMap: Map<string, BaseUnit>
    _actionQueen: Array<BaseLogicAction>
    _idGen = 1

    _logicTickInterval = 0;
    _logicRunTime = 0;

    _tickPackage: {}[];

    _cardPool:CardPool;

    constructor() {
        this._joinMap = new Map()
        this._unitMap = new Map()
        this._actionQueen = new Array()
        this._tickPackage = []
        this._cardPool = new CardPool(7);
    }

    start() {
        this._unitMap = new Map()
        this._actionQueen = new Array()
    }

    update(dt) {
        this._logicRunTime += dt
        if (this._logicRunTime >= this._logicTickInterval) {
            let runTime = this._logicRunTime
            this._logicRunTime = 0
            this.joinWorld(runTime)
            this.handlerActionQueen()
            this._unitMap.forEach((v, k) => {
                v.update(runTime)
            })
        }
    }

    joinWorld(dt) {
        this._joinMap.forEach((v, k) => {
            v.start(dt)
            this._unitMap.set(v._uuid, v)
            if(v instanceof CardUnit){
                let cardUnit = v as CardUnit;
                if(cardUnit._card.poolIndex != -1){
                    this._cardPool.join(cardUnit._card,cardUnit._card.poolIndex);
                }
            }
        })
        this._joinMap.clear()
    }

    generateUid(): string {
        return this._idGen++ + ''
    }

    handlerActionQueen() {
        while (this._actionQueen.length > 0) {
            const action = this._actionQueen.pop()
            if(action instanceof DestoryUnitAction){
                this.removeUnit(action);
                continue;
            }
            if(action instanceof TouchStartAction){
                this.handlerTouch(action);
                continue;
            }
            if(action instanceof RemoveAction){
                this.removeOneUnit(action.cardinfo);
                continue;
            }
            const handlerUnit = this._unitMap.get(action.targetUid)
            if (handlerUnit) {
                handlerUnit.handlerAction(action)
            } else {
                console.info(action.targetUid + '单位不存在')
            }
        }
    }

    removeUnit(action:DestoryUnitAction){
        for (let i = 0; i < action.cards.length; i++) {
            let unit = this._unitMap.get(action.cards[i].id+"");
            this._unitMap.delete(action.cards[i].id+"");
            if(unit){
                unit.onDestory();
            }
            this._cardPool.remove(action.cards);
        }
    }

    removeOneUnit(cardInfo:CardInfo){
        let unit = this._unitMap.get(cardInfo.id+"");
            this._unitMap.delete(cardInfo.id+"");
            if(unit){
                unit.onDestory();
            }
            
            
    }


    handlerTouch(action:TouchStartAction){
        let unit =  this._unitMap.get(action.targetUid) as CardUnit;
        let add =  this._cardPool.addSelectCard(unit._card);
        if (add){
            let ac:TouchStartViewAction  = new TouchStartViewAction(action.targetUid,undefined,true);
            GameCenter.GAME_CENTER.pushViewAction(ac);
            if(add){
                if(this._cardPool.canStartExchange()){
                    this._cardPool.onAnimation = true;
                    this._cardPool.exchange();
                    let amove = new MoveViewAction(this._cardPool.selectCards[0].id+"",undefined);
                    let bmove = new MoveViewAction(this._cardPool.selectCards[1].id+"",undefined);
                    GameCenter.GAME_CENTER.pushViewAction(amove);
                    GameCenter.GAME_CENTER.pushViewAction(bmove);
                    let tag =  this._cardPool.checkComb();
                    if(!tag.win){
                        GameCenter.GAME_CENTER.scheduleOnce(()=>{
                            this._cardPool.onAnimation = false;
                            this.resetSelectCard();
                        },0.3)
                    }else{
                        GameCenter.GAME_CENTER.scheduleOnce(()=>{
                            this.checkCard();
                        },0.5)
                    }
                }
            }
        }   
    }

    resetSelectCard(){
        let a = this._cardPool.selectCards[0];
        let b = this._cardPool.selectCards[1];
        if(a.pooltype != PoolType.SendPool && b.pooltype != PoolType.SendPool){
            this._cardPool.exchange();
            let amove = new MoveViewAction(this._cardPool.selectCards[0].id+"",undefined);
            let bmove = new MoveViewAction(this._cardPool.selectCards[1].id+"",undefined);
            GameCenter.GAME_CENTER.pushViewAction(amove);
            GameCenter.GAME_CENTER.pushViewAction(bmove);
            GameCenter.GAME_CENTER.pushViewAction(new TouchStartViewAction(this._cardPool.selectCards[0].id+"",undefined,false));
            GameCenter.GAME_CENTER.pushViewAction(new TouchStartViewAction(this._cardPool.selectCards[1].id+"",undefined,false));
            this._cardPool.selectCards = [];
        }else{
            let card:CardInfo = undefined;
            if(a.pooltype == PoolType.SendPool){
                card = a;
            }
            if(b.pooltype == PoolType.SendPool){
                card = b;
            }
            GameCenter.GAME_CENTER.addCard2Mo();
            GameCenter.GAME_CENTER.pushViewAction(new RemoveViewAction(card.id+""));
            GameCenter.GAME_CENTER.pushLogicAction(new RemoveAction(card.id+"",card));
            this._cardPool.selectCards = [];
        }
        
    }

    animationSpeed:number = 2

    checkCard(){
        let a = this._cardPool.selectCards[0];
        let b = this._cardPool.selectCards[1];
        if(a){
            GameCenter.GAME_CENTER.pushViewAction(new TouchStartViewAction(this._cardPool.selectCards[0].id+"",undefined,false));
        }
        if(b){
            GameCenter.GAME_CENTER.pushViewAction(new TouchStartViewAction(this._cardPool.selectCards[1].id+"",undefined,false));
        }
        this._cardPool.selectCards = [];
        this._cardPool.onAnimation = false;
        let tag =  this._cardPool.checkComb();
        if(tag.win){
            this._cardPool.onAnimation = true;
            GameCenter.GAME_CENTER.pushLogicAction(new DestoryUnitAction(undefined,tag.card));
            GameCenter.GAME_CENTER.pushViewAction(new DestoryViewAction(tag))
            GameCenter.GAME_CENTER.scheduleOnce(()=>{
                this.checkCard();
            },0.3)
        }else{
            this.reloadAllCard();
            let empty =  this._cardPool.getEmpty();
            this._cardPool.onAnimation = false;
            if(empty.length>0){
                this._cardPool.onAnimation = true;
                GameCenter.GAME_CENTER.scheduleOnce(()=>{
                    GameCenter.GAME_CENTER.addCard2Game(empty);
                    GameCenter.GAME_CENTER.scheduleOnce(()=>{
                        this.checkCard()
                    },0.5)
                },0.5)
            }
       }
    }

    reloadAllCard(){
      let change =  this._cardPool.test();
      for (let i = 0; i < change.length; i++) {
          const element = change[i];
          GameCenter.GAME_CENTER.pushViewAction(new MoveViewAction(element.id+"",undefined));
      }

    }



    pushAction(action: BaseLogicAction) {
        this._actionQueen.push(action)
    }

    addUnit(unit: BaseUnit) {
        this._joinMap.set(unit._uuid, unit)
    }

    

    pushPackage(data: {}) {
        this._tickPackage.push(data)
    }

    
}
