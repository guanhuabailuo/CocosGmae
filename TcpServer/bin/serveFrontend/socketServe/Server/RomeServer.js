"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomServer = void 0;
const __1 = require("..");
const cede_1 = require("../cede");
const wsSocket_1 = require("../wsSocket");
class RoomServer {
    constructor() {
        this._roomId = 0;
        this.roomMap = new Map();
    }
    createRoom() {
        let id = this._roomId++;
        let room = new Room(id);
        this.roomMap.set(id, room);
        return id;
    }
    joinRoom(id, key, data) {
        let porxy = __1.ws.getPorxy(key);
        let room = this.roomMap.get(id);
        room.join(porxy, data);
    }
}
class Room {
    constructor(id) {
        this.id = id;
        this.socketGoup = new wsSocket_1.socketGroup(2);
        this.infoMap = new Map();
    }
    start() {
        this.messageList.push(new Array());
        this.messageList.push(new Array());
        this.messageList.push(new Array());
    }
    tick() {
        let allData = this.messageList.pop();
        let _package = new wsSocket_1.ServerPackage();
        _package.code = cede_1.ResponseCode.RomeTick;
        _package.data = allData;
        this.messageList.push(new Array());
        this.socketGoup.bordcast(_package);
    }
    addMessage(data) {
        let rtt = data.rtt;
        data.rtt = undefined;
        if (rtt <= 50) {
            this.messageList[2].push(data);
        }
        if (rtt > 50 && rtt < 100) {
            this.messageList[1].push(data);
        }
        if (rtt > 100) {
            this.messageList[0].push(data);
        }
    }
    join(porxy, info) {
        this.socketGoup.join(porxy.remoteAddr, porxy);
        this.infoMap.set(porxy.remoteAddr, info);
        let data = { members: this.getMembers() };
        let _package = new wsSocket_1.ServerPackage();
        _package.code = cede_1.ResponseCode.room_member_bordcast;
        _package.data = data;
        this.socketGoup.bordcast(_package);
    }
    getMembers() {
        let members = [];
        for (const v of this.infoMap.values()) {
            members.push(v);
        }
        return members;
    }
}
exports.roomServer = new RoomServer();
//# sourceMappingURL=RomeServer.js.map