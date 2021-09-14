// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "../GameScript/GameData/GameData";
import { ResponseCode } from "./WebSocket/Code";
import WebSocketClient, { ClientPackage, ServerPackage } from "./WebSocket/WebSocketClient";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NetNode extends cc.Component {
    
    public static client:WebSocketClient;


    @property({type:cc.Label})
    NetlagLabel:cc.Label = null;

    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2();
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
    }
    start () {
        
    }

    updateNetlag(){
        this.NetlagLabel.string = "延迟:"+NetNode.client._rtt;
    }

    static async sendMessage(clientPackage:ClientPackage){
        NetNode.client.sendMessage(clientPackage);
    }

    static async addMessageListener(code:ResponseCode,listner:(_package:ServerPackage)=>void,target:any){
        NetNode.client.addListener(code,listner,target);
    };

    static async removeMessageListener(code:ResponseCode,listner:(_package:ServerPackage)=>void,target:any){
        NetNode.client.removeListener(code,listner,target);
    };

    updateGameId(editbox){
        GameData.INS.uuid = editbox.string;

    }

    startRoom(){
        NetNode.client = new WebSocketClient("10.2.1.237",17099,GameData.INS.uuid);
        NetNode.client.onClientRegisetred = ()=>{
            cc.game.addPersistRootNode(this.node);
            cc.director.loadScene("Room");
        };
        NetNode.client.startConn();
        this.schedule(()=>{
            this.updateNetlag();
        },3)
    }
}
