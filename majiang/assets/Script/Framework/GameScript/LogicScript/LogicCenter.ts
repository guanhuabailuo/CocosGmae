// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import GameCenter from '../GameCenter'
import GameData from '../GameData/GameData'
import DestoryViewAction from '../ViewScript/ViewAction/DestoryViewAction'
import MoveViewAction from '../ViewScript/ViewAction/MoveViewAction'
import TouchStartViewAction from '../ViewScript/ViewAction/TouchStartViewAction'
import CardPool from './CardPoolNew'
import BaseLogicAction from './LogicAction/BaseLogicAction'
import DestoryUnitAction from './LogicAction/DestoryUnitAction'
import PositionAction from './LogicAction/PositionAction'
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
                this._cardPool.join(cardUnit._card,cardUnit._card.poolIndex);
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


    handlerTouch(action:TouchStartAction){
        let unit =  this._unitMap.get(action.targetUid) as CardUnit;
        let add =  this._cardPool.addSelectCard(unit._card);
        if (add){
            let ac:TouchStartViewAction  = new TouchStartViewAction(action.targetUid,undefined);
            GameCenter.GAME_CENTER.pushViewAction(ac);
            if(add){
                if(this._cardPool.canStartExchange()){
                    this._cardPool.onAnimation = true;
                    this._cardPool.exchange();
                    let amove = new MoveViewAction(this._cardPool.selectCards[0].id+"",undefined);
                    let bmove = new MoveViewAction(this._cardPool.selectCards[1].id+"",undefined);
                    GameCenter.GAME_CENTER.pushViewAction(amove);
                    GameCenter.GAME_CENTER.pushViewAction(bmove);
                    GameCenter.GAME_CENTER.scheduleOnce(()=>{
                        this.checkCard();
                    },0.5)
                }
            }
        }   
    }

    checkCard(){
        console.info(this);
       this._cardPool.selectCards = [];
       this._cardPool.onAnimation = false;
       let tag =  this._cardPool.checkComb();
       if(tag.win){
            GameCenter.GAME_CENTER.pushLogicAction(new DestoryUnitAction(undefined,tag.card));
            GameCenter.GAME_CENTER.pushViewAction(new DestoryViewAction(undefined,tag.card))
            GameCenter.GAME_CENTER.scheduleOnce(()=>{
                this.reloadAllCard();
            },0.5);
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
