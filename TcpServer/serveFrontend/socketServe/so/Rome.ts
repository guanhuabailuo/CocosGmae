import { gameRPC } from "../../../rpcs/gameRPC";
import { RequestCode, ResponseCode } from "../cede";
import { SocketRouteModule } from "../route/SocketRouteModule";
import { roomServer } from "../Server/RomeServer";
import { ServerPackage } from "../wsSocket";

class Rome{

    @SocketRouteModule.route(RequestCode.createRome)
    async createRome(parems){
        let _roomId = roomServer.createRoom();
        let resData = {id:_roomId};
        let _package:ServerPackage = new ServerPackage();
        _package.code = ResponseCode.createRome;
        _package.data = resData;
        return _package;
    }

    @SocketRouteModule.route(RequestCode.joinRome)
    async joinRome(parems){
        let info = parems.memberInfo;
        let id = parems.id;
        roomServer.joinRoom(id,info.uuid,info);
    }

}