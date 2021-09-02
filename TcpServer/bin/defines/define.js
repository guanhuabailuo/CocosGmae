"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gFinallAwardGroup = exports.MX_Role_Rate = exports.versioncmp = exports.LogClass = exports._info_set = exports._info_get = exports.compareVersion = exports.appendSign = exports.makeSign = exports.makeNornalSign = exports.s_lang = exports.ErrorCode = exports.DBDefine = void 0;
const mx_tool_1 = require("mx-tool");
const crypto_1 = require("crypto");
exports.DBDefine = {
    db: mx_tool_1.ConfigMgr.get('db.database') || 'platform',
    col_role: 'roles',
    col_rank: 'rank',
};
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ok"] = 0] = "ok";
    ErrorCode[ErrorCode["param_error"] = 1] = "param_error";
    ErrorCode[ErrorCode["decode_error"] = 2] = "decode_error";
    ErrorCode[ErrorCode["session_key_error"] = 3] = "session_key_error";
    ErrorCode[ErrorCode["token_error"] = 4] = "token_error";
    // 数据库
    ErrorCode[ErrorCode["db_not_ready"] = 10] = "db_not_ready";
    ErrorCode[ErrorCode["db_error"] = 11] = "db_error";
    // 角色相关
    ErrorCode[ErrorCode["role_no"] = 10001] = "role_no";
    ErrorCode[ErrorCode["role_exist"] = 10004] = "role_exist";
    ErrorCode[ErrorCode["role_token_error"] = 10005] = "role_token_error";
    ErrorCode[ErrorCode["login_error"] = 10006] = "login_error";
    //关卡
    ErrorCode[ErrorCode["chapterId_not_exist"] = 10011] = "chapterId_not_exist";
    ErrorCode[ErrorCode["levelId_not_exist"] = 10012] = "levelId_not_exist";
    ErrorCode[ErrorCode["level_not_match"] = 10013] = "level_not_match";
    ErrorCode[ErrorCode["no_start_level"] = 10014] = "no_start_level";
    ErrorCode[ErrorCode["is_fighting"] = 10015] = "is_fighting";
    ErrorCode[ErrorCode["last_level"] = 10016] = "last_level";
    ErrorCode[ErrorCode["more_then_player_max_level"] = 10017] = "more_then_player_max_level";
    ErrorCode[ErrorCode["kill_num_more_then_max"] = 10018] = "kill_num_more_then_max";
    //每日签到
    ErrorCode[ErrorCode["have_been_awarded"] = 10019] = "have_been_awarded";
    ErrorCode[ErrorCode["reward_not_exist"] = 10020] = "reward_not_exist";
    ErrorCode[ErrorCode["no_coin"] = 10021] = "no_coin";
    //升级相关
    ErrorCode[ErrorCode["knife_level_up_config_not_exist"] = 10101] = "knife_level_up_config_not_exist";
    ErrorCode[ErrorCode["knife_level_max"] = 10102] = "knife_level_max";
    ErrorCode[ErrorCode["player_model_level_up_config_not_exist"] = 10103] = "player_model_level_up_config_not_exist";
    //资源相关
    //体力
    ErrorCode[ErrorCode["no_enough_strength"] = 10200] = "no_enough_strength";
    //金币
    ErrorCode[ErrorCode["no_enough_coin"] = 10201] = "no_enough_coin";
    //模型
    ErrorCode[ErrorCode["player_model_not_exist"] = 10203] = "player_model_not_exist";
    //排行榜
    ErrorCode[ErrorCode["rank_not_found"] = 10301] = "rank_not_found";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
let map = {};
map[1] = "您在${Month}月${Date}日发起的《${activeName}》活动，获奖者名单及收货信息如下，请在活动结束后7个工作日内邮寄出实物奖励。如您因未及时发放奖励或发送虚假奖励，头号赢家有权封停您的账号。造成重大影响者，将依法交予公安机关处理。";
map[2] = "中奖名单";
function s_lang(code, params = {}) {
    let useStr = map[code] || '';
    for (let key in params) {
        let reg = new RegExp("\\$\\{" + key + "\\}", "g");
        useStr = useStr.replace(reg, params[key]);
    }
    return useStr;
}
exports.s_lang = s_lang;
function makeNornalSign(params, appKey) {
    if (!params || !appKey) {
        return '';
    }
    let queryString = "";
    const keys = Object.keys(params).sort();
    for (var i in keys) {
        if (keys[i] == 'sign')
            continue;
        queryString += keys[i];
        queryString += "=";
        queryString += params[keys[i]];
        queryString += "&";
    }
    const stringSignTemp = queryString + "key" + "=" + appKey; //key为平台给厂商的密钥key
    const sign = crypto_1.createHash("md5").update(stringSignTemp).digest('hex');
    return sign;
}
exports.makeNornalSign = makeNornalSign;
function makeSign(params, appKey) {
    if (!params || !appKey) {
        return '';
    }
    let queryString = [];
    const keys = Object.keys(params).sort();
    for (var i in keys) {
        let key = keys[i];
        if (key == 'sign')
            continue;
        let value = params[keys[i]];
        if (typeof value == 'object') {
            queryString.push(`${key}=${JSON.stringify(value)}`);
        }
        else if (value != undefined) {
            queryString.push(`${key}=${value}`);
        }
    }
    const stringSignTemp = queryString.join('&') + appKey; //key为平台给厂商的密钥key
    const sign = crypto_1.createHash("md5").update(stringSignTemp).digest('hex');
    return sign;
}
exports.makeSign = makeSign;
function appendSign(params, appKey) {
    let sign = makeNornalSign(params, appKey);
    params.sign = sign;
    return params;
}
exports.appendSign = appendSign;
function compareVersion(_v1, _v2) {
    let v1 = _v1.split('.');
    let v2 = _v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);
        if (num1 > num2) {
            return 1;
        }
        else if (num1 < num2) {
            return -1;
        }
    }
    return 0;
}
exports.compareVersion = compareVersion;
function _info_get(key) {
    let sKey = key.split('.');
    let obj = this;
    for (let i = 0; i < sKey.length; i++) {
        let oneKey = sKey[i];
        if (i == sKey.length - 1) {
            return obj[oneKey];
        }
        else if (!obj.hasOwnProperty(oneKey)) {
            break;
        }
        else {
            obj = obj[oneKey];
        }
    }
    return undefined;
}
exports._info_get = _info_get;
function _info_set(key, value) {
    let sKey = key.split('.');
    let obj = this;
    for (let i = 0; i < sKey.length; i++) {
        let oneKey = sKey[i];
        if (i == sKey.length - 1) {
            if (obj[oneKey] == value)
                return false;
            if (value == undefined || value == null) {
                delete obj[oneKey];
            }
            else {
                obj[oneKey] = value;
            }
        }
        else {
            if (!obj.hasOwnProperty(oneKey)) {
                obj[oneKey] = {};
            }
            obj = obj[oneKey];
        }
    }
    return true;
}
exports._info_set = _info_set;
class LogClass {
    constructor(name) {
        this.name = "";
        this.start = 0;
        this.step = 0;
        this.name = name;
        this.start = mx_tool_1.LocalDate.now();
    }
    show(stepName) {
        if (!LogClass.open)
            return;
        let curr = mx_tool_1.LocalDate.now();
        console.log(this.name, "step", this.step++, stepName || "", "time", curr - this.start);
        this.start = curr;
    }
}
exports.LogClass = LogClass;
LogClass.open = false;
function versioncmp(vA, vB) {
    let asvA = (vA || "").split('.');
    let asvB = (vB || "").split('.');
    for (let i = 0; i < Math.max(asvA.length, asvB.length); i++) {
        let numA = parseInt(asvA[i] || "0");
        if (isNaN(numA))
            numA = 0;
        let numB = parseInt(asvB[i] || "0");
        if (isNaN(numB))
            numB = 0;
        if (numA > numB)
            return true;
        if (numA < numB)
            return false;
    }
    return false;
}
exports.versioncmp = versioncmp;
exports.MX_Role_Rate = 100 * 10000;
exports.gFinallAwardGroup = "finallaward";
//# sourceMappingURL=define.js.map