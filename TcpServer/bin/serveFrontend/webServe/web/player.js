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
const mx_webserve_1 = require("mx-webserve");
const define_1 = require("../../../defines/define");
const gameRPC_1 = require("../../../rpcs/gameRPC");
const mx_tool_1 = require("mx-tool");
let player = class player {
    /**
     * 登录接口
     * @date 2021-7-26
     * @group player - 登录相关
     * @route POST /player/login
     * @param {string} gameId.query.required - 登录信息
     * @returns {{code:number}} 200 - 返回内容
     */
    login(param, content_type) {
        let data = {
            gameId: param.gameId,
            uid: "",
            unionid: "",
            version: "",
            inviterId: param.inviterId || "",
            nickName: param.user_nick || param.mix_nick,
            avatarUrl: param.avatarUrl || "",
            app_key: param.app_key || "",
            env: param.env || "",
            mini_app_id: param.mini_app_id || "",
            source_app_id: param.source_app_id || "",
            access_token: param.access_token || "",
            sign: param.sign || "",
        };
        return gameRPC_1.gameRPC.inst.login(data.gameId, data.uid, data.version, data.inviterId, data.nickName, data.avatarUrl);
    }
    /**
    * 刷新所有数据
    * @date 2021-07-26
    * @group player - 刷新所有数据
    * @route POST /player/refAllInfo
    * @param {string} gameId.query.required - 登录信息
    * @param {string} token.query.required - 登录信息
    * @param {string} level.query.required - 开始的关卡
    * @returns {{code:number}} 200 - 返回内容
    */
    refAllInfo(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
        };
        return gameRPC_1.gameRPC.inst.refreshInfo(data.gameId, data.token);
    }
    /**
    * 开始关卡
    * @date 2021-07-26
    * @group player - 开始关卡
    * @route POST /player/startLevel
    * @param {string} gameId.query.required - 登录信息
    * @param {string} token.query.required - 登录信息
    * @param {string} level.query.required - 开始的关卡
    * @returns {{code:number}} 200 - 返回内容
    */
    startLevel(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
            level: param.level
        };
        return gameRPC_1.gameRPC.inst.startLevel(data.gameId, data.token, data.level);
    }
    /**
   * 关卡成功
   * @date 2021-07-26
   * @group player - 关卡成功
   * @route POST /player/levelSuccessed
   * @param {string} gameId.query.required - 登录信息
   * @param {string} token.query.required - 登录信息
   * @param {string} level.query.required - 开始的关卡
   * @param {string} killNum.query.required - 击杀数
   * @returns {{code:number}} 200 - 返回内容
   */
    levelSuccessed(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
            level: param.level,
            killNum: param.killNum
        };
        return gameRPC_1.gameRPC.inst.levelSuccessed(data.gameId, data.token, data.level, data.killNum);
    }
    /**
     * 关卡失败
     * @date 2021-07-26
     * @group player - 关卡失败
     * @route POST /player/levelFailed
     * @param {string} gameId.query.required - 登录信息
     * @param {string} token.query.required - 登录信息
     * @param {string} level.query.required - 开始的关卡
     * @param {string} killNum.query.required - 击杀数
     * @returns {{code:number}} 200 - 返回内容
     */
    levelFailed(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
            level: param.level,
            killNum: param.killNum
        };
        return gameRPC_1.gameRPC.inst.levelFailed(data.gameId, data.token, data.level, data.killNum);
    }
    /**
 * 领取挂机奖励
 * @date 2021-07-26
 * @group player - 领取挂机奖励
 * @route POST /player/drawContinueReward
 * @param {string} gameId.query.required - 登录信息
 * @param {string} token.query.required - 登录信息
 * @returns {{code:number}} 200 - 返回内容
 */
    drawContinueReward(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
        };
        return gameRPC_1.gameRPC.inst.drawContinueReward(data.gameId, data.token);
    }
    /**
     * 开启每日奖励
     * @date 2021-07-26
     * @group player - 开启挂机奖励
     * @route POST /player/openContinueReward
     * @param {string} gameId.query.required - 登录信息
     * @param {string} token.query.required - 登录信息
     * @returns {{code:number}} 200 - 返回内容
     */
    openContinueReward(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
        };
        return gameRPC_1.gameRPC.inst.openContinueReward(data.gameId, data.token);
    }
    /**
 * 飞刀升级
 * @date 2021-07-26
 * @group player - 飞刀升级
 * @route POST /player/knifeLevelUp
 * @param {string} gameId.query.required - 登录信息
 * @param {string} token.query.required - 登录信息
 * @returns {{code:number}} 200 - 返回内容
 */
    knifeLevelUp(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
        };
        return gameRPC_1.gameRPC.inst.knifeLevelUp(data.gameId, data.token);
    }
    /**
     * 玩家模型升级
     * @date 2021-07-26
     * @group player - 玩家模型升级
     * @route POST /player/playerModelLevelUp
     * @param {string} gameId.query.required - 登录信息
     * @param {string} token.query.required - 登录信息
     * @param {string} modelId.query.required - 模型Id
     * @returns {{code:number}} 200 - 返回内容
     */
    playerModelLevelUp(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
            modelId: param.modelId,
        };
        return gameRPC_1.gameRPC.inst.playerLevelUp(data.gameId, data.token, data.modelId);
    }
    /**
    * 玩家模型变更
    * @date 2021-07-26
    * @group player - 玩家模型变更
    * @route POST /player/playerModelChange
    * @param {string} gameId.query.required - 登录信息
    * @param {string} token.query.required - 登录信息
    * @param {string} modelId.query.required - 模型ID
    * @returns {{code:number}} 200 - 返回内容
    */
    playerModelChange(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
            modelId: param.modelId,
        };
        return gameRPC_1.gameRPC.inst.changePlayerModel(data.gameId, data.token, data.modelId);
    }
    /**
 * 领取每日奖励
 * @date 2021-07-26
 * @group player - 领取每日奖励
 * @route POST /player/drawDailyReward
 * @param {string} gameId.query.required - 登录信息
 * @param {string} token.query.required - 登录信息
 * @returns {{code:number}} 200 - 返回内容
 */
    drawDailyReward(param, content_type) {
        let data = {
            gameId: param.gameId,
            token: param.token,
        };
        return gameRPC_1.gameRPC.inst.drawDailyReward(data.gameId, data.token);
    }
    /**
    * GM设置
    * @date 2021-07-26
    * @group player - 发送道具
    * @route POST /player/gmSendItem
    * @param {string} gameId.query.required - 登录信息
    * @param {string} token.query.required - 登录信息
    * @param {string} secret.query.required - 密钥
    * @param {number} itemID.query.required - 道具id  1金币 2体力 3关卡数
    * @param {number} num.query.required - 数量    1数量 2数量 3关卡数
    * @param {string} param1.query.required - 额外参数
    * @param {string} param2.query.required - 额外参数
    * @returns {{code:number}} 200 - 返回内容
    */
    gmSendItem(param, content_type) {
        let secret = "2451asdqwefs#";
        let gm = mx_tool_1.ConfigMgr.get("gm");
        if (!gm) {
            return { code: define_1.ErrorCode.param_error, errMsg: "param_error!" };
        }
        if (secret != param.secret) {
            // return { code: ErrorCode.param_error, errMsg: "param_error!" }
        }
        let data = {
            gameId: param.gameId,
            token: param.token,
            itemId: param.itemId,
            num: param.num,
            param1: param.param1,
            param2: param.param2,
        };
        return gameRPC_1.gameRPC.inst.gmSendItem(data.gameId, data.token, data.itemId, data.num, data.param1, data.param2);
    }
};
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true)
], player.prototype, "login", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
], player.prototype, "refAllInfo", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("level", "number", true)
], player.prototype, "startLevel", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("level", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("killNum", "number", true)
], player.prototype, "levelSuccessed", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("level", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("killNum", "number", true)
], player.prototype, "levelFailed", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
], player.prototype, "drawContinueReward", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
], player.prototype, "openContinueReward", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
], player.prototype, "knifeLevelUp", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("modelId", "string", true)
], player.prototype, "playerModelLevelUp", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("modelId", "string", true)
], player.prototype, "playerModelChange", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
], player.prototype, "drawDailyReward", null);
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("gameId", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("token", "string", true)
    //@WebRouteModule.paramRequired("secret", "string", true)
    ,
    mx_webserve_1.WebRouteModule.paramRequired("itemId", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("num", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("param1", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("param2", "string", true)
], player.prototype, "gmSendItem", null);
player = __decorate([
    mx_webserve_1.WebRouteModule.class(module)
], player);
let RoundTest = class RoundTest {
    befor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
        });
    }
};
__decorate([
    mx_webserve_1.WebRouteModule.after()
], RoundTest.prototype, "befor", null);
RoundTest = __decorate([
    mx_webserve_1.WebRouteModule.class("/Test")
], RoundTest);
//# sourceMappingURL=player.js.map