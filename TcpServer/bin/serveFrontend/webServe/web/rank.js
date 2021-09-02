"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mx_webserve_1 = require("mx-webserve");
const rankRPC_1 = require("../../../rpcs/rankRPC");
let rank = class rank {
    /**
    * 获取排行榜
    * @date 2021-07-26
    * @group rank - 获取排行榜
    * @route POST /rank/rank
    * @param {string} gameId.query.required - 配置名称
    * @param {string} start.query.required - 开始
    * @param {string} end.query.required - 结束
    * @returns {{code:number}} 200 - 返回内容
    */
    getRank(param, content_type) {
        let data = {
            gameId: param.gameId,
            start: param.start,
            end: param.end
        };
        return rankRPC_1.rankRPC.inst.getRank(data.gameId, data.start, data.end);
    }
};
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("start", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("end", "number", true)
], rank.prototype, "getRank", null);
rank = __decorate([
    mx_webserve_1.WebRouteModule.class(module)
], rank);
//# sourceMappingURL=rank.js.map