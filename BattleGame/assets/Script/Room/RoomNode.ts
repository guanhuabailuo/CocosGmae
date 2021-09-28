// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData, { RoomData } from "../GameScript/GameData/GameData";
import NetNode from "../Net/NetNode";
import { RequestCode, ResponseCode, RoomMember } from "../Net/WebSocket/Code";
import { ClientPackage, ServerPackage } from "../Net/WebSocket/WebSocketClient";
import MemberNode from "./MemberNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomNode extends cc.Component {


    @property({type:cc.Prefab})
    memberPrefab:cc.Prefab = null;

    @property({type:cc.Label})
    idLabel:cc.Label = null;

    id:number;

    initMembers:Map<string,MemberNode>

    start () {
        NetNode.addMessageListener(ResponseCode.room_member_bordcast,this.onMemberChange,this);
        NetNode.addMessageListener(ResponseCode.createRome,this.onCreatRoom,this);
        NetNode.addMessageListener(ResponseCode.room_start_bordcast,this.onRoomStart,this);
        this.initMembers = new Map();
    }

    onDestroy(){
        NetNode.removeMessageListener(ResponseCode.room_member_bordcast,this.onCreatRoom,this);
        NetNode.removeMessageListener(ResponseCode.createRome,this.onCreatRoom,this);
        NetNode.removeMessageListener(ResponseCode.room_start_bordcast,this.onRoomStart,this);
    }

    onCreatRoom(_package:ServerPackage) {
        let id = _package.data.id;
        this.id = id;
        this.idLabel.string = "房间ID"+id;
    }

    onMemberChange(_package:ServerPackage){
        let data = _package.data;
        let members:RoomMember[] = data.members;
        for (let i = 0; i < members.length; i++) {
            const memberData = members[i];
            let name = memberData.name;
            let uuid = memberData.uuid;
            if(this.initMembers.has(uuid)){
                continue;
            }
            let memberNode =  cc.instantiate(this.memberPrefab);
            let cp = memberNode.getComponent(MemberNode);
            cp.id = uuid;
            cp.name = name;
            this.initMembers.set(uuid,cp);
            memberNode.setParent(this.node);
        }

    }

    createRoom(){
        let _package:ClientPackage = new ClientPackage(RequestCode.createRome,{});
        NetNode.sendMessage(_package);
    }

    joinRoom(){
        let memberInfo:RoomMember = {name:NetNode.client._uuid,uuid:NetNode.client._uuid}
        let  data = {id:this.id,info:memberInfo}
        let _package:ClientPackage = new ClientPackage(RequestCode.joinRome,data);
        NetNode.sendMessage(_package);
    }
    
    setRoomId(editBox:cc.EditBox){
        let id =  Number.parseInt(editBox.string);
        this.id = id;
        this.idLabel.string = "房间ID"+id;
    }

    onRoomStart(_package:ServerPackage){
        let data = _package.data;
        let members:RoomMember[] = data.members;
        GameData.INS.roomeDate = {members:members};
        GameData.INS.roomId = this.id;
        cc.director.loadScene("helloworld");
    }

    roomStart(){
        let data = {roomId:this.id}
        let _package:ClientPackage = new ClientPackage(RequestCode.roomStart,data);
        NetNode.sendMessage(_package);
    }


}
