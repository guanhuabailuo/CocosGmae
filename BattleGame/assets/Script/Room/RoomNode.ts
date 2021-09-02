// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    idLabel:cc.Label

    id:number;

    initMembers:Map<string,MemberNode>

    start () {
        NetNode.addMessageListener(ResponseCode.room_member_bordcast,this.onMemberChange,this);
        NetNode.addMessageListener(ResponseCode.createRome,this.onCreatRoom,this);
        this.initMembers = new Map();
    }

    onDestroy(){
        NetNode.removeMessageListener(ResponseCode.room_member_bordcast,this.onCreatRoom,this);
        NetNode.removeMessageListener(ResponseCode.createRome,this.onCreatRoom,this);
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
        let key = Math.floor(Math.random()*10000)+""
        let memberInfo:RoomMember = {name:key,uuid:NetNode.client._uuid}
        let  data = {id:this.id,info:memberInfo}
        let _package:ClientPackage = new ClientPackage(RequestCode.joinRome,data);
        NetNode.sendMessage(_package);
    }
    
    setRoomId(idStr:string){
        let id =  Number.parseInt(idStr);
        this.id = id;
        this.idLabel.string = "房间ID"+id;
    }

}
