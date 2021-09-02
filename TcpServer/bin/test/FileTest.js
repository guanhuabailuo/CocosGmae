"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpQuest_1 = require("mx-resource/src/HttpQuest");
let url = "http://10.2.1.10:3000/cfg/wh-game-cfg/SpinningKnifeCfg/Monster.json";
let result = HttpQuest_1.http_quest('get', url, {}, 0, null, { respon_type: 'json' });
//# sourceMappingURL=FileTest.js.map