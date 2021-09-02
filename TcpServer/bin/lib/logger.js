"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMoudle = void 0;
const mx_tool_1 = require("mx-tool");
const mx_logger_1 = require("mx-logger");
class Logger extends mx_logger_1.LoggerMoudle {
    constructor() {
        super(...arguments);
        this.name = "Logger";
    }
    // 这里导出日志
    //-------------------------------------------------------------------------------//
    /**
     * 玩家注册的时候，发送一份基本数据
     */
    on_register_player(role, source, scene) {
        let outList = [];
        let outParam = {
            'sSource': source,
            'sScene': scene
        };
        let ot = this.createlog(role, outList, outParam);
        this.logStatic(role._id, 'user_set', ot);
    }
    //-------------------------------------------------------------------------------//
    createlog(role, arrayList = [], outParam = {}) {
        // 有几个是必须要有的添加一下
        let needslist = ['record_time'];
        for (let i = 0; i < needslist.length; i++) {
            if (arrayList.indexOf(needslist[i]) < 0) {
                arrayList.push(needslist[i]);
            }
        }
        // 生成日志的通用接口
        let outLog = {};
        let extList = [];
        for (let key in arrayList) {
            let sKey = arrayList[key];
            switch (sKey) {
                case 'record_time':
                    outLog[sKey] = mx_tool_1.LocalDate.formateString();
                    break;
                default:
                    if (outParam.hasOwnProperty(sKey)) {
                        outLog[sKey] = outParam[sKey];
                    }
                    else {
                        extList.push(sKey);
                    }
                    break;
            }
        }
        if (role) {
            for (let key in extList) {
                let sKey = extList[key];
                try {
                    switch (sKey) {
                        default: break;
                    }
                }
                catch (e) {
                }
            }
        }
        else {
            extList = [];
        }
        return outLog;
    }
    //------------------------------------------//
    /**
     * 用户 app 注册日志 (例子代码)
     * @param role
     * @param inviteUid
     * @param source
     */
    app_regist(role, inviteUid = '', source = '', scene = '') {
        let outList = [
            "sInviteUid",
            "sSource",
            'sScene'
        ];
        let outParam = {
            'sInviteUid': (inviteUid || "").toString(),
            'sSource': (source || "").toString(),
            'sScene': (scene || "").toString()
        };
        this.logEvent(role._id, 'app_regist', this.createlog(role, outList, outParam));
        this.on_register_player(role, source, scene);
    }
    /**
     * 用户的app登录日志 (例子代码)
     * @param role
     * @param source
     */
    app_login(role, source = '', scene = '', sForbid = false) {
        let outList = [
            "sSource",
            "sScene",
            "sForbid"
        ];
        let outParam = {
            'sSource': (source || "").toString(),
            'sScene': (scene || "").toString(),
            'sForbid': (sForbid || "").toString()
        };
        if (typeof role == "string") {
            this.logEvent(role, 'app_login', this.createlog(undefined, outList, outParam));
        }
        else {
            this.logEvent(role._id, 'app_login', this.createlog(role, outList, outParam));
        }
    }
}
exports.LoggerMoudle = new Logger();
//# sourceMappingURL=logger.js.map