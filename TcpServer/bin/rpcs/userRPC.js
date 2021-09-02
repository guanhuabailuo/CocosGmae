"use strict";
/**
 * this is a auto create file
 * 这是一个自动生成的文件,最好不要直接改动这个文件
 */
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
exports.userRPC = void 0;
const nodesocket_1 = require("./nodesocket");
class localuserRPC extends nodesocket_1.RequestRPC {
    /**
     *
    token验证
     * @param {string} userId 用户id
     * @param {string} token 用户token
     */
    checkToken(userId, token) {
        let query = {
            userId: userId,
            token: token
        };
        let body = {};
        return this.request("request", "checkToken", Object.assign(query, body), "userId,token".split(","), "userId");
    }
}
class userRPC {
    static rpc_init(srv, ns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._inst)
                this._inst = new localuserRPC("user", srv, "", "", ns);
            return true;
        });
    }
    static get inst() {
        if (!this._inst)
            throw ("need call rpc_init first user");
        return this._inst;
    }
}
exports.userRPC = userRPC;
//# sourceMappingURL=userRPC.js.map