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
const mx_rpc_1 = require("mx-rpc");
const rankModel_1 = require("../rankModel");
let rankServe = class rankServe {
    /**
    * 插入或更新排行榜
    * @route request insterOrUpdateRank
    * @group rank
    * @key gameId
    * @param {string} gameId.query.required - 用户id
    * @param {RankInfo} RankInfo.query.required - 用户token
    * @returns {boolean} 0 - 返回验证成功
    * @throws {{code:number,errMsg:string}} 4 - 返回token错误
    */
    insterOrUpdateRank(gameId, rankInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return rankModel_1.rankModel.insterOrUpdate(gameId, rankInfo);
        });
    }
    /**
    * 插入或更新排行榜
    * @route request getRank
    * @group rank
    * @key gameId
    * @param {string} gameId.query.required - 用户id
    * @param {number} start.query.required - 开始
    * @param {number} end.query.required - 开始
    * @returns {boolean} 0 - 返回验证成功
    * @throws {{code:number,errMsg:string}} 4 - 返回token错误
    */
    getRank(gameId, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            return rankModel_1.rankModel.getRankList(gameId, start, end);
        });
    }
};
__decorate([
    mx_rpc_1.RPCHandle.route()
], rankServe.prototype, "insterOrUpdateRank", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], rankServe.prototype, "getRank", null);
rankServe = __decorate([
    mx_rpc_1.RPCHandle.class("rank", module)
], rankServe);
//# sourceMappingURL=index.js.map