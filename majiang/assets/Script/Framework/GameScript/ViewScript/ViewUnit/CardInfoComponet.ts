// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CardInfo } from "../../../../UI/GamePlayNode";
import BaseViewComponet from "../BaseViewComponet";
import UnitMoveComponet from "./UnitMoveComponet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardInfoComponet extends cc.Component {

    card:CardInfo;

    onLoad(){
       let back =  this.node.getChildByName("BackGround");
       cc.assetManager.loadBundle("Texture",(error,bundle)=>{
        bundle.load<cc.SpriteFrame>(this.card.pic,cc.SpriteFrame,(error,asset)=>{
            back.getComponent(cc.Sprite).spriteFrame = asset;
            })
        })
    }

    start(){
        
    }
}
