// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import RingLaout from "../../../FarmWork/RingLaout";
import { Group } from "../../Defin";
import UnitCollideComponet from "./UnitCollideComponet";

const {ccclass, property} = cc._decorator;


@ccclass
export default class KnifeKeeperComponet extends cc.Component {

    knifeRoot!:cc.Node;

    ringLaout!:RingLaout;

    onLoad(){
        this.ringLaout = this.getComponentInChildren(RingLaout);
        this.knifeRoot = this.node.getChildByName("KnifeRoot");
    }
    
    start () {

    }

    addKnife(knifeNode:cc.Node){
        console.info(1111);
        let knifeCollideCp =  knifeNode.getComponent(UnitCollideComponet);
        knifeNode.group = Group.KnifeOnPlayer;
        knifeCollideCp.init(this,(other,self)=>{
            this.collisionEnter();
        })
        console.info(this.knifeRoot.childrenCount);
        knifeNode.setParent(this.knifeRoot);
        if(this.knifeRoot.childrenCount == 6){
            this.ringLaout.radius = this.ringLaout.radius + 100;
        }
    }

    collisionEnter(){
        this.ringLaout.rotatoSpeed -= 50;
        this.scheduleOnce(()=>{
            this.ringLaout.rotatoSpeed += 50;
        },1)
    }


}
