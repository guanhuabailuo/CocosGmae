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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankModel = exports.init = void 0;
const mx_database_1 = require("mx-database");
const mx_tool_1 = require("mx-tool");
const define_1 = require("../../defines/define");
const rankUnit_1 = require("./rankUnit");
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        rankModel.init();
    });
};
exports.init = init;
class rankModel {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadAll();
            this.sort();
            console.debug("开始排行榜计时器");
            setInterval(this.sort, 60000);
        });
    }
    static loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn = yield mx_database_1.MongodbMoudle.get_database(define_1.DBDefine.db).get_unit_list(define_1.DBDefine.col_rank, {}).load();
            rtn.data.forEach((dbInfo) => {
                let rankUnit = rankUnit_1.RankUnit.createRankUnit(dbInfo.get("_id"), dbInfo);
                rankModel.rankMap.set(rankUnit.gameId, rankUnit);
                rankModel.rank.push(rankUnit);
            });
        });
    }
    static sort() {
        rankModel.sortObj(rankModel.rank, "score");
    }
    static sortObj(arr, key) {
        key = key || 'id';
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j][key] < arr[j + 1][key]) {
                    let temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }
    static insterOrUpdate(gameId, rankInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let rankUnit = this.rankMap.get(gameId);
            if (rankUnit) {
                rankUnit.nickName = rankInfo.nickName;
                rankUnit.score = rankInfo.score;
                rankUnit.exScore = rankInfo.exScore;
                rankUnit.updateTime = mx_tool_1.LocalDate.now();
                return rankUnit;
            }
            else {
                return new Promise(function (resolve, reject) {
                    mx_database_1.MongodbMoudle.get_database(define_1.DBDefine.db).update_insert(define_1.DBDefine.col_rank, { "_id": gameId }, { "nickName": rankInfo.nickName, "score": rankInfo.score, "exScore": rankInfo.exScore, "updateTime": mx_tool_1.LocalDate.now() })
                        .then(function (dbinfo) {
                        rankModel.loadFramDB(gameId).then(function (rtn) {
                            if (rtn.code == define_1.ErrorCode.ok) {
                                let loadUnit = rtn.rankUnit;
                                rankModel.rankMap.set(gameId, loadUnit);
                                rankModel.rank.push(loadUnit);
                                resolve({ code: define_1.ErrorCode.ok, rankUnit: rankUnit });
                            }
                            else {
                                resolve({ code: define_1.ErrorCode.db_error });
                            }
                        });
                    }).catch(function (res) {
                        reject({ code: define_1.ErrorCode.db_error, errMsg: res });
                    });
                });
            }
        });
    }
    static loadFramDB(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                mx_database_1.MongodbMoudle.get_database(define_1.DBDefine.db).get_unit(define_1.DBDefine.col_rank, { _id: gameId }).load().then(function (dbInfo) {
                    if (dbInfo.empty) {
                        // 这里需要创角
                        resolve({ code: define_1.ErrorCode.rank_not_found });
                    }
                    else {
                        // 这里ok了
                        let rankUnit = rankUnit_1.RankUnit.createRankUnit(gameId, dbInfo);
                        resolve({ code: define_1.ErrorCode.ok, rankUnit: rankUnit });
                    }
                }).catch(function (res) {
                    // 异常了，这里需要推出
                    // console.log(res);
                    reject({ code: define_1.ErrorCode.db_error, errMsg: res });
                });
            });
        });
    }
    static getRankList(gameId, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            let rankStart = start > this.rank.length ? this.rank.length : start;
            let rankEnd = end > this.rank.length ? this.rank.length : end;
            for (let index = rankStart; index < rankEnd; index++) {
                let rankUnit = this.rank[index];
                let rankInfo = { gameId: rankUnit.gameId, score: rankUnit.score, nickName: rankUnit.nickName, exScore: rankUnit.exScore };
                res.push(rankInfo);
            }
            let myRank = this.getRankInfo(gameId);
            let data = { rankList: res, myRank: myRank };
            return { code: define_1.ErrorCode.ok, data: data };
        });
    }
    static getRankInfo(gameId) {
        let rankUnit = this.rankMap.get(gameId);
        if (!rankUnit) {
            return { rank: -1 };
        }
        let index = this.rank.indexOf(rankUnit);
        let rankInfo = { score: rankUnit.score, exScore: rankUnit.exScore, nickName: rankUnit.nickName, gameId: gameId };
        let data = { rank: index, rankinfo: rankInfo };
        return data;
    }
}
exports.rankModel = rankModel;
rankModel.rank = [];
rankModel.rankMap = new Map();
//# sourceMappingURL=index.js.map