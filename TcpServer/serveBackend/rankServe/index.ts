import { RPCHandle } from "mx-rpc";
import { InitMoudle } from "mx-tool";
import { RankInfo } from "../../defines/define";
import { rankModel } from "../rankModel";

@RPCHandle.class("rank",module)
class rankServe{

     /**
     * 插入或更新排行榜
     * @route request insterOrUpdateRank
     * @group rank
     * @key gameId
     * @param {string} gameId.query.required - 用户id 
     * @param {RankInfo} RankInfo.query.required - 用户token 
     * @returns {boolean} 0 - 返回验证成功
     * @throws {{code:number,errMsg:string}} 4 - 返回token错误
     */
    @RPCHandle.route()
    async insterOrUpdateRank(gameId:string,rankInfo:RankInfo){
       return rankModel.insterOrUpdate(gameId,rankInfo);
    }

     /**
     * 插入或更新排行榜
     * @route request getRank
     * @group rank
     * @key gameId
     * @param {string} gameId.query.required - 用户id 
     * @param {number} start.query.required - 开始
     * @param {number} end.query.required - 开始
     * @returns {boolean} 0 - 返回验证成功
     * @throws {{code:number,errMsg:string}} 4 - 返回token错误
     */
    @RPCHandle.route()
    async getRank(gameId:string,start:number,end:number){
        return rankModel.getRankList(gameId,start,end);
    }
}