"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankUnit = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const Time_1 = require("mx-logger/lib/Time");
class RankUnit {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    static setRoleCache(gameId, rankUnit) {
        this.rankUnitCache.set(gameId, rankUnit);
    }
    static getRankUnit(gameId) {
        let cache = this.rankUnitCache.get(gameId);
        if (!cache) {
            return null;
        }
        // 重设ttl
        this.rankUnitCache.ttl(gameId, this.stdTTL);
        return cache;
    }
    get nickName() {
        return this.dbInfo.get("nickName") || "";
    }
    set nickName(v) {
        this.dbInfo.set("nickName", v);
    }
    get score() {
        return this.dbInfo.get("score") || 0;
    }
    set score(v) {
        this.dbInfo.set("score", v);
    }
    get exScore() {
        return this.dbInfo.get("exScore") || 0;
    }
    set exScore(v) {
        this.dbInfo.set("exScore", v);
    }
    get updateTime() {
        return this.dbInfo.get("updateTime") || Time_1.LocalDate.now();
    }
    set updateTime(v) {
        this.dbInfo.set("updateTime", v);
    }
    static createRankUnit(gameId, dbInfo) {
        let rankUnit = new RankUnit();
        rankUnit.dbInfo = dbInfo;
        rankUnit.gameId = gameId;
        return rankUnit;
    }
}
exports.RankUnit = RankUnit;
RankUnit.stdTTL = 15 * 60;
RankUnit.rankUnitCache = new node_cache_1.default({ stdTTL: RankUnit.stdTTL, checkperiod: 120, useClones: false });
//# sourceMappingURL=rankUnit.js.map