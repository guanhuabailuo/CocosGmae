/**
 * this is a auto create file
 * 这是一个自动生成的文件,最好不要直接改动这个文件
 */

import { RequestRPC } from "./nodesocket"
import { RankInfo } from "../defines/define"


class localrankRPC extends RequestRPC {
    /**
	 * 
	插入或更新排行榜
	 * @param {string} gameId 用户id
	 * @param {RankInfo} RankInfo 用户token
	 */
	insterOrUpdateRank(gameId: string, RankInfo: RankInfo): Promise<boolean> {
	    let query = {
			gameId: gameId,
			RankInfo: RankInfo
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "insterOrUpdateRank", Object.assign(query, body), "gameId,RankInfo".split(","), "gameId")
	}
	/**
	 * 
	插入或更新排行榜
	 * @param {string} gameId 用户id
	 * @param {number} start 开始
	 * @param {number} end 开始
	 */
	getRank(gameId: string, start: number, end: number): Promise<boolean> {
	    let query = {
			gameId: gameId,
			start: start,
			end: end
	    }
	
	    let body = {
	
	    }
	
	    return this.request<any>("request", "getRank", Object.assign(query, body), "gameId,start,end".split(","), "gameId")
	}
}

export class rankRPC {
    private static _inst: localrankRPC
    static async rpc_init(srv?: any, ns?: string) {
        if (!this._inst) this._inst = new localrankRPC("rank", srv, "", "", ns)
        return true;
    }

    static get inst() {
        if (!this._inst) throw ("need call rpc_init first rank")
        return this._inst;
    }

    
}