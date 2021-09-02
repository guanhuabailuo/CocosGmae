"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mx_webserve_1 = require("mx-webserve");
const define_1 = require("../../../defines/define");
const tables_1 = require("../../../lib/tables");
let resource = class resource {
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
    getConfig(param, content_type) {
        let type = param.configName;
        let idStart = param.idStart;
        let idEnd = param.idEnd;
        let res = tables_1.TablesService.findResCopy(type, idStart, idEnd);
        return { code: define_1.ErrorCode.ok, data: res };
    }
};
__decorate([
    mx_webserve_1.WebRouteModule.route(),
    mx_webserve_1.WebRouteModule.paramRequired("configName", "string", true),
    mx_webserve_1.WebRouteModule.paramRequired("idStart", "number", true),
    mx_webserve_1.WebRouteModule.paramRequired("idEnd", "number", true)
], resource.prototype, "getConfig", null);
resource = __decorate([
    mx_webserve_1.WebRouteModule.class(module)
], resource);
//# sourceMappingURL=resource.js.map