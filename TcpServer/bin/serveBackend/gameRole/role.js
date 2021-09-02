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
exports.UnitRole = void 0;
const mx_database_1 = require("mx-database");
const define_1 = require("../../defines/define");
const node_cache_1 = __importDefault(require("node-cache"));
const mx_tool_1 = require("mx-tool");
const tables_1 = require("../../lib/tables");
class UnitRole {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    static setRoleCache(gameId, role) {
        this.roleCache.set(gameId, role);
    }
    // 获取role缓存
    static getRoleCache(gameId) {
        let cache = this.roleCache.get(gameId);
        if (!cache) {
            return null;
        }
        // 重设ttl
        this.roleCache.ttl(gameId, this.stdTTL);
        return cache;
    }
    // 删除role缓存
    static delRoleCache(gameId) {
        let t_info = UnitRole.getRoleCache(gameId);
        if (!t_info)
            return false;
        this.roleCache.del(gameId);
        return true;
    }
    // 获取缓存统计信息
    static getCacheStats() {
        return this.roleCache.getStats();
    }
    get(key) {
        return this.dbInfo.get(key);
    }
    set(key, value) {
        this.dbInfo.set(key, value);
    }
    /**玩家id 一个玩家id可能对应多个gameId*/
    get uid() {
        return this.dbInfo.get('uid');
    }
    get token() {
        return this.dbInfo.get('token');
    }
    get nickName() {
        return this.dbInfo.get('nickName') || "";
    }
    set nickName(v) {
        this.dbInfo.set('nickName', v || "");
    }
    get avatarUrl() {
        return this.dbInfo.get('avatarUrl') || "";
    }
    get isFighting() {
        return this.dbInfo.get('isFighting') || false;
    }
    set isFighting(v) {
        this.dbInfo.set('isFighting', v);
    }
    set avatarUrl(v) {
        this.dbInfo.set('avatarUrl', v);
    }
    get coin() {
        return this.dbInfo.get('coin') || 0;
    }
    set coin(v) {
        this.dbInfo.set('coin', v);
    }
    get strength() {
        return this.dbInfo.get('strength') || 0;
    }
    set strength(v) {
        this.dbInfo.set('strength', v);
    }
    get updateStrengthTime() {
        return this.dbInfo.get('updateStrengthTime') || mx_tool_1.LocalDate.now();
    }
    set updateStrengthTime(v) {
        this.dbInfo.set('updateStrengthTime', v);
    }
    set maxLevel(v) {
        this.dbInfo.set("maxLevel", v);
    }
    get maxLevel() {
        return this.dbInfo.get("maxLevel");
    }
    set playerModelId(v) {
        this.dbInfo.set("modelId", v);
    }
    get playerModelId() {
        return this.dbInfo.get("modelId");
    }
    set playerModels(v) {
        this.dbInfo.set("models", v);
    }
    get playerModels() {
        return this.dbInfo.get("models");
    }
    set knifeId(v) {
        this.dbInfo.set("knifeId", v);
    }
    get knifeId() {
        return this.dbInfo.get("knifeId");
    }
    set playerGrade(v) {
        this.dbInfo.set("playerGrade", v);
    }
    get playerGrade() {
        return this.dbInfo.get("playerGrade");
    }
    set knifeGrade(v) {
        this.dbInfo.set("knifeGrade", v);
    }
    get knifeGrade() {
        return this.dbInfo.get("knifeGrade");
    }
    set currentKnifeGrade(v) {
        this.dbInfo.set("currentKnifeGrade", v);
    }
    get currentKnifeGrade() {
        return this.dbInfo.get("currentKnifeGrade") || 1;
    }
    set currentLevel(v) {
        this.dbInfo.set("currentLevel", v);
    }
    get currentLevel() {
        return this.dbInfo.get("currentLevel");
    }
    set playerContinueInfo(v) {
        this.dbInfo.set("playerContinueInfo", v);
    }
    get playerContinueInfo() {
        return this.dbInfo.get("playerContinueInfo");
    }
    set playerDailyInfo(v) {
        this.dbInfo.set("playerDailyInfo", v);
    }
    get playerDailyInfo() {
        return this.dbInfo.get("playerDailyInfo") || this.createPlayerDailyInfo();
    }
    set lastLoginDate(v) {
        this.dbInfo.set("lastLoginDate", v);
    }
    get lastLoginDate() {
        return this.dbInfo.get("lastLoginDate") || mx_tool_1.LocalDate.now();
    }
    calculateContinueReward() {
        let now = mx_tool_1.LocalDate.now();
        let currentPlayerContinueInfo = this.playerContinueInfo;
        let preTime = currentPlayerContinueInfo.startTime;
        let currentAccumulatedTime = currentPlayerContinueInfo.accumulatedTime;
        if (currentAccumulatedTime >= tables_1.TablesService.getContinueRewardMax()) {
            return;
        }
        let timeInterval = Math.floor((now - preTime) / 1000);
        let addAccumulatedTime = timeInterval - currentAccumulatedTime;
        if ((addAccumulatedTime + currentAccumulatedTime) > tables_1.TablesService.getContinueRewardMax()) {
            addAccumulatedTime = tables_1.TablesService.getContinueRewardMax() - currentAccumulatedTime;
        }
        let levelConfig = tables_1.TablesService.getLevelConfig(currentPlayerContinueInfo.currentLevel.toString());
        if (levelConfig) {
            let addCoin = Math.floor(addAccumulatedTime / tables_1.TablesService.getContinueRewardTime()) * levelConfig.iContinueReward;
            if (currentPlayerContinueInfo.currentLevel != Number(this.maxLevel)) {
                currentPlayerContinueInfo.currentLevel = this.maxLevel;
            }
            if (addCoin > 0) {
                currentPlayerContinueInfo.accumulatedCoin = currentPlayerContinueInfo.accumulatedCoin + addCoin;
                let addTime = addCoin / levelConfig.iContinueReward * tables_1.TablesService.getContinueRewardTime();
                currentPlayerContinueInfo.accumulatedTime = currentPlayerContinueInfo.accumulatedTime + addTime;
            }
        }
        this.playerContinueInfo = currentPlayerContinueInfo;
    }
    recalcalteStrength() {
        let preTime = this.updateStrengthTime;
        let now = mx_tool_1.LocalDate.now();
        let str = this.strength;
        if (str < tables_1.TablesService.getStrengthRecoverMax()) { //身上体力小于最大体力值,要回复
            let delta = Math.floor(((now - preTime) / 1000 / tables_1.TablesService.getStrengthRecover()));
            if (delta > 0) {
                delta = Math.min(delta, tables_1.TablesService.getStrengthRecoverMax());
                this.strength = str + delta;
                this.updateStrengthTime = now;
            }
        }
        else {
            this.updateStrengthTime = now;
        }
    }
    /**生成发送给客户端的数据 */
    toClient() {
        let loginInfo = {
            gameId: this.dbInfo.get('_id'),
            nickName: this.nickName,
            avatarUrl: this.avatarUrl,
            strength: this.strength,
            playerModelId: this.playerModelId,
            knifeId: this.knifeId,
            playerGrade: this.playerGrade,
            knifeGrade: this.knifeGrade,
            currentKnifeGrade: this.currentKnifeGrade,
            maxLevel: this.maxLevel,
            coin: this.coin,
            updateStrengthTime: this.updateStrengthTime,
            playerModels: this.playerModels,
            playerContinueInfo: this.playerContinueInfo,
            playerDailyInfo: this.playerDailyInfo
        };
        return loginInfo;
    }
    toClientOnlevelSuccess() {
        let data = {
            strength: this.strength,
            maxLevel: this.maxLevel,
            coin: this.coin,
            updateStrengthTime: this.updateStrengthTime,
            playerModels: this.playerModels,
            playerContinueInfo: this.playerContinueInfo
        };
        return data;
    }
    toPlayerModelLevelUp() {
        let data = {
            coin: this.coin,
            playerModelId: this.playerModelId,
            playerGrade: this.playerGrade,
            playerModels: this.playerModels,
            currentModelLevel: this.playerModels[this.playerModelId]
        };
        return data;
    }
    toKnifeLevelUp() {
        let data = {
            coin: this.coin,
            knifeId: this.knifeId,
            playerGrade: this.playerGrade,
            playerModels: this.playerModels,
            knifeGrade: this.knifeGrade,
            currentKnifeGrade: this.currentKnifeGrade
        };
        return data;
    }
    toDrawDailyReward() {
        let data = {
            coin: this.coin,
            strength: this.strength,
            playerDailyInfo: this.playerDailyInfo
        };
        return data;
    }
    // 为了后期分布式服务，这里采用回调模式
    static getRole(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleCache = UnitRole.getRoleCache(gameId);
            if (roleCache) {
                if (token == undefined || roleCache.token == token) {
                    return { code: define_1.ErrorCode.ok, role: roleCache };
                }
                else {
                    throw ({ code: define_1.ErrorCode.role_token_error });
                }
            }
            // 重新下载玩家
            return new Promise(function (resolve, reject) {
                mx_database_1.MongodbMoudle.get_database(define_1.DBDefine.db).get_unit(define_1.DBDefine.col_role, { _id: gameId }).load().then(function (dbInfo) {
                    if (dbInfo.empty) {
                        // 这里需要创角
                        reject({ code: define_1.ErrorCode.role_no });
                    }
                    else {
                        // 这里ok了
                        UnitRole.createLoad(gameId, dbInfo).then(role => {
                            if (token == undefined || role.token == token) {
                                resolve({ code: define_1.ErrorCode.ok, role: UnitRole.getRoleCache(gameId) });
                            }
                            else {
                                reject({ code: define_1.ErrorCode.role_token_error });
                            }
                        }).catch(function () {
                            reject({ code: define_1.ErrorCode.role_token_error });
                        });
                    }
                }).catch(function (res) {
                    // 异常了，这里需要推出
                    // console.log(res);
                    reject({ code: define_1.ErrorCode.db_error, errMsg: res });
                });
            });
        });
    }
    /**创建一个对象 */
    static createLoad(gameId, db) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleCache = UnitRole.getRoleCache(gameId);
            if (roleCache) {
                return roleCache;
            }
            //if (UnitRole.gameIdMap.has(gameId)) return UnitRole.gameIdMap.get(gameId) as UnitRole;
            let role = new UnitRole();
            role.dbInfo = db;
            role.gameId = gameId;
            // 保存到缓存中
            //UnitRole.gameIdMap.set(gameId, role);
            UnitRole.setRoleCache(gameId, role);
            return role;
        });
    }
    /**创建角色流程 */
    static registRole(gameId, uid, version, inviterId, nickName, avatarUrl) {
        let roleCache = UnitRole.getRoleCache(gameId);
        if (roleCache) {
            throw { code: define_1.ErrorCode.role_exist };
        }
        return new Promise(function (resolve, reject) {
            mx_database_1.MongodbMoudle.get_database(define_1.DBDefine.db)
                .update_insert(define_1.DBDefine.col_role, { _id: gameId }, { uid: uid, version: version, updateStrengthTime: mx_tool_1.LocalDate.now(), lastSaveTime: mx_tool_1.LocalDate.now(), beneficiaryId: inviterId, nickName: nickName, avatarUrl: avatarUrl,
            })
                .then(function () {
                UnitRole.getRole(gameId).then((rs) => {
                    // 初始化角色数据
                    UnitRole.initRoleData(gameId);
                    // 保存注册日志
                    // LoggerMoudle.roleRegist(gameId, uid, activityId, inviterId);
                    const sInvite = Object.keys(inviterId).length == 0 ? 2 : 1;
                    //LoggerMoudle.userLoginLog(gameId, "regist", sInvite.toString(), "");
                    resolve(rs);
                }).catch(reject);
            }).catch(reject);
        });
    }
    /**
     * 初始化玩家数据
     * @param gameId
     */
    static initRoleData(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            let role = UnitRole.getRoleCache(gameId);
            if (role) {
                // todo
                role.coin = 0;
                role.strength = tables_1.TablesService.getStrengthRecoverMax();
                role.knifeId = "0";
                role.playerModelId = "0";
                role.maxLevel = 0;
                role.currentLevel = 0;
                role.playerGrade = 1;
                role.knifeGrade = 1;
                role.isFighting = false;
                role.playerContinueInfo = { startTime: mx_tool_1.LocalDate.now(), currentLevel: role.maxLevel, accumulatedCoin: 0, accumulatedTime: 0 };
                role.updateStrengthTime = Date.now();
                role.playerModels = { "0": 1 };
                role.playerDailyInfo = { day: 1, draw: false };
                role.currentKnifeGrade = 1;
            }
        });
    }
    /**
     * 登录事务处理
     *
     * @memberof UnitRole
     */
    beforeLogin(inviterId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 重置每日数据
            yield this.resetDailyData();
            // 保存登录日志
            // LoggerMoudle.roleLogin(this.gameId, this.uid, this.activityId, inviterId);
            const sInvite = Object.keys(inviterId).length == 0 ? 2 : 1;
            //LoggerMoudle.userLoginLog(this.gameId, "login", sInvite.toString(), "");
        });
    }
    // 重置每日数据
    resetDailyData() {
        return __awaiter(this, void 0, void 0, function* () {
            let nowTime = mx_tool_1.LocalDate.now();
            let lastLoginDate = this.lastLoginDate;
            let isSameDay = mx_tool_1.LocalDate.isDaily(nowTime, lastLoginDate);
            if (!isSameDay) {
                this.restDailyReward();
            }
        });
    }
    restDailyReward() {
        let dailyInfo = this.playerDailyInfo;
        if (!dailyInfo) {
            this.createPlayerDailyInfo();
        }
        dailyInfo = this.playerDailyInfo;
        if (dailyInfo.draw) {
            let reward = tables_1.TablesService.getDailyConfig(dailyInfo.day + 1);
            if (reward) {
                dailyInfo.day = dailyInfo.day + 1;
                dailyInfo.draw = false;
                this.playerDailyInfo = dailyInfo;
            }
        }
    }
    createPlayerDailyInfo() {
        this.playerDailyInfo = { day: 1, draw: false };
        return this.playerDailyInfo;
    }
    /**所有信息 测试用 */
    allInfoTest() {
        let preTime = this.updateStrengthTime;
        let now = mx_tool_1.LocalDate.now();
        let str = this.strength;
        if (str < 10) { //身上体力小于10,要回复
            let delta = Math.floor(((now - preTime) / 1000 / 60));
            this.strength = str + delta;
            this.updateStrengthTime = now;
        }
        let infos = {
            gameId: this.dbInfo.get('_id'),
            uid: this.uid,
            nickName: this.nickName,
            avatarUrl: this.avatarUrl,
            coin: this.coin,
            strength: this.strength,
            isFighting: this.isFighting,
        };
        return infos;
    }
}
exports.UnitRole = UnitRole;
/**role缓存数据：必须通过封装函数操作缓存数据 */
UnitRole.stdTTL = 15 * 60;
UnitRole.roleCache = new node_cache_1.default({ stdTTL: UnitRole.stdTTL, checkperiod: 120, useClones: false });
//# sourceMappingURL=role.js.map