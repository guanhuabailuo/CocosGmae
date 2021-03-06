// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



import TouchMoveViewAction from "../ViewAction/TouchMoveViewAction";
import TouchStartViewAction from "../ViewAction/TouchStartViewAction";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitTouchComponet extends cc.Component {

    touchMark:cc.Sprite;

    onLoad(){
       this.touchMark =  this.node.getChildByName("TouchMark").getComponent(cc.Sprite);
    }

    

    update(dt){
       
    }

    

   
    handlerAction(action:TouchStartViewAction){
        if(action.show){
            cc.tween(this.touchMark.node).to(0.2,{opacity:100}).start();
        }else{
            cc.tween(this.touchMark.node).to(0.2,{opacity:0}).start();
        }
    }

    

}
