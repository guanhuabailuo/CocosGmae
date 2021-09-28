// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { gameData } from '../../Framework/GameScript/GameData/GameData';
import { castString } from '../../Framework/GameScript/LogicScript/FilterNew';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TargetNode extends cc.Component {
    @property({ type: cc.Node })
    root: cc.Node = undefined;

    @property({ type: cc.Prefab })
    per: cc.Prefab = undefined;

    targets: Array<TargetInfo> = new Array();

    start() {
        let levelConfig = gameData._currentConfig;
        let targets = levelConfig.target;
        for (let i = 0; i < 3; i++) {
            let target = targets[i];
            let targetInfo = new TargetInfo(target.type, target.target, i);
            this.targets.push(targetInfo);
            let targetNode = cc.instantiate(this.per);
            let label = targetNode.getComponentInChildren(cc.Label);
            targetInfo.node = targetNode;
            label.string = castString(target.type) + target.target;
            this.root.addChild(targetNode);
        }
    }

    

    checkTarget(){
        this.targets.forEach(tag =>{
            if(tag.targetType == "score"){
                if(tag.target <= gameData._score){
                    tag.node.getChildByName("Label").color = cc.Color.YELLOW;
                    tag.complete = true;
                }
            }else{
                let count = gameData.containTag(tag.targetType);
                if(count >= tag.target){
                    tag.node.getChildByName("Label").color = cc.Color.YELLOW;
                    tag.complete = true;
                }
            }
        })

    }

}

class TargetInfo {
    targetType: string;
    target: number;
    index: number;
    node:cc.Node;
    complete:boolean;
    constructor(type: string, target: number, index: number) {
        this.targetType = type;
        this.target = target;
        this.index = index;
        this.complete = false;
    }
}
