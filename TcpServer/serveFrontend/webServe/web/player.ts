import { WebRouteModule } from "mx-webserve";
import {LocalDate } from "mx-tool/src/Time";
type ContentType = "application/json" | string | undefined;
import { ErrorCode } from "../../../defines/define";
import {gameRPC} from "../../../rpcs/gameRPC"
import { ConfigMgr } from "mx-tool";

@WebRouteModule.class(module)
class player{
    /**
     * 登录接口
     * @date 2021-7-26
     * @group player - 登录相关
     * @route POST /player/login
     * @param {string} gameId.query.required - 登录信息
     * @returns {{code:number}} 200 - 返回内容
     */
     @WebRouteModule.route()
     @WebRouteModule.paramRequired("gameId", "string", true)
     login(param: { [key: string]: any }, content_type: ContentType) {
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
         }
 
         return gameRPC.inst.login(
             data.gameId,
             data.uid,
             data.version,
             data.inviterId,
             data.nickName,
             data.avatarUrl,
         );
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
      @WebRouteModule.route()
      @WebRouteModule.paramRequired("gameId", "string", true)
      @WebRouteModule.paramRequired("token", "string", true)
      refAllInfo(param: { [key: string]: any }, content_type: ContentType) {
          let data = {
              gameId: param.gameId,
              token:param.token,
          }
  
          return gameRPC.inst.refreshInfo(
              data.gameId,
              data.token,
          );
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
      @WebRouteModule.route()
      @WebRouteModule.paramRequired("gameId", "string", true)
      @WebRouteModule.paramRequired("token", "string", true)
      @WebRouteModule.paramRequired("level", "number", true)
      startLevel(param: { [key: string]: any }, content_type: ContentType) {
          let data = {
              gameId: param.gameId,
              token:param.token,
              level:param.level
          }
  
          return gameRPC.inst.startLevel(
              data.gameId,
              data.token,
              data.level
          );
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
       @WebRouteModule.route()
       @WebRouteModule.paramRequired("gameId", "string", true)
       @WebRouteModule.paramRequired("token", "string", true)
       @WebRouteModule.paramRequired("level", "number", true)
       @WebRouteModule.paramRequired("killNum", "number", true)
       levelSuccessed(param: { [key: string]: any }, content_type: ContentType) {
           let data = {
               gameId: param.gameId,
               token:param.token,
               level:param.level,
               killNum:param.killNum
           }
   
           return gameRPC.inst.levelSuccessed(
               data.gameId,
               data.token,
               data.level,
               data.killNum
           );
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
        @WebRouteModule.route()
        @WebRouteModule.paramRequired("gameId", "string", true)
        @WebRouteModule.paramRequired("token", "string", true)
        @WebRouteModule.paramRequired("level", "number", true)
        @WebRouteModule.paramRequired("killNum", "number", true)
        levelFailed(param: { [key: string]: any }, content_type: ContentType) {
            let data = {
                gameId: param.gameId,
                token:param.token,
                level:param.level,
                killNum:param.killNum
            }

            return gameRPC.inst.levelFailed(
                data.gameId,
                data.token,
                data.level,
                data.killNum
            );
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
        @WebRouteModule.route()
        @WebRouteModule.paramRequired("gameId", "string", true)
        @WebRouteModule.paramRequired("token", "string", true)
        drawContinueReward(param: { [key: string]: any }, content_type: ContentType) {
            let data = {
                gameId: param.gameId,
                token:param.token,
            }
            return gameRPC.inst.drawContinueReward(
                data.gameId,
                data.token,
            );
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
        @WebRouteModule.route()
        @WebRouteModule.paramRequired("gameId", "string", true)
        @WebRouteModule.paramRequired("token", "string", true)
        openContinueReward(param: { [key: string]: any }, content_type: ContentType) {
            let data = {
                gameId: param.gameId,
                token:param.token,
            }
            return gameRPC.inst.openContinueReward(
                data.gameId,
                data.token,
            );
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
        @WebRouteModule.route()
        @WebRouteModule.paramRequired("gameId", "string", true)
        @WebRouteModule.paramRequired("token", "string", true)
        knifeLevelUp(param: { [key: string]: any }, content_type: ContentType) {
            let data = {
                gameId: param.gameId,
                token:param.token,
            }
            return gameRPC.inst.knifeLevelUp(
                data.gameId,
                data.token,
            );
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
     @WebRouteModule.route()
     @WebRouteModule.paramRequired("gameId", "string", true)
     @WebRouteModule.paramRequired("token", "string", true)
     @WebRouteModule.paramRequired("modelId", "string", true)
     playerModelLevelUp(param: { [key: string]: any }, content_type: ContentType) {
         let data = {
             gameId: param.gameId,
             token:param.token,
             modelId:param.modelId,
         }
         return gameRPC.inst.playerLevelUp(
             data.gameId,
             data.token,
             data.modelId,
         );
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
    @WebRouteModule.route()
    @WebRouteModule.paramRequired("gameId", "string", true)
    @WebRouteModule.paramRequired("token", "string", true)
    @WebRouteModule.paramRequired("modelId", "string", true)
    playerModelChange(param: { [key: string]: any }, content_type: ContentType) {
        let data = {
            gameId: param.gameId,
            token:param.token,
            modelId:param.modelId,
        }
        return gameRPC.inst.changePlayerModel(
            data.gameId,
            data.token,
            data.modelId,
        );
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
    @WebRouteModule.route()
    @WebRouteModule.paramRequired("gameId", "string", true)
    @WebRouteModule.paramRequired("token", "string", true)
    drawDailyReward(param: { [key: string]: any }, content_type: ContentType) {
        let data = {
            gameId: param.gameId,
            token:param.token,
        }
        return gameRPC.inst.drawDailyReward(
            data.gameId,
            data.token,
        );
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
      @WebRouteModule.route()
      @WebRouteModule.paramRequired("gameId", "string", true)
      @WebRouteModule.paramRequired("token", "string", true)
      //@WebRouteModule.paramRequired("secret", "string", true)
      @WebRouteModule.paramRequired("itemId", "number", true)
      @WebRouteModule.paramRequired("num", "number", true)
      @WebRouteModule.paramRequired("param1", "string", true)
      @WebRouteModule.paramRequired("param2", "string", true)
      gmSendItem(param: { [key: string]: any }, content_type: ContentType) {
          let secret = "2451asdqwefs#"
          let gm =  ConfigMgr.get("gm");
          if (!gm){
            return { code: ErrorCode.param_error, errMsg: "param_error!" }
          }
          if(secret != param.secret){
           // return { code: ErrorCode.param_error, errMsg: "param_error!" }
          }
          let data = {
              gameId: param.gameId,
              token:param.token,
              itemId:param.itemId,
              num:param.num,
              param1:param.param1,
              param2:param.param2,
          }
          return gameRPC.inst.gmSendItem(
              data.gameId,
              data.token,
              data.itemId,
              data.num,
              data.param1,
              data.param2,
          );
      }
}

@WebRouteModule.class("/Test")
class RoundTest{

    @WebRouteModule.after()
    async befor(req: Request, res: Response){
        console.log(req);
    }


}