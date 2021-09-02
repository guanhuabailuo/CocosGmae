import { WebRouteModule } from "mx-webserve";
import {LocalDate } from "mx-tool/src/Time";
type ContentType = "application/json" | string | undefined;
import { ErrorCode } from "../../../defines/define";
import {gameRPC} from "../../../rpcs/gameRPC"
import { ConfigMgr } from "mx-tool";
import { TablesService } from "../../../lib/tables";

@WebRouteModule.class(module)
class resource{

     /**
     * 刷新所有数据
     * @date 2021-07-26
     * @group resource - 刷新所有数据
     * @route POST /resource/getConfig
     * @param {string} configName.query.required - 配置名称
     * @param {string} idStart.query.required - 开始ID
     * @param {string} idEnd.query.required - 结束ID  结束如果是9999  默认是全部配置
     * @returns {{code:number}} 200 - 返回内容
     */
      @WebRouteModule.route()
      @WebRouteModule.paramRequired("configName", "string", true)
      @WebRouteModule.paramRequired("idStart", "number", true)
      @WebRouteModule.paramRequired("idEnd", "number", true)
      getConfig(param: { [key: string]: any }, content_type: ContentType) {
          let type = param.configName;
          let idStart = param.idStart;
          let idEnd = param.idEnd;
          let res =  TablesService.findResCopy(type,idStart,idEnd);
          return {code:ErrorCode.ok,data:res}
      }
}