"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPackage = exports.ServerPackage = exports.socketGroup = exports.SocketProxy = exports.SocketServer = void 0;
const events_1 = require("events");
const ws = __importStar(require("ws"));
const SocketRouteModule_1 = require("./route/SocketRouteModule");
const cede_1 = require("./cede");
const defaultPort = 17099;
class SocketServer extends events_1.EventEmitter {
    constructor(port) {
        super();
        this.allSocket = new socketGroup(1000);
        let opt = { port: port || defaultPort };
        let server = new ws.Server(opt, () => {
            console.info("ws 开启");
        });
        let that = this;
        server.on("connection", (socket, req) => {
            if (that.allSocket.isFull()) {
                socket.close();
            }
            let remoteAddr = req.connection.remoteAddress;
            let socketProxy = new SocketProxy(socket, remoteAddr, that);
            this.allSocket.join(remoteAddr, socketProxy);
        });
        server.on("err", () => { });
    }
    removePorxy(socketProxy) {
        this.allSocket.level(socketProxy.remoteAddr);
    }
    getPorxy(key) {
        return this.allSocket.getPorxy(key);
    }
}
exports.SocketServer = SocketServer;
class SocketProxy {
    constructor(socket, remoteAddr, socketServer) {
        this.heartBeatTimeOut = 6 * 1000;
        this.heartBeatTimer = null;
        this.registed = false;
        this.socket = socket;
        this.remoteAddr = remoteAddr;
        this.socketServer = socketServer;
        this.heartBeatTimer = setTimeout(() => { this.close(); }, this.heartBeatTimeOut);
        let that = this;
        this.socket.onmessage = (event) => {
            that.onMessage(event);
        };
        this.socket.onclose = () => {
        };
    }
    onclose() {
        this.socketServer.removePorxy(this);
    }
    ping(data) {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this.heartBeatTimer);
            this.heartBeatTimer = setTimeout(() => { this.close(); }, this.heartBeatTimeOut);
            let _package = new ServerPackage();
            _package.code = cede_1.ResponseCode.ping;
            _package.data = { clientTime: data.clientTime };
            this.sendMessage(_package);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this.heartBeatTimer);
            this.socket.close();
        });
    }
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(message);
            let _package = new ClientPackage();
            _package.decode(message.data);
            const code = _package.code;
            const data = _package.data;
            if (code == cede_1.RequestCode.ping) {
                this.ping(data);
                return;
            }
            else if (code == cede_1.RequestCode.regiset) {
                if (this.registed) {
                    this.close();
                    return;
                }
                data.uuid = this.remoteAddr;
                let res = yield SocketRouteModule_1.SocketRouteModule.handler(code, data);
                if (res.code == cede_1.ResponseCode.error) {
                    this.socket.send(JSON.stringify(res));
                    return;
                }
                this.registed = true;
                this.socket.send(JSON.stringify(res));
                return res;
            }
            else {
                let res = yield SocketRouteModule_1.SocketRouteModule.handler(code, data);
                this.socket.send(JSON.stringify(res));
                return;
            }
        });
    }
    sendMessage(serverPackage) {
        if (!this.registed) {
            console.info("还未注册");
        }
        this.socket.send(serverPackage.encode());
    }
}
exports.SocketProxy = SocketProxy;
class socketGroup {
    constructor(size) {
        this.maxSize = size;
        this.memberMap = new Map();
    }
    isFull() {
        return this.memberMap.size >= this.maxSize;
    }
    join(gameId, ws) {
        if (this.maxSize >= this.memberMap.size) {
            return;
        }
        this.memberMap.set(gameId, ws);
    }
    level(gameId) {
        this.memberMap.delete(gameId);
    }
    bordcast(_package) {
        this.memberMap.forEach((v, k) => {
            v.sendMessage(_package);
        });
    }
    getPorxy(key) {
        return this.memberMap.get(key);
    }
    getMembersKey() {
        let keys = [];
        for (const key of this.memberMap.keys()) {
            keys.push(key);
        }
        return keys;
    }
}
exports.socketGroup = socketGroup;
class ServerPackage {
    decode(string) {
        let data = JSON.parse(string);
        this.code = data.code;
        this.data = data.data;
    }
    encode() {
        const packageData = { code: this.code, data: this.data };
        return JSON.stringify(packageData);
    }
}
exports.ServerPackage = ServerPackage;
class ClientPackage {
    constructor() {
    }
    encode() {
        const packageData = { code: this.code, data: this.data };
        return JSON.stringify(packageData);
    }
    decode(string) {
        let data = JSON.parse(string);
        this.code = data.code;
        this.data = data.data;
    }
}
exports.ClientPackage = ClientPackage;
//# sourceMappingURL=wsSocket.js.map