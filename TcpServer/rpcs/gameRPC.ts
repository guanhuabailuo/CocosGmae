/**
 * this is a auto create file
 * 这是一个自动生成的文件,最好不要直接改动这个文件
 */

import { RequestRPC } from "./nodesocket"
import { ErrorCode } from "../defines/define"


class localgameRPC extends RequestRPC {
    /**
	 * 
	token验证
	 * @param {string} userId 用户id
	 * @param {string} token 用户token
	 */
	checkToken(userId: string, token: string): Promise<boolean> {
	    let query = {
			userId: userId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "checkToken", Object.assign(query, body), "userId,token".split(","), "userId")
	}
	/**
	 * 
	登陆游戏
	 * @param {string} gameId 玩家id
	 * @param {string} uid 数字id
	 * @param {string} version 版本
	 * @param {string} inviterId 邀请id
	 * @param {string} nickName 昵称
	 * @param {string} avatarUrl 头像
	 */
	login(gameId: string, uid: string, version: string, inviterId: string, nickName?: string, avatarUrl?: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			uid: uid,
			version: version,
			inviterId: inviterId,
			nickName: nickName,
			avatarUrl: avatarUrl
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "login", Object.assign(query, body), "gameId,uid,version,inviterId,nickName,avatarUrl".split(","), "gameId")
	}
	/**
	 * 
	刷新所有数据
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	refAllInfo(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "refAllInfo", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	开始关卡
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {number} level level
	 */
	startLevel(gameId: string, token: string, level: number): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			level: level
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "startLevel", Object.assign(query, body), "gameId,token,level".split(","), "gameId")
	}
	/**
	 * 
	游戏成功
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} levelId 关卡Id
	 * @param {string} killNum 击杀数量
	 */
	levelSuccessed(gameId: string, token: string, levelId: string, killNum: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			levelId: levelId,
			killNum: killNum
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "levelSuccessed", Object.assign(query, body), "gameId,token,levelId,killNum".split(","), "gameId")
	}
	/**
	 * 
	游戏失败
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} levelId 关卡Id
	 * @param {string} killNum 击杀数量
	 */
	levelFailed(gameId: string, token: string, levelId: string, killNum: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			levelId: levelId,
			killNum: killNum
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "levelFailed", Object.assign(query, body), "gameId,token,levelId,killNum".split(","), "gameId")
	}
	/**
	 * 
	累计奖励
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	drawContinueReward(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "drawContinueReward", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	累计奖励信息
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	openContinueReward(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "openContinueReward", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	刷新信息
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	refreshInfo(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "refreshInfo", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	外刀升级
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	knifeLevelUp(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "knifeLevelUp", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	玩家模型升级
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} modelId 模型id
	 */
	playerLevelUp(gameId: string, token: string, modelId: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			modelId: modelId
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "playerLevelUp", Object.assign(query, body), "gameId,token,modelId".split(","), "gameId")
	}
	/**
	 * 
	玩家模型变更
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} modelId 模型id
	 */
	changePlayerModel(gameId: string, token: string, modelId: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			modelId: modelId
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "changePlayerModel", Object.assign(query, body), "gameId,token,modelId".split(","), "gameId")
	}
	/**
	 * 
	领取每日奖励
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	drawDailyReward(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "drawDailyReward", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	gm命令
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {number} itemId 道具ID
	 * @param {string} num 数量
	 * @param {string} param1 参数1
	 * @param {string} param2 参数2
	 */
	gmSendItem(gameId: string, token: string, itemId: number, num: string, param1: string, param2: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			itemId: itemId,
			num: num,
			param1: param1,
			param2: param2
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "gmSendItem", Object.assign(query, body), "gameId,token,itemId,num,param1,param2".split(","), "gameId")
	}
	/**
	 * 
	已获得红包列表
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	redPacketList(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "redPacketList", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
	/**
	 * 
	获得红包
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} levelId -
	 * @param {string} redPacketId -
	 */
	getRedPacket(gameId: string, token: string, levelId: string, redPacketId: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			levelId: levelId,
			redPacketId: redPacketId
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "getRedPacket", Object.assign(query, body), "gameId,token,levelId,redPacketId".split(","), "gameId")
	}
	/**
	 * 
	获取关卡
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 * @param {string} levelId 一次发送关卡数量
	 */
	levelData(gameId: string, token: string, levelId: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token,
			levelId: levelId
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "levelData", Object.assign(query, body), "gameId,token,levelId".split(","), "gameId")
	}
	/**
	 * 
	test
	 * @param {string} gameId 玩家id
	 * @param {string} token token
	 */
	allInfoTest(gameId: string, token: string): Promise<{code: ErrorCode}> {
	    let query = {
			gameId: gameId,
			token: token
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "allInfoTest", Object.assign(query, body), "gameId,token".split(","), "gameId")
	}
}

export class gameRPC {
    private static _inst: localgameRPC
    static async rpc_init(srv?: any, ns?: string) {
        if (!this._inst) this._inst = new localgameRPC("game", srv, "", "", ns)
        return true;
    }

    static get inst() {
        if (!this._inst) throw ("need call rpc_init first game")
        return this._inst;
    }

    
}