import { WebRouteModule } from "mx-webserve";
import {LocalDate } from "mx-tool/src/Time";
type ContentType = "application/json" | string | undefined;
import { ErrorCode } from "../../../defines/define";
import {gameRPC} from "../../../rpcs/gameRPC"
import { ConfigMgr } from "mx-tool";
import { TablesService } from "../../../lib/tables";
import { rankRPC } from "../../../rpcs/rankRPC";

@WebRouteModule.class(module)
class rank{

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
      @WebRouteModule.route()
      @WebRouteModule.paramRequired("gameId", "string", true)
      @WebRouteModule.paramRequired("start", "number", true)
      @WebRouteModule.paramRequired("end", "number", true)
      getRank(param: { [key: string]: any }, content_type: ContentType) {
          let data = {
              gameId:param.gameId,
              start:param.start,
              end:param.end
          }
          return rankRPC.inst.getRank(data.gameId,data.start,data.end)
      }
}