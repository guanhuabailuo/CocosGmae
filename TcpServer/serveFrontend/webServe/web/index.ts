import { http_quest } from "mx-resource/src/HttpQuest";
import { LocalDate, Util } from "mx-tool";
import { NextFunction, Response, Request } from "mx-webserve";
import { WebRouteModule } from "mx-webserve";
import { ErrorCode } from "../../../defines/define";
import { AesDecode, AesEncode } from "../../../lib/encode-decode";
import { LoggerMoudle } from "../../../lib/logger";
import { TablesService } from "../../../lib/tables";
import { userRPC } from "../../../rpcs/userRPC";
@WebRouteModule.class(module)
class _0 {
    /**
     * 测试用的hello接口  默认 get post 都是支持的
     * @route get /hello
     * @group main - 基础信息
     * @param {string} id.query.required - 用户id 
     * @param {string} token.query - 用户token 
     * @returns {{code:number,data:string}} 0 - 返回成功
     */
    @WebRouteModule.route()
    async hello(param: { id: string, token: string }) {
        let url = "http://10.2.1.10:3000/cfg/wh-game-cfg/SpinningKnifeCfg/Monster1.json"
        let result = await http_quest<{ code: number }>('get', url, {
            }, 0, null, { respon_type: 'json' })
        
            console.info(result)

        return { code: ErrorCode.ok, data: "success" }
    }

    /**
     * 重载配置资源
     * @route get /reloadConfig
     * @group main - 基础信息
     * @returns {{code:number,data:string}} 0 - 返回成功
     */
     @WebRouteModule.route()
     async reloadConfig(param: { id: string, token: string }) {
         TablesService.onlineCheck()
         return { code: ErrorCode.ok, data: TablesService.getAllPlayerModelConfig() }
     }
}

// 全局请求拦截监控
@WebRouteModule.globalClass()
class _1 {
    @WebRouteModule.globalBefore()
    async before(req: Request, res: Response) {
        // 这里增加一个数据加密的流程数据采用对称加密，加密需要的条件是
        let params = req.params as any;
        if (params.__id__ && params.__data__ && params.__iv__) {
            // 需要通过加密验证流程

            let enpasskey = "1234567890123456";
            let passkey = enpasskey;
            try {
                let info = AesDecode(passkey, params.__data__, params.__iv__);
                req.params = JSON.parse(info);
                req.params.__encode__ = enpasskey;
            }
            catch (e) {
                throw { code: ErrorCode.decode_error, errMsg: "token error parse message error" }
            }
        }

        let id = req.params.id || req.params.roleid || req.params.uid;
        (req as any).reqID = LoggerMoudle.apiBegin(req.path, req.method, id, Util.copy(req.params))
    }

    @WebRouteModule.globalAfter()
    after(req: Request, res: Response) {
        if (typeof (req as any).responseData === "object") {
            (req as any).responseData.serverTime = LocalDate.now();
        }
        if ((req as any).reqID) LoggerMoudle.apiEnd((req as any).reqID, true, (req as any).responseData)
        if (req.params.__encode__) {
            let data = (req as any).responseData;
            if (typeof data == "object") {
                data = JSON.stringify(data);
            }
            try {
                // 压缩了还回去
                let info = AesEncode(req.params.__encode__, data);
                (req as any).responseData = {
                    __data__: info.encryptedData,
                    __iv__: info.iv
                }
            }
            catch (e) {
                // 失败的话走明文
            }
        }
    }
}