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
exports.webServeRPC = void 0;
const nodesocket_1 = require("./nodesocket");
class localwebServeRPC extends nodesocket_1.RequestRPC {
    /**
     *
    检查资源更新
    
     */
    reloadTables() {
        let query = {};
        let body = {};
        return this.request("broadcastme", "reloadTables", Object.assign(query, body), "".split(","), "");
    }
}
class webServeRPC {
    static rpc_init(srv, ns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._inst)
                this._inst = new localwebServeRPC("webServe", srv, "", "", ns);
            return true;
        });
    }
    static get inst() {
        if (!this._inst)
            throw ("need call rpc_init first webServe");
        return this._inst;
    }
}
exports.webServeRPC = webServeRPC;
//# sourceMappingURL=webServeRPC.js.map