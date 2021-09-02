"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mx_rpc_1 = require("mx-rpc");
const define_1 = require("../../defines/define");
const gameRole_1 = require("../gameRole");
let _ = class _ {
    /**
     * token验证
     * @route request checkToken
     * @group game
     * @key userId
     * @param {string} userId.query.required - 用户id
     * @param {string} token.query.required - 用户token
     * @returns {boolean} 0 - 返回验证成功
     * @throws {{code:number,errMsg:string}} 4 - 返回token错误
     */
    checkToken(userId, token) {
        if (!token) {
            throw { code: define_1.ErrorCode.token_error, errMsg: "认证错误" };
        }
        return true;
    }
    /**
     * 登陆游戏
     * @route request login
     * @group game - 登陆
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} uid.query.required - 数字id
     * @param {string} version.query.required - 版本
     * @param {string} inviterId.query.required - 邀请id
     * @param {string} nickName.query - 昵称
     * @param {string} avatarUrl.query - 头像
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    login(gameId, uid, version, inviterId, nickName = "", avatarUrl = "") {
        return gameRole_1.GameRoleService.login(gameId, uid, version, inviterId, nickName, avatarUrl);
    }
    /**
     * 刷新所有数据
     * @route request refAllInfo
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    refAllInfo(gameId, token) {
        return gameRole_1.GameRoleService.refreshInfo(gameId, token);
    }
    /**
     * 开始关卡
     * @route request startLevel
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @param {number} level.query.required - level
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    startLevel(gameId, token, level) {
        return gameRole_1.GameRoleService.startLevel(gameId, token, level);
    }
    /**
    * 游戏成功
    * @route request levelSuccessed
    * @group game - 游戏
    * @key gameId
    * @param {string} gameId.query.required - 玩家id
    * @param {string} token.query.required - token
    * @param {string} levelId.query.required - 关卡Id
    * @param {string} killNum.query.required - 击杀数量
    * @returns {{code: ErrorCode}} 0 - 返回信息
    */
    levelSuccessed(gameId, token, levelId, killNum) {
        return gameRole_1.GameRoleService.levelSuccessed(gameId, token, levelId, killNum);
    }
    /**
  * 游戏失败
  * @route request levelFailed
  * @group game - 游戏
  * @key gameId
  * @param {string} gameId.query.required - 玩家id
  * @param {string} token.query.required - token
  * @param {string} levelId.query.required - 关卡Id
  * @param {string} killNum.query.required - 击杀数量
  * @returns {{code: ErrorCode}} 0 - 返回信息
  */
    levelFailed(gameId, token, level, killNum) {
        return gameRole_1.GameRoleService.levelFailed(gameId, token, level, killNum);
    }
    /**
       * 累计奖励
       * @route request drawContinueReward
       * @group game - 游戏
       * @key gameId
       * @param {string} gameId.query.required - 玩家id
       * @param {string} token.query.required - token
       * @returns {{code: ErrorCode}} 0 - 返回信息
       */
    drawContinueReward(gameId, token) {
        return gameRole_1.GameRoleService.drawContinueReward(gameId, token);
    }
    /**
      * 累计奖励信息
      * @route request openContinueReward
      * @group game - 游戏
      * @key gameId
      * @param {string} gameId.query.required - 玩家id
      * @param {string} token.query.required - token
      * @returns {{code: ErrorCode}} 0 - 返回信息
      */
    openContinueReward(gameId, token) {
        return gameRole_1.GameRoleService.openContinueReward(gameId, token);
    }
    /**
     * 刷新信息
     * @route request refreshInfo
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    refreshInfo(gameId, token) {
        return gameRole_1.GameRoleService.refreshInfo(gameId, token);
    }
    /**
    * 外刀升级
    * @route request knifeLevelUp
    * @group game - 游戏
    * @key gameId
    * @param {string} gameId.query.required - 玩家id
    * @param {string} token.query.required - token
    * @returns {{code: ErrorCode}} 0 - 返回信息
    */
    knifeLevelUp(gameId, token) {
        return gameRole_1.GameRoleService.knifeLevelUp(gameId, token);
    }
    /**
    * 玩家模型升级
    * @route request playerLevelUp
    * @group game - 游戏
    * @key gameId
    * @param {string} gameId.query.required - 玩家id
    * @param {string} token.query.required - token
    * @param {string} modelId.query.required - 模型id
    * @returns {{code: ErrorCode}} 0 - 返回信息
    */
    playerLevelUp(gameId, token, modelId) {
        return gameRole_1.GameRoleService.playerModelLevel(gameId, token, modelId);
    }
    /**
    * 玩家模型变更
    * @route request changePlayerModel
    * @group game - 游戏
    * @key gameId
    * @param {string} gameId.query.required - 玩家id
    * @param {string} token.query.required - token
    * @param {string} modelId.query.required - 模型id
    * @returns {{code: ErrorCode}} 0 - 返回信息
    */
    changePlayerModel(gameId, token, modelId) {
        return gameRole_1.GameRoleService.changePlayerModel(gameId, token, modelId);
    }
    /**
   * 领取每日奖励
   * @route request drawDailyReward
   * @group game - 游戏
   * @key gameId
   * @param {string} gameId.query.required - 玩家id
   * @param {string} token.query.required - token
   * @returns {{code: ErrorCode}} 0 - 返回信息
   */
    drawDailyReward(gameId, token, modelId) {
        return gameRole_1.GameRoleService.drawDailyReward(gameId, token);
    }
    /**
    * gm命令
    * @route request gmSendItem
    * @group game - 游戏
    * @key gameId
    * @param {string} gameId.query.required - 玩家id
    * @param {string} token.query.required - token
    * @param {number} itemId.query.required - 道具ID
    * @param {string} num.query.required - 数量
    * @param {string} param1.query.required - 参数1
    * @param {string} param2.query.required - 参数2
    * @returns {{code: ErrorCode}} 0 - 返回信息
    */
    gmSendItem(gameId, token, itemId, num, param1, param2) {
        return gameRole_1.GameRoleService.gmSendItem(gameId, token, itemId, num, param1, param2);
    }
    /**
     * 已获得红包列表
     * @route request redPacketList
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    redPacketList(gameId, token) {
        //return GameRoleService.redPacketList(gameId, token);
    }
    // /**
    //  * 关卡红包信息
    //  * @route request levelRedPacketInfo
    //  * @group game - 游戏
    //  * @key gameId
    //  * @param {string} gameId.query.required - 玩家id
    //  * @param {string} token.query.required - token
    //  * @param {string} levelId.query.required - levelId
    //  * @returns {{code: ErrorCode}} 0 - 返回信息
    //  */
    //  @RPCHandle.route()
    //  levelRedPacketInfo(gameId: string, token: string, levelId: string){
    //      return GameRoleService.levelRedPacketInfo(gameId, token, levelId);
    //  }
    /**
     * 获得红包
     * @route request getRedPacket
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @param {string} levelId.query.required -
     * @param {string} redPacketId.query.required -
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    getRedPacket(gameId, token, levelId, redPacketId) {
        //return GameRoleService.getRedPacket(gameId, token, levelId, redPacketId);
    }
    /**
     * 获取关卡
     * @route request levelData
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @param {string} levelId.query.required - 一次发送关卡数量
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    levelData(gameId, token, levelId) {
        //return GameRoleService.levelData(gameId, token, levelId);
    }
    /**
     * test
     * @route request allInfoTest
     * @group game - 游戏
     * @key gameId
     * @param {string} gameId.query.required - 玩家id
     * @param {string} token.query.required - token
     * @returns {{code: ErrorCode}} 0 - 返回信息
     */
    allInfoTest(gameId, token) {
        return gameRole_1.GameRoleService.allInfoTest(gameId, token);
    }
};
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "checkToken", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "login", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "refAllInfo", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "startLevel", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "levelSuccessed", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "levelFailed", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "drawContinueReward", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "openContinueReward", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "refreshInfo", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "knifeLevelUp", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "playerLevelUp", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "changePlayerModel", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "drawDailyReward", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "gmSendItem", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "redPacketList", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "getRedPacket", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "levelData", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], _.prototype, "allInfoTest", null);
_ = __decorate([
    mx_rpc_1.RPCHandle.class("game", module)
], _);
//# sourceMappingURL=index.js.map