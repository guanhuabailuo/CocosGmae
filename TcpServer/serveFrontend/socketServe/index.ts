import { loadModule } from "mx-webserve/src/loadWebFiles";
import { join } from "path";
import { SocketServer } from "./wsSocket";

export var ws:SocketServer;

export const init = async function(){
   let ws:WebSocketServe = new WebSocketServe();
   let path = join(__dirname, "../socketServe/so")
   loadModule(path)
}


class WebSocketServe{
    socket:SocketServer
    constructor(){
        this.socket = new SocketServer()
    }

}