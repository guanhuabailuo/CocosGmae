import { ws } from "..";
import { ResponseCode } from "../cede";
import { ServerPackage, socketGroup, SocketProxy } from "../wsSocket";

class RoomServer{

    roomMap:Map<number,Room>

    _roomId:number = 0;

    constructor(){
        this.roomMap = new Map();
    }

    createRoom():number{
        let id = this._roomId++;
        let room = new Room(id);
        this.roomMap.set(id,room);
        return id;
    }

    joinRoom(id:number,key:string,data:any){
        let porxy =  ws.getPorxy(key);
        let room = this.roomMap.get(id);
        room.join(porxy,data)
    }

}

class Room{

    tickNum:number;

    socketGoup:socketGroup;

    infoMap:Map<string,any>;

    messageList:Array<Array<any>>;

    id:number;

    constructor(id:number){
        this.id = id;
        this.socketGoup = new socketGroup(2);
        this.infoMap = new Map();
    }

    start(){
        this.messageList.push(new Array());
        this.messageList.push(new Array());
        this.messageList.push(new Array());
    }

    tick(){
       let allData =  this.messageList.pop();
       let _package:ServerPackage = new ServerPackage();
       _package.code = ResponseCode.RomeTick
       _package.data = allData;
       this.messageList.push(new Array());
       this.socketGoup.bordcast(_package);
    }

    addMessage(data:any){
        let rtt = data.rtt;
        data.rtt = undefined;
        if(rtt <= 50){
            this.messageList[2].push(data)
        }
        if(rtt > 50&&rtt < 100){
            this.messageList[1].push(data)
        }
        if(rtt > 100){
            this.messageList[0].push(data)
        }
    }

    join(porxy:SocketProxy,info) {
        this.socketGoup.join(porxy.remoteAddr,porxy);
        this.infoMap.set(porxy.remoteAddr,info);
        let data = {members:this.getMembers()}
        let _package:ServerPackage = new ServerPackage();
        _package.code = ResponseCode.room_member_bordcast;
        _package.data = data;
        this.socketGoup.bordcast(_package);
    }

    getMembers():any[]{
        let members:any[] = [];
        for (const v of this.infoMap.values()) {
            members.push(v)
        }
        return members;
    }
}


export var roomServer:RoomServer = new RoomServer()