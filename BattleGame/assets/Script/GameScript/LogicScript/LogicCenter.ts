// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NetNode from '../../Net/NetNode'
import { RequestCode, RoomTickType } from '../../Net/WebSocket/Code'
import { ClientPackage, ServerPackage } from '../../Net/WebSocket/WebSocketClient'
import GameData from '../GameData/GameData'
import BaseLogicAction from './LogicAction/BaseLogicAction'
import DestoryUnitAction from './LogicAction/DestoryUnitAction'
import PositionAction from './LogicAction/PositionAction'
import BaseUnit, { UnitType } from './Unit/BaseUnit'
import Player from './Unit/Player'

const { ccclass, property } = cc._decorator

@ccclass
export default class LogicCenter {
    _joinMap: Map<string, BaseUnit>
    _unitMap: Map<string, BaseUnit>
    _actionQueen: Array<BaseLogicAction>
    _idGen = 1

    _logicTickInterval = 0.0666666666
    _logicRunTime = 0

    _tickPackage: {}[]

    constructor() {
        this._joinMap = new Map()
        this._unitMap = new Map()
        this._actionQueen = new Array()
        this._tickPackage = []
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
            this.sendTickMessage()
        }
    }

    joinWorld(dt) {
        this._joinMap.forEach((v, k) => {
            v.start(dt)
            this._unitMap.set(v._uuid, v)
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
                this.removeUnit(action.targetUid);
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

    removeUnit(uuid:string){
        let unit = this._unitMap.get(uuid);
        this._unitMap.delete(uuid);
        if(unit){
            unit.onDestory();
        }
    }

    pushAction(action: BaseLogicAction) {
        this._actionQueen.push(action)
    }

    addUnit(unit: BaseUnit) {
        this._joinMap.set(unit._uuid, unit)
    }

    sendTickMessage() {
        if (this._tickPackage.length > 0) {
            let data = {
                roomId: GameData.INS.roomId,
                rtt: NetNode.client._rtt,
                ticks: this._tickPackage,
            }
            let _package: ClientPackage = new ClientPackage(RequestCode.RomeTick, data)
            NetNode.sendMessage(_package)
            this._tickPackage = []
        }
    }

    pushPackage(data: {}) {
        this._tickPackage.push(data)
    }

    onTickMessage(_package: ServerPackage) {
        let data = _package.data
        let ticklength = data.length
        for (let i = 0; i < ticklength; i++) {
            const oneClientTick = data[i].ticks
            let oneClientTicklength = oneClientTick.length
            for (let j = 0; j < oneClientTicklength; j++) {
                const tick = oneClientTick[j]
                if (tick.type == RoomTickType.posiiton) {
                    let uuid = tick.uuid
                    let position = new cc.Vec3(tick.position.x, tick.position.y, 0)
                    let positionAction: PositionAction = new PositionAction(uuid, position)
                    this.pushAction(positionAction)
                }
            }
        }
    }
}
