"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.name = void 0;
const mx_rpc_1 = require("mx-rpc");
const mx_tool_1 = require("mx-tool");
const mx_webserve_1 = require("mx-webserve");
const path_1 = require("path");
const tables_1 = require("../../../lib/tables");
exports.name = "webServe";
let web = class web {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (mx_tool_1.ConfigMgr.get("host") && mx_tool_1.ConfigMgr.get("swagger")) {
                try {
                    mx_webserve_1.WebRouteModule.openSwagger({ basedir: path_1.join(__dirname, '..'), ext: mx_tool_1.ConfigMgr.get("swaggertype") || ".js", routePath: "web", title: "platform", host: mx_tool_1.ConfigMgr.get("host") });
                }
                catch (e) {
                }
            }
            let webFiles = path_1.join(__dirname, "../web");
            // AutoLoaderModule.watch(webFiles, { isFile: false, tsc: true }).load()
            mx_webserve_1.WebRouteModule.openCross();
            return mx_webserve_1.WebRouteModule.init(mx_tool_1.ConfigMgr.get("port"), webFiles, function () {
                return mx_tool_1.ConfigMgr.get("env") || "";
            });
        });
    }
    /**
     * 检查资源更新
     * @route broadcastme reloadTables
     * @group webServe
     * @returns {void} 0 - 不需要返回内容
     */
    reloadTables() {
        // 提供一个更新表格的接口
        tables_1.TablesService.checkTables();
    }
};
__decorate([
    mx_rpc_1.RPCHandle.init()
], web.prototype, "init", null);
__decorate([
    mx_rpc_1.RPCHandle.route()
], web.prototype, "reloadTables", null);
web = __decorate([
    mx_rpc_1.RPCHandle.class("webServe", module)
], web);
//# sourceMappingURL=index.js.map