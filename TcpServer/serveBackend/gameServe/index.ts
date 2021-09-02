import { RPCHandle } from "mx-rpc";
import { ErrorCode } from "../../defines/define";
import { GameRoleService } from "../gameRole";

@RPCHandle.class("game", module)
class _ {
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
    @RPCHandle.route()
    checkToken(userId: string, token: string) {
        if (!token) {
            throw { code: ErrorCode.token_error, errMsg: "认证错误" }
        }
        return true
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
    @RPCHandle.route()
    login(gameId: string, uid: string, version: string, inviterId: string, nickName: string = "", avatarUrl: string = "") {
        return GameRoleService.login(gameId, uid, version, inviterId, nickName, avatarUrl)
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
     @RPCHandle.route()
     refAllInfo(gameId:string, token:string){
         return GameRoleService.refreshInfo(gameId,token);
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
     @RPCHandle.route()
     startLevel(gameId:string, token:string,level:number){
         return GameRoleService.startLevel(gameId,token,level);
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
      @RPCHandle.route()
      levelSuccessed(gameId:string, token:string, levelId:number,killNum:number){
          return GameRoleService.levelSuccessed(gameId,token, levelId,killNum);
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
    @RPCHandle.route()
    levelFailed(gameId:string, token:string,level:number,killNum:number){
        return GameRoleService.levelFailed(gameId,token,level,killNum);
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
   @RPCHandle.route()
   drawContinueReward(gameId:string, token:string){
       return GameRoleService.drawContinueReward(gameId,token);
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
    @RPCHandle.route()
    openContinueReward(gameId:string, token:string){
        return GameRoleService.openContinueReward(gameId,token);
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
     @RPCHandle.route()
     refreshInfo(gameId: string, token: string){
         return GameRoleService.refreshInfo(gameId, token);
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
     @RPCHandle.route()
     knifeLevelUp(gameId: string, token: string){
         return GameRoleService.knifeLevelUp(gameId, token);
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
     @RPCHandle.route()
     playerLevelUp(gameId: string, token: string,modelId:string){
         return GameRoleService.playerModelLevel(gameId, token,modelId);
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
      @RPCHandle.route()
      changePlayerModel(gameId: string, token: string,modelId:string){
          return GameRoleService.changePlayerModel(gameId, token,modelId);
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
       @RPCHandle.route()
       drawDailyReward(gameId: string, token: string,modelId:string){
           return GameRoleService.drawDailyReward(gameId, token);
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
      @RPCHandle.route()
      gmSendItem(gameId: string, token: string,itemId:number,num:number,param1:string,param2:string){
          return GameRoleService.gmSendItem(gameId, token,itemId,num,param1,param2);
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
    @RPCHandle.route()
    redPacketList(gameId: string, token: string){
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
    @RPCHandle.route()
    getRedPacket(gameId: string, token: string, levelId: number, redPacketId: string){
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
    @RPCHandle.route()
    levelData(gameId: string, token: string, levelId: string ){
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
    @RPCHandle.route()
    allInfoTest(gameId: string, token: string){
        return GameRoleService.allInfoTest(gameId, token);
    }
  
    

}