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
exports.GameRoleService = void 0;
const define_1 = require("../../defines/define");
const role_1 = require("./role");
const crypto_1 = require("crypto");
const mx_tool_1 = require("mx-tool");
const tables_1 = require("../../lib/tables");
const interface_1 = require("../../defines/interface");
const rankRPC_1 = require("../../rpcs/rankRPC");
class GameRoleService {
    static init() {
        return role_1.UnitRole.init;
    }
    // 登录
    static login(gameId, uid, version = "", inviterId = "", nickName = "", avatarUrl = "") {
        return __awaiter(this, void 0, void 0, function* () {
            nickName = nickName ? nickName : "";
            avatarUrl = avatarUrl ? avatarUrl : "";
            try {
                let data = yield role_1.UnitRole.getRole(gameId);
                let role = data.role;
                role.isFighting = false;
                // 更新头像是昵称
                if (nickName !== "") {
                    role.nickName = nickName;
                }
                if (avatarUrl !== "") {
                    role.avatarUrl = avatarUrl;
                }
                // 更新活动时间数据
                return GameRoleService._loadSucc(gameId, role, version, inviterId);
            }
            catch (e) {
                if (e.code == define_1.ErrorCode.role_no) {
                    let data = yield role_1.UnitRole.registRole(gameId, uid, version, inviterId, nickName, avatarUrl);
                    return GameRoleService._loadSucc(gameId, data.role, version, inviterId);
                }
                else {
                    // 失败的时候
                    throw ({ code: define_1.ErrorCode.login_error, errMsg: e.errMsg || e.message || "" });
                }
            }
        });
    }
    // 玩家登录成功后的消息推送
    static _loadSucc(gameId, role, version, inviterId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 提取出用信息推送
            // 需要设置用户一个token 后续通过token来判断登录状态
            let nowTime = Date.now();
            let token = crypto_1.createHash("md5").update('' + nowTime + gameId).digest("hex");
            role.dbInfo.set('token', token);
            // // 登录前的流程处理
            yield role.beforeLogin(inviterId);
            role.recalcalteStrength();
            role.calculateContinueReward();
            let roleInfo = role.toClient();
            // 登录后流程处理
            this.afterLogin(role);
            try {
                yield role.dbInfo.force_save();
            }
            catch (e) {
                console.error('_loadSucc', e);
                throw { code: define_1.ErrorCode.db_error, errMsg: "db is error" };
            }
            return { code: define_1.ErrorCode.ok, data: roleInfo, token: token, localTime: mx_tool_1.LocalDate.now() };
        });
    }
    static afterLogin(role) {
        role.lastLoginDate = mx_tool_1.LocalDate.now();
    }
    // 获取缓存统计信息
    static getCacheStats(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield role_1.UnitRole.getRole(gameId, token);
            if (!ret) {
                return Promise.reject({ code: define_1.ErrorCode.role_no, errMsg: "role is not found!" });
            }
            let role = ret.role;
            return { code: define_1.ErrorCode.ok, stats: role_1.UnitRole.getCacheStats() };
        });
    }
    static removeRole(gameId) {
        role_1.UnitRole.delRoleCache(gameId);
    }
    //开始关卡
    static startLevel(gameId, token, level) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            if ((role.maxLevel) < level) {
                return { code: define_1.ErrorCode.more_then_player_max_level, errMsg: "more then player max level!" };
            }
            let levelConfig = tables_1.TablesService.getLevelConfig(level.toString());
            if (!levelConfig) {
                return { code: define_1.ErrorCode.levelId_not_exist, errMsg: "levelId_not_exist!" };
            }
            //检验体力是否足够
            role.recalcalteStrength();
            let LevelCostStrength = tables_1.TablesService.getLevelCostStrength();
            if (role.strength < LevelCostStrength) {
                return { code: define_1.ErrorCode.no_enough_strength, errMsg: "role not enoghu strength!" };
            }
            if (role.isFighting == true) {
                return { code: define_1.ErrorCode.is_fighting, errMsg: "role is fighting!" };
            }
            role.strength = role.strength - LevelCostStrength;
            role.currentLevel = level;
            role.isFighting = true;
            return { code: 0, strength: role.strength };
        });
    }
    static levelFailed(gameId, token, levelId, killNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            if (levelId != Number(role.currentLevel)) {
                return { code: define_1.ErrorCode.level_not_match, errMsg: "level_not_match!" };
            }
            if (!role.isFighting) {
                return { code: define_1.ErrorCode.no_start_level, errMsg: "not start level!" };
            }
            //获取关卡
            let levelConfig = tables_1.TablesService.getLevelConfig(levelId.toString());
            if (!levelConfig) {
                return { code: define_1.ErrorCode.levelId_not_exist, errMsg: "levelId is not exist in serve!" };
            }
            if (killNumber > levelConfig.iMonsterNums || killNumber < 0) {
                return { code: define_1.ErrorCode.kill_num_more_then_max, errMsg: "kill_num_error!" };
            }
            let killAddCoin = 0;
            if (killNumber > 0) {
                killAddCoin = levelConfig.iKillReward * killNumber;
                this.sendItem(role, 1, killAddCoin);
            }
            role.isFighting = false;
            return { code: 0, data: { coin: Number(role.coin), addCoin: killAddCoin } };
        });
    }
    static levelSuccessed(gameId, token, levelId, killNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            if (!role.isFighting) {
                return { code: define_1.ErrorCode.no_start_level, errMsg: "not start level!" };
            }
            if (!role.currentLevel) {
                role.currentLevel = 0;
            }
            if (levelId != Number(role.currentLevel)) {
                return { code: define_1.ErrorCode.level_not_match, errMsg: "level_not_match!" };
            }
            //获取关卡
            let level = tables_1.TablesService.getLevelConfig((levelId).toString());
            if (!level) {
                return { code: define_1.ErrorCode.levelId_not_exist, errMsg: "levelId is not exist in serve!" };
            }
            //获取关卡
            let levelConfig = tables_1.TablesService.getLevelConfig(levelId.toString());
            if (!levelConfig) {
                return { code: define_1.ErrorCode.levelId_not_exist, errMsg: "levelId is not exist in serve!" };
            }
            if (killNumber > levelConfig.iMonsterNums || killNumber < 0) {
                return { code: define_1.ErrorCode.kill_num_more_then_max, errMsg: "kill_num_error!" };
            }
            role.calculateContinueReward();
            if (levelId == (Number(role.maxLevel))) {
                let nextlevel = tables_1.TablesService.getLevelConfig((role.maxLevel + 1).toString());
                if (nextlevel) {
                    role.maxLevel = role.maxLevel + 1;
                }
                //解锁模型
                let models = role.playerModels;
                let allModels = tables_1.TablesService.getAllPlayerModelConfig();
                for (const key in allModels) {
                    if (models[key]) {
                        continue;
                    }
                    let oneConfig = allModels[key];
                    if (oneConfig.eLockType == interface_1.SeEnumPlayereLockType.DengJiJieSuo) {
                        continue;
                    }
                    let needLevel = oneConfig.aiLockParam[0];
                    if (needLevel && role.maxLevel >= needLevel) {
                        models[key.toString()] = 1;
                    }
                }
                role.playerModels = models;
                role.calculateContinueReward();
                let rankInfo = { gameId: gameId, score: role.maxLevel, exScore: 0, nickName: role.nickName };
                rankRPC_1.rankRPC.inst.insterOrUpdateRank(gameId, rankInfo);
            }
            role.isFighting = false;
            let addCoin = 0;
            if (killNumber > 0) {
                let killAddCoin = levelConfig.iKillReward * killNumber;
                addCoin += killAddCoin;
                this.sendItem(role, 1, killAddCoin);
            }
            this.sendItem(role, 1, levelConfig.iWinReward);
            addCoin += levelConfig.iWinReward;
            let data = role.toClientOnlevelSuccess();
            data["addCoin"] = addCoin;
            return { code: 0, data: data };
        });
    }
    //刷新主页数据
    static refreshInfo(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            role.isFighting = false;
            role.calculateContinueReward();
            role.recalcalteStrength();
            let toClient = role.toClient();
            return { code: 0, data: toClient };
        });
    }
    static openContinueReward(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            role.calculateContinueReward();
            let data = { playerContinueInfo: role.playerContinueInfo };
            return { code: 0, data: data };
        });
    }
    static drawContinueReward(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            role.calculateContinueReward();
            let continueReward = role.playerContinueInfo;
            let addCoin = continueReward.accumulatedCoin;
            if (addCoin <= 0) {
                return { code: define_1.ErrorCode.no_coin, errMsg: "no_coin!" };
            }
            continueReward.accumulatedTime = 0;
            continueReward.accumulatedCoin = 0;
            continueReward.startTime = mx_tool_1.LocalDate.now();
            continueReward.currentLevel = role.maxLevel;
            if (addCoin > 0) {
                this.sendItem(role, 1, addCoin);
            }
            role.playerContinueInfo = continueReward;
            let data = { coin: role.coin, playerContinueInfo: role.playerContinueInfo, addCoin: addCoin };
            return { code: 0, data: data };
        });
    }
    static knifeLevelUp(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            let knifeLevel = role.knifeGrade;
            let knifeLevelUpConfig = tables_1.TablesService.getKnifeLevelUpCost(knifeLevel);
            let currentKnitfeConfig = tables_1.TablesService.getKnifeConfig(role.knifeId);
            let nextKnifeConfig = tables_1.TablesService.getKnifeConfig((Number(role.knifeId) + 1).toString());
            let maxLevel = tables_1.TablesService.getKnifeMaxLevel();
            if (knifeLevel >= maxLevel) {
                return { code: define_1.ErrorCode.knife_level_max, errMsg: "knife_level_max" };
            }
            if (!knifeLevelUpConfig) {
                return { code: define_1.ErrorCode.knife_level_up_config_not_exist, errMsg: "knife_level_up_config_not_exist" };
            }
            let coin = role.coin;
            if (coin < knifeLevelUpConfig.ICost) {
                return { code: define_1.ErrorCode.no_enough_coin, errMsg: "no_enough_coin" };
            }
            this.costItem(role, 1, knifeLevelUpConfig.ICost);
            role.knifeGrade = knifeLevelUpConfig.iLevel;
            role.currentKnifeGrade = role.currentKnifeGrade + 1;
            if (nextKnifeConfig) {
                if (role.knifeGrade >= nextKnifeConfig.iLockLevel) {
                    role.knifeId = nextKnifeConfig.iID.toString();
                    role.currentKnifeGrade = 1;
                }
            }
            return { code: 0, data: role.toKnifeLevelUp() };
        });
    }
    static playerModelLevel(gameId, token, modelId) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            let models = role.playerModels;
            let modelLevel = models[modelId];
            if (!modelLevel) {
                return { code: define_1.ErrorCode.player_model_not_exist, errMsg: "player_model_not_exist!" };
            }
            let playerModelConfig = tables_1.TablesService.getPlayerModelConfig(modelId);
            if (!playerModelConfig) {
                return { code: define_1.ErrorCode.player_model_not_exist, errMsg: "player_model_not_exist!" };
            }
            let playerLevelUpCostConfig = tables_1.TablesService.getPlayerLevelUpCost(modelLevel + 1);
            if (!playerLevelUpCostConfig) {
                return { code: define_1.ErrorCode.player_model_level_up_config_not_exist, errMsg: "player_model_level_up_config_not_exist!" };
            }
            let costCoin = playerLevelUpCostConfig.ICost;
            let currentCoin = role.coin;
            if (costCoin > currentCoin) {
                return { code: define_1.ErrorCode.no_enough_coin, errMsg: "no_enough_coin!" };
            }
            this.costItem(role, 1, costCoin);
            models[modelId] = playerLevelUpCostConfig.iLevel;
            //解锁模型
            let allModels = tables_1.TablesService.getAllPlayerModelConfig();
            for (const key in allModels) {
                if (models[key]) {
                    continue;
                }
                let oneConfig = allModels[key];
                if (oneConfig.eLockType == interface_1.SeEnumPlayereLockType.GuanKaJieSuo) {
                    continue;
                }
                let unlock = true;
                let condition = oneConfig.aiLockCondition;
                for (let i = 0; i < condition.length; i++) {
                    let conditionModelId = condition[i];
                    let conditionModelNeedLevel = oneConfig.aiLockParam[i];
                    let currentConditionModelLevel = models[conditionModelId.toString()];
                    if (currentConditionModelLevel) {
                        if (Number(currentConditionModelLevel) < conditionModelNeedLevel) {
                            unlock = false;
                            break;
                        }
                    }
                    else {
                        unlock = false;
                        break;
                    }
                }
                if (unlock) {
                    models[key.toString()] = 1;
                }
            }
            role.playerModels = models;
            let data = role.toPlayerModelLevelUp();
            data["currentModelLevel"] = role.playerModels[modelId];
            return { code: 0, data: data };
        });
    }
    static drawDailyReward(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            let dailyInfo = role.playerDailyInfo;
            let day = dailyInfo.day;
            let draw = dailyInfo.draw;
            if (draw) {
                return { code: define_1.ErrorCode.have_been_awarded, errMsg: "have_been_awarded!" };
            }
            let config = tables_1.TablesService.getDailyConfig(day);
            if (!config) {
                return { code: define_1.ErrorCode.reward_not_exist, errMsg: "reward_not_exist!" };
            }
            dailyInfo.draw = true;
            role.playerDailyInfo = dailyInfo;
            let itemArray = [];
            itemArray.push(config.aiReward1);
            itemArray.push(config.aiReward2);
            this.sendItemArray(role, itemArray);
            let data = role.toDrawDailyReward();
            return { code: define_1.ErrorCode.ok, data: data };
        });
    }
    static gmSendItem(gameId, token, itemId, num, parma1, parma2) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            if (itemId == 1 || itemId == 2 || itemId == 3) {
                this.sendItem(role, itemId, num);
            }
            else {
                let models = role.playerModels;
                models[parma1] = models[Number(parma2)];
                role.playerModels = models;
            }
            return { code: 0, data: role.toClient() };
        });
    }
    static changePlayerModel(gameId, token, modelId) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            let models = role.playerModels;
            if (!models[modelId]) {
                return { code: define_1.ErrorCode.player_model_not_exist, errMsg: "player_model_not_exist!" };
            }
            role.playerModelId = modelId;
            return { code: 0, data: role.toPlayerModelLevelUp() };
        });
    }
    static sendItemArray(role, array) {
        array.forEach((item) => {
            let itemId = item[0];
            let itemConfig = tables_1.TablesService.getItemConfig(itemId + "");
            let num = item[1];
            if (itemConfig) {
                let type = itemConfig.eType;
                if (type == interface_1.SeEnumItemeType.JinBi) {
                    this.sendItem(role, 1, num);
                }
                if (type == interface_1.SeEnumItemeType.TiLi) {
                    this.sendItem(role, 2, num);
                }
            }
        });
    }
    static sendItem(role, itemId, num) {
        if (itemId == 1) {
            role.coin = role.coin + num;
        }
        if (itemId == 2) {
            role.strength = role.strength + num;
        }
        if (itemId == 3) {
            role.maxLevel = num;
        }
    }
    static costItem(role, itemId, num) {
        if (itemId == 1) {
            role.coin = Math.max(0, role.coin - num);
        }
    }
    //发放装备 目前（金币和体力）
    // private static async propIssuance(gameId: string, token: string, itemId: string, num: number){
    //     let roleResult = await UnitRole.getRole(gameId, token);
    //     if (!roleResult) {
    //         return { code: ErrorCode.role_no, errMsg: "role is not found!" }
    //     }
    //     let role = roleResult.role;
    //     //获取item
    //     let item = TablesService.findItemResData(itemId);
    //     if(!item ){
    //         return { code: ErrorCode.item_not_exist, errMsg: "levelId is not exist in serve!" }
    //     }
    //     switch(item.iId){
    //         case 1:
    //         case 3: 
    //             role.coin += num;
    //             break;
    //         case 2:
    //         case 4:
    //             role.strength += num;
    //             break;
    //         default:
    //             return { code: ErrorCode.item_not_exist, errMsg: "no this item"};
    //     }
    // }
    static allInfoTest(gameId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleResult = yield role_1.UnitRole.getRole(gameId, token);
            if (!roleResult) {
                return { code: define_1.ErrorCode.role_no, errMsg: "role is not found!" };
            }
            let role = roleResult.role;
            let infos = role.allInfoTest();
            return { code: 0, allInfo: infos };
        });
    }
}
exports.GameRoleService = GameRoleService;
//# sourceMappingURL=index.js.map