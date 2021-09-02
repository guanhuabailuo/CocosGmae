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
exports.init = exports.ws = void 0;
const loadWebFiles_1 = require("mx-webserve/src/loadWebFiles");
const path_1 = require("path");
const wsSocket_1 = require("./wsSocket");
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let ws = new WebSocketServe();
        let path = path_1.join(__dirname, "../socketServe/so");
        loadWebFiles_1.loadModule(path);
    });
};
exports.init = init;
class WebSocketServe {
    constructor() {
        this.socket = new wsSocket_1.SocketServer();
    }
}
//# sourceMappingURL=index.js.map