"use strict";
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
exports.SocketRouteModule = void 0;
var routeMap = {};
exports.SocketRouteModule = {
    route(code) {
        return (target, name, descriptor) => {
            routeMap[code] = {
                target: target,
                value: descriptor.value,
            };
        };
    },
    handler(code, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let method = this.getRouteFunc(code, params);
            let res = yield method();
            return res;
        });
    },
    getRouteFunc(code, params) {
        let routeObj = routeMap[code];
        if (!routeObj) {
            return undefined;
        }
        return routeObj.value.bind(routeObj.target, params);
    },
};
//# sourceMappingURL=SocketRouteModule.js.map