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
exports.gameRPC = void 0;
const nodesocket_1 = require("./nodesocket");
class localgameRPC extends nodesocket_1.RequestRPC {
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
    /**
     *
    登陆游戏
     * @param {string} gameId 玩家id
     * @param {string} uid 数字id
     * @param {string} version 版本
     * @param {string} inviterId 邀请id
     * @param {string} nickName 昵称
     * @param {string} avatarUrl 头像
     */
    login(gameId, uid, version, inviterId, nickName, avatarUrl) {
        let query = {
            gameId: gameId,
            uid: uid,
            version: version,
            inviterId: inviterId,
            nickName: nickName,
            avatarUrl: avatarUrl
        };
        let body = {};
        return this.request("request", "login", Object.assign(query, body), "gameId,uid,version,inviterId,nickName,avatarUrl".split(","), "gameId");
    }
    /**
     *
    刷新所有数据
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    refAllInfo(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "refAllInfo", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    开始关卡
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {number} level level
     */
    startLevel(gameId, token, level) {
        let query = {
            gameId: gameId,
            token: token,
            level: level
        };
        let body = {};
        return this.request("request", "startLevel", Object.assign(query, body), "gameId,token,level".split(","), "gameId");
    }
    /**
     *
    游戏成功
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} levelId 关卡Id
     * @param {string} killNum 击杀数量
     */
    levelSuccessed(gameId, token, levelId, killNum) {
        let query = {
            gameId: gameId,
            token: token,
            levelId: levelId,
            killNum: killNum
        };
        let body = {};
        return this.request("request", "levelSuccessed", Object.assign(query, body), "gameId,token,levelId,killNum".split(","), "gameId");
    }
    /**
     *
    游戏失败
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} levelId 关卡Id
     * @param {string} killNum 击杀数量
     */
    levelFailed(gameId, token, levelId, killNum) {
        let query = {
            gameId: gameId,
            token: token,
            levelId: levelId,
            killNum: killNum
        };
        let body = {};
        return this.request("request", "levelFailed", Object.assign(query, body), "gameId,token,levelId,killNum".split(","), "gameId");
    }
    /**
     *
    累计奖励
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    drawContinueReward(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "drawContinueReward", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    累计奖励信息
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    openContinueReward(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "openContinueReward", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    刷新信息
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    refreshInfo(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "refreshInfo", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    外刀升级
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    knifeLevelUp(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "knifeLevelUp", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    玩家模型升级
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} modelId 模型id
     */
    playerLevelUp(gameId, token, modelId) {
        let query = {
            gameId: gameId,
            token: token,
            modelId: modelId
        };
        let body = {};
        return this.request("request", "playerLevelUp", Object.assign(query, body), "gameId,token,modelId".split(","), "gameId");
    }
    /**
     *
    玩家模型变更
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} modelId 模型id
     */
    changePlayerModel(gameId, token, modelId) {
        let query = {
            gameId: gameId,
            token: token,
            modelId: modelId
        };
        let body = {};
        return this.request("request", "changePlayerModel", Object.assign(query, body), "gameId,token,modelId".split(","), "gameId");
    }
    /**
     *
    领取每日奖励
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    drawDailyReward(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "drawDailyReward", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    gm命令
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {number} itemId 道具ID
     * @param {string} num 数量
     * @param {string} param1 参数1
     * @param {string} param2 参数2
     */
    gmSendItem(gameId, token, itemId, num, param1, param2) {
        let query = {
            gameId: gameId,
            token: token,
            itemId: itemId,
            num: num,
            param1: param1,
            param2: param2
        };
        let body = {};
        return this.request("request", "gmSendItem", Object.assign(query, body), "gameId,token,itemId,num,param1,param2".split(","), "gameId");
    }
    /**
     *
    已获得红包列表
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    redPacketList(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "redPacketList", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
    /**
     *
    获得红包
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} levelId -
     * @param {string} redPacketId -
     */
    getRedPacket(gameId, token, levelId, redPacketId) {
        let query = {
            gameId: gameId,
            token: token,
            levelId: levelId,
            redPacketId: redPacketId
        };
        let body = {};
        return this.request("request", "getRedPacket", Object.assign(query, body), "gameId,token,levelId,redPacketId".split(","), "gameId");
    }
    /**
     *
    获取关卡
     * @param {string} gameId 玩家id
     * @param {string} token token
     * @param {string} levelId 一次发送关卡数量
     */
    levelData(gameId, token, levelId) {
        let query = {
            gameId: gameId,
            token: token,
            levelId: levelId
        };
        let body = {};
        return this.request("request", "levelData", Object.assign(query, body), "gameId,token,levelId".split(","), "gameId");
    }
    /**
     *
    test
     * @param {string} gameId 玩家id
     * @param {string} token token
     */
    allInfoTest(gameId, token) {
        let query = {
            gameId: gameId,
            token: token
        };
        let body = {};
        return this.request("request", "allInfoTest", Object.assign(query, body), "gameId,token".split(","), "gameId");
    }
}
class gameRPC {
    static rpc_init(srv, ns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._inst)
                this._inst = new localgameRPC("game", srv, "", "", ns);
            return true;
        });
    }
    static get inst() {
        if (!this._inst)
            throw ("need call rpc_init first game");
        return this._inst;
    }
}
exports.gameRPC = gameRPC;
//# sourceMappingURL=gameRPC.js.map