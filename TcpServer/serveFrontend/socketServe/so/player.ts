import { gameRPC } from "../../../rpcs/gameRPC";
import { RequestCode, ResponseCode } from "../cede";
import { SocketRouteModule } from "../route/SocketRouteModule";
import { ServerPackage } from "../wsSocket";

class player{

    @SocketRouteModule.route(RequestCode.regiset)
    async regist(parems){
        let resData = {message:"注册成功",uuid:parems.uuid};
        let _package:ServerPackage = new ServerPackage();
        _package.code = ResponseCode.regiset;
        _package.data = resData;
        return _package;
    }

}