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
const HttpQuest_1 = require("mx-resource/src/HttpQuest");
let url = "http://10.2.1.10:3000/cfg/wh-game-cfg/SpinningKnifeCfg/Monster.json";
let result = () => __awaiter(void 0, void 0, void 0, function* () {
    let rs = yield HttpQuest_1.http_quest('get', url, {}, 0, null, { respon_type: 'json' });
    console.info(rs);
});
console.info(1111);
console.info(result);
//# sourceMappingURL=FileTest.js.map