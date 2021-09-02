/**
 * this is a auto create file
 * 这是一个自动生成的文件,最好不要直接改动这个文件
 */

import { RequestRPC } from "./nodesocket"



class localuserRPC extends RequestRPC {
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
}

export class userRPC {
    private static _inst: localuserRPC
    static async rpc_init(srv?: any, ns?: string) {
        if (!this._inst) this._inst = new localuserRPC("user", srv, "", "", ns)
        return true;
    }

    static get inst() {
        if (!this._inst) throw ("need call rpc_init first user")
        return this._inst;
    }

    
}