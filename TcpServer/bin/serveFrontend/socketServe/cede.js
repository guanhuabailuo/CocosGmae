"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCode = exports.RequestCode = void 0;
var RequestCode;
(function (RequestCode) {
    RequestCode[RequestCode["ping"] = 1] = "ping";
    RequestCode[RequestCode["regiset"] = 2] = "regiset";
    RequestCode[RequestCode["createRome"] = 3] = "createRome";
    RequestCode[RequestCode["joinRome"] = 4] = "joinRome";
    RequestCode[RequestCode["RomeTick"] = 100] = "RomeTick";
})(RequestCode = exports.RequestCode || (exports.RequestCode = {}));
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["ping"] = 10001] = "ping";
    ResponseCode[ResponseCode["regiset"] = 10002] = "regiset";
    ResponseCode[ResponseCode["createRome"] = 10003] = "createRome";
    ResponseCode[ResponseCode["RomeTick"] = 10100] = "RomeTick";
    //广播段
    ResponseCode[ResponseCode["room_member_bordcast"] = 30001] = "room_member_bordcast";
    ResponseCode[ResponseCode["error"] = 99999] = "error";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));
//# sourceMappingURL=cede.js.map