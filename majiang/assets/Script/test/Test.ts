// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { RunManyCallBack } from "../Framework/Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.Node})
    node1:cc.Node = null;
    @property({type:cc.Node})
    node2:cc.Node = null;

    start () {

        let back : RunManyCallBack = new RunManyCallBack(this,2,()=>{
            console.info(this);
        })

        let t1 =  cc.tween(this.node1).to(1,{position:cc.v3(0,0,0)}).call(()=>{
            console.info(1111);
            back.oncall()}).start();
        let t2 = cc.tween(this.node2).to(1,{position:cc.v3(0,0,0)}).start().call(()=>{back.oncall()});
        
    }

    // update (dt) {}
}
