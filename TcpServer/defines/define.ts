import { ConfigMgr, LocalDate } from "mx-tool";
import { createHash } from "crypto";

export var DBDefine = {
    db: ConfigMgr.get('db.database') || 'platform',
    col_role: 'roles',
    col_rank:'rank',
    
}

export interface playerContinueInfo{
    startTime:number
    currentLevel:number
    accumulatedCoin:number
    accumulatedTime:number
}

export interface RankInfo{
    gameId:string
    nickName:string
    score:number
    exScore:number
}

export interface playerDailyInfo{
    day:number
    draw:boolean
}

export enum ErrorCode {
    ok = 0,
    param_error = 1,
    decode_error = 2,
    session_key_error = 3,
    token_error = 4,

     // 数据库
     db_not_ready = 10,
     db_error = 11,

     // 角色相关
    role_no = 10001,
    role_exist = 10004,
    role_token_error = 10005,
    login_error = 10006,

    
    

     //关卡
     chapterId_not_exist = 10011,
     levelId_not_exist = 10012,
     level_not_match = 10013,
     no_start_level = 10014,
     is_fighting = 10015,
     last_level = 10016,
     more_then_player_max_level = 10017,
     kill_num_more_then_max = 10018,

     //每日签到
     have_been_awarded = 10019,
     reward_not_exist = 10020,
     no_coin = 10021,

     //升级相关
     knife_level_up_config_not_exist = 10101,
     knife_level_max = 10102,
     player_model_level_up_config_not_exist = 10103,

     //资源相关
     //体力
     no_enough_strength = 10200,
     //金币
     no_enough_coin = 10201,
     //模型
     player_model_not_exist = 10203,


     //排行榜
    rank_not_found = 10301,


}

let map: { [code: number]: string } = {};
map[1] = "您在${Month}月${Date}日发起的《${activeName}》活动，获奖者名单及收货信息如下，请在活动结束后7个工作日内邮寄出实物奖励。如您因未及时发放奖励或发送虚假奖励，头号赢家有权封停您的账号。造成重大影响者，将依法交予公安机关处理。"
map[2] = "中奖名单"
export function s_lang(code: number, params: { [key: string]: any } = {}) {
    let useStr = map[code] || '';
    for (let key in params) {
        let reg = new RegExp("\\$\\{" + key + "\\}", "g");
        useStr = useStr.replace(reg, params[key])
    }
    return useStr;
}

export function makeNornalSign(params: { [key: string]: any }, appKey: string) {
    if (!params || !appKey) {
        return '';
    }
    let queryString = "";
    const keys = Object.keys(params).sort()
    for (var i in keys) {
        if (keys[i] == 'sign') continue;
        queryString += keys[i];
        queryString += "=";
        queryString += params[keys[i]];
        queryString += "&";
    }
    const stringSignTemp = queryString + "key" + "=" + appKey; //key为平台给厂商的密钥key
    const sign = createHash("md5").update(stringSignTemp).digest('hex');
    return sign;
}

export function makeSign(params: { [key: string]: any }, appKey: string) {
    if (!params || !appKey) {
        return '';
    }
    let queryString = [];
    const keys = Object.keys(params).sort()
    for (var i in keys) {
        let key = keys[i];
        if (key == 'sign') continue;
        let value = params[keys[i]];
        if (typeof value == 'object') {
            queryString.push(`${key}=${JSON.stringify(value)}`)
        }
        else if (value != undefined) {
            queryString.push(`${key}=${value}`)
        }
    }
    const stringSignTemp = queryString.join('&') + appKey; //key为平台给厂商的密钥key
    const sign = createHash("md5").update(stringSignTemp).digest('hex');
    return sign;
}

export function appendSign(params: { [key: string]: any }, appKey: string) {
    let sign = makeNornalSign(params, appKey);
    params.sign = sign;
    return params;
}


export function compareVersion(_v1: string, _v2: string) {
    let v1 = _v1.split('.')
    let v2 = _v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}

export function _info_get(this: any, key: string) {
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

export function _info_set(this: any, key: string, value: any) {
    let sKey = key.split('.');
    let obj = this;
    for (let i = 0; i < sKey.length; i++) {
        let oneKey = sKey[i];
        if (i == sKey.length - 1) {
            if (obj[oneKey] == value) return false;
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

// 固定的字段
export interface ifTBNormalParams {
    app_key: string,//商家应用的appKey
    user_nick: string,//当前登录用户的昵称(需要用户授权)
    mix_nick: string,// 混淆的昵称
    open_id: string,//当前登录用户的openId
    env: string,//当前云应用调用环境（test或者online）
    mini_app_id: string,//当前小程序的id
    source_app_id: string,
    access_token: string,//当前登录用户的授权token（需要用户授权）
    sign: string,//使用当前小程序appkey和secret进行对参数进行加签后的签名
    [key: string]: any
}

export class LogClass {
    static open = false;
    name: string = "";
    start: number = 0;
    step: number = 0;
    constructor(name: string) {
        this.name = name;
        this.start = LocalDate.now()
    }

    show(stepName?: string) {
        if (!LogClass.open) return;
        let curr = LocalDate.now();
        console.log(this.name, "step", this.step++, stepName || "", "time", curr - this.start)
        this.start = curr;
    }
}

export function versioncmp(vA: string, vB: string) {
    let asvA = (vA || "").split('.')
    let asvB = (vB || "").split('.')

    for (let i = 0; i < Math.max(asvA.length, asvB.length); i++) {
        let numA = parseInt(asvA[i] || "0")
        if (isNaN(numA)) numA = 0;
        let numB = parseInt(asvB[i] || "0")
        if (isNaN(numB)) numB = 0;

        if (numA > numB) return true
        if (numA < numB) return false
    }

    return false
}

export var MX_Role_Rate = 100 * 10000

export var gFinallAwardGroup = "finallaward";