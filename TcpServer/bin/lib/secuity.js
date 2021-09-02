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
exports.makeSign = exports.makeSignStr = exports.decryptData = void 0;
const crypto_1 = require("crypto");
const define_1 = require("../defines/define");
function decryptData(_encryptedData, _iv, _sessionKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // base64 decode
        var sessionKey = Buffer.from(_sessionKey, 'base64');
        let encryptedData = Buffer.from(_encryptedData, 'base64');
        let iv = Buffer.from(_iv, 'base64');
        try {
            // 解密
            var decipher = crypto_1.createDecipheriv('aes-128-cbc', sessionKey, iv);
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true);
            var decoded = decipher.update(encryptedData, 'binary', 'utf8');
            decoded += decipher.final('utf8');
            return JSON.parse(decoded);
        }
        catch (err) {
            throw ({ code: define_1.ErrorCode.session_key_error, errMsg: '出了点小问题，请退出后重新打开' });
        }
    });
}
exports.decryptData = decryptData;
function makeSignStr(param) {
    let aList = [];
    for (let key in param) {
        if (key == "sign")
            continue;
        aList.push(`${key}=${param[key]}`);
    }
    aList.sort();
    return aList.join('&');
}
exports.makeSignStr = makeSignStr;
function makeSign(type, data, key) {
    switch (type) {
        case 'sha1': return makeSha1(data, key);
        case 'sha256': return makeSha256(data, key);
        case 'md5':
        default:
            return makeMd5(data);
    }
}
exports.makeSign = makeSign;
function makeMd5(data) {
    return crypto_1.createHash("md5").update(data).digest("hex");
}
function makeSha1(data, key) {
    if (key) {
        return crypto_1.createHmac("sha1", key).update(data).digest("hex");
    }
    else {
        return crypto_1.createHash("sha1").update(data).digest("hex");
    }
}
function makeSha256(data, key) {
    if (key) {
        return crypto_1.createHmac("sha256", key).update(data).digest("hex");
    }
    else {
        return crypto_1.createHash("sha256").update(data).digest("hex");
    }
}
//# sourceMappingURL=secuity.js.map