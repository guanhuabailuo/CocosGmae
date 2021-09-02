import SocketIO from "socket.io";
import { EventEmitter } from "events"
import * as ws from "ws"
import { SocketRouteModule } from "./route/SocketRouteModule";
import { RequestCode, ResponseCode } from "./cede";
import { Console } from "console";
const defaultPort:number = 17099;

export class SocketServer extends EventEmitter{
    
    allSocket:socketGroup

    constructor(port?:number){
        super();
        this.allSocket = new socketGroup(1000);
        let opt:ws.ServerOptions = {port:port||defaultPort}
        let server =  new ws.Server(opt,()=>{
            console.info("ws 开启")
        });
        let that = this;
        server.on("connection", (socket, req)=> {
            if(that.allSocket.isFull()){
                socket.close();
            }
            let remoteAddr = req.connection.remoteAddress;
            let socketProxy:SocketProxy = new SocketProxy(socket,remoteAddr,that);
            this.allSocket.join(remoteAddr,socketProxy);
        });
        server.on("err",()=>{});
    }

    removePorxy(socketProxy:SocketProxy){
        this.allSocket.level(socketProxy.remoteAddr);
    }

    getPorxy(key: string):SocketProxy {
       return this.allSocket.getPorxy(key)
    }

}


export class SocketProxy{
    socketServer:SocketServer
    socket:WebSocket;
    heartBeatTimeOut:number = 6*1000
    heartBeatTimer = null as any;
    registed:boolean = false;
    remoteAddr:string
    constructor(socket:any,remoteAddr:string,socketServer:SocketServer){
        this.socket = socket;
        this.remoteAddr = remoteAddr
        this.socketServer = socketServer;
        this.heartBeatTimer = setTimeout(()=>{this.close()},this.heartBeatTimeOut);
        let that = this;
        this.socket.onmessage = (event)=>{
            that.onMessage(event);
        }
        this.socket.onclose =()=>{

        }
    }

    onclose(){
        this.socketServer.removePorxy(this);
    }

    async ping(data:any){
        clearTimeout(this.heartBeatTimer)
        this.heartBeatTimer = setTimeout(()=>{this.close()},this.heartBeatTimeOut)
        let _package:ServerPackage = new ServerPackage();
        _package.code = ResponseCode.ping;
        _package.data = {clientTime:data.clientTime}
        this.sendMessage(_package);
    }

    async close(){
        clearTimeout(this.heartBeatTimer);
        this.socket.close();
    }

    async onMessage(message){
        console.info(message);
        let _package = new ClientPackage()
        _package.decode(message.data);
        const code = _package.code;
        const data = _package.data;
        if(code == RequestCode.ping){
            this.ping(data);
            return;
        }else if( code == RequestCode.regiset){
            if(this.registed){
                this.close();
                return;
            }
            data.uuid = this.remoteAddr;
            let res:ServerPackage = await SocketRouteModule.handler(code,data)
            if (res.code == ResponseCode.error){
                this.socket.send(JSON.stringify(res));
                return;
            }
            this.registed = true;
            this.socket.send(JSON.stringify(res));
            return res;
        }else{
            let res:ServerPackage = await SocketRouteModule.handler(code,data);
            this.socket.send(JSON.stringify(res));
            return;
        }
    }

    sendMessage(serverPackage:ServerPackage){
        if(!this.registed){
            console.info("还未注册");
        }
        this.socket.send(serverPackage.encode());
    }
}


export class socketGroup{
    
    
    maxSize:number;
    memberMap:Map<string,SocketProxy>;

    constructor(size:number){
        this.maxSize = size;
        this.memberMap = new Map();
    }

    isFull():boolean{
        return this.memberMap.size>=this.maxSize
    }

    join(gameId:string,ws:SocketProxy){
        if(this.maxSize>=this.memberMap.size){
            return;
        }
        this.memberMap.set(gameId,ws);
    }

    level(gameId:string){
        this.memberMap.delete(gameId)
    }

    bordcast(_package: ServerPackage) {
        this.memberMap.forEach((v,k)=>{
            v.sendMessage(_package);
        })
    }

    getPorxy(key: string):SocketProxy{
       return this.memberMap.get(key);
    }

    getMembersKey():string[]{
        let keys:string[] = [];

        for (const key of this.memberMap.keys()) {
            keys.push(key);
        }
        return keys;
    }
}

export class ServerPackage{
    code:number;
    data:any;
    decode(string){
        let data =  JSON.parse(string);
        this.code = data.code;
        this.data = data.data;
    }

    encode():string{
        const packageData = {code:this.code,data:this.data};
        return JSON.stringify(packageData)
    }
}

export class ClientPackage{

    constructor(){
        
    }
    code:number;
    data:any;
    encode():string{
        const packageData = {code:this.code,data:this.data};
        return JSON.stringify(packageData)
    }

    decode(string){
        let data =  JSON.parse(string);
        this.code = data.code;
        this.data = data.data;
    }
}