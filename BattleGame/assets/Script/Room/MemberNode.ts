// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MemberNode extends cc.Component {

    id:string;

    name:string;

    @property({type:cc.Label})
    nameLabel:cc.Label

    start () {
        this.nameLabel.string = this.name;
    }

    
}
