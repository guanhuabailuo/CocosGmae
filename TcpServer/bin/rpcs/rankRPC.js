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
exports.rankRPC = void 0;
const nodesocket_1 = require("./nodesocket");
class localrankRPC extends nodesocket_1.RequestRPC {
    /**
     *
    插入或更新排行榜
     * @param {string} gameId 用户id
     * @param {RankInfo} RankInfo 用户token
     */
    insterOrUpdateRank(gameId, RankInfo) {
        let query = {
            gameId: gameId,
            RankInfo: RankInfo
        };
        let body = {};
        return this.request("request", "insterOrUpdateRank", Object.assign(query, body), "gameId,RankInfo".split(","), "gameId");
    }
    /**
     *
    插入或更新排行榜
     * @param {string} gameId 用户id
     * @param {number} start 开始
     * @param {number} end 开始
     */
    getRank(gameId, start, end) {
        let query = {
            gameId: gameId,
            start: start,
            end: end
        };
        let body = {};
        return this.request("request", "getRank", Object.assign(query, body), "gameId,start,end".split(","), "gameId");
    }
}
class rankRPC {
    static rpc_init(srv, ns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._inst)
                this._inst = new localrankRPC("rank", srv, "", "", ns);
            return true;
        });
    }
    static get inst() {
        if (!this._inst)
            throw ("need call rpc_init first rank");
        return this._inst;
    }
}
exports.rankRPC = rankRPC;
//# sourceMappingURL=rankRPC.js.map