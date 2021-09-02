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
const wsSocket_1 = require("../wsSocket");
class player {
    regist(parems) {
        return __awaiter(this, void 0, void 0, function* () {
            let resData = { message: "注册成功", uuid: parems.uuid };
            let _package = new wsSocket_1.ServerPackage();
            _package.code = cede_1.ResponseCode.regiset;
            _package.data = resData;
            return _package;
        });
    }
}
__decorate([
    SocketRouteModule_1.SocketRouteModule.route(cede_1.RequestCode.regiset)
], player.prototype, "regist", null);
//# sourceMappingURL=player.js.map