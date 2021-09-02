"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const cede_1 = require("../cede");
const SocketRouteModule_1 = require("../route/SocketRouteModule");
const RomeServer_1 = require("../Server/RomeServer");
const wsSocket_1 = require("../wsSocket");
class Rome {
    createRome(parems) {
        return __awaiter(this, void 0, void 0, function* () {
            let _roomId = RomeServer_1.roomServer.createRoom();
            let resData = { id: _roomId };
            let _package = new wsSocket_1.ServerPackage();
            _package.code = cede_1.ResponseCode.createRome;
            _package.data = resData;
            return _package;
        });
    }
    joinRome(parems) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = parems.memberInfo;
            let id = parems.id;
            RomeServer_1.roomServer.joinRoom(id, info.uuid, info);
        });
    }
}
__decorate([
    SocketRouteModule_1.SocketRouteModule.route(cede_1.RequestCode.createRome)
], Rome.prototype, "createRome", null);
__decorate([
    SocketRouteModule_1.SocketRouteModule.route(cede_1.RequestCode.joinRome)
], Rome.prototype, "joinRome", null);
//# sourceMappingURL=Rome.js.map