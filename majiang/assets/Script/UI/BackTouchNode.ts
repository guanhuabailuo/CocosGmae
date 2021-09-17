// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Prefab})
    p:cc.Prefab = null;
    
    ParticleSystem:cc.ParticleSystem;

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this,false);
        let p_node =  cc.instantiate(this.p);
        p_node.setParent(this.node);
        this.ParticleSystem =   p_node.getComponent(cc.ParticleSystem)
        this.ParticleSystem.stopSystem();
    }

    start () {
        
    }

    onTouchStart(event:cc.Event.EventTouch){
        console.info(1111);
        let position = this.node.convertToNodeSpaceAR(event.getLocation());
        this.ParticleSystem.node.setPosition(position);
        this.ParticleSystem.resetSystem();
        EVENT.emit(EventId.Button_touch)
    }
}
