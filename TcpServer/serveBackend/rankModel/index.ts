import { MongodbMoudle } from "mx-database";
import { LocalDate } from "mx-tool";
import { DBDefine, ErrorCode, RankInfo } from "../../defines/define";
import { RankUnit } from "./rankUnit";

export  const init = async function(){
    rankModel.init()
}

export class rankModel{
    private static rank:RankUnit[] = [];

    private static rankMap = new Map<string,RankUnit>();
    
    static async init(){
        await this.loadAll();
        this.sort()
        console.debug("开始排行榜计时器")
        setInterval(this.sort,60000)
    }

    static async loadAll(){
       let rtn = await MongodbMoudle.get_database(DBDefine.db).get_unit_list<{ [key: string]: any }>(DBDefine.col_rank, {}).load();  
       rtn.data.forEach((dbInfo)=>{
           let rankUnit =  RankUnit.createRankUnit(dbInfo.get("_id"),dbInfo);
           rankModel.rankMap.set(rankUnit.gameId,rankUnit);
           rankModel.rank.push(rankUnit);
       })
    }

    static sort(){
        rankModel.sortObj(rankModel.rank,"score");
    }

  static sortObj(arr,key){
        key=key||'id';
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j][key] < arr[j+1][key]) {        
                    let temp = arr[j+1];        
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

    }

    static async insterOrUpdate(gameId:string,rankInfo:RankInfo){
       let rankUnit = this.rankMap.get(gameId);
       if(rankUnit){
          rankUnit.nickName = rankInfo.nickName;
          rankUnit.score = rankInfo.score;
          rankUnit.exScore = rankInfo.exScore;
          rankUnit.updateTime = LocalDate.now();
          return rankUnit;
       }else{
        return new Promise<any>(function (resolve, reject) {
            MongodbMoudle.get_database(DBDefine.db).update_insert(DBDefine.col_rank,{"_id":gameId},{"nickName":rankInfo.nickName,"score":rankInfo.score,"exScore":rankInfo.exScore,"updateTime":LocalDate.now()})
            .then(function (dbinfo) {
                 rankModel.loadFramDB(gameId).then(function(rtn){
                    if(rtn.code == ErrorCode.ok){
                        let loadUnit = rtn.rankUnit;
                        rankModel.rankMap.set(gameId,loadUnit);
                        rankModel.rank.push(loadUnit)
                        resolve({code:ErrorCode.ok,rankUnit: rankUnit});
                    }else{
                        resolve({code:ErrorCode.db_error});
                    }
                    
                 })
            }).catch(function (res) {
                reject({ code: ErrorCode.db_error, errMsg: res });
            })
        })
       }
    }

    static async loadFramDB(gameId:string):Promise<any>{
        return new Promise<any>(function (resolve, reject) {
            MongodbMoudle.get_database(DBDefine.db).get_unit<{ [key: string]: any }>(DBDefine.col_rank, { _id: gameId }).load().then(function (dbInfo) {
                if (dbInfo.empty) {
                    // 这里需要创角
                    resolve({ code: ErrorCode.rank_not_found });
                }
                else {
                    // 这里ok了
                    let rankUnit = RankUnit.createRankUnit(gameId,dbInfo);
                    resolve({code:ErrorCode.ok,rankUnit:rankUnit})
                }
            }).catch(function (res) {
                // 异常了，这里需要推出
                // console.log(res);
                reject({ code: ErrorCode.db_error, errMsg: res });
            })
        })

    }

    static async getRankList(gameId:string,start:number,end:number){
        let res = [];
        let rankStart = start>this.rank.length?this.rank.length:start
        let rankEnd = end>this.rank.length?this.rank.length:end
        for (let index = rankStart; index < rankEnd; index++) {
            let rankUnit = this.rank[index];
            let rankInfo:RankInfo = {gameId:rankUnit.gameId,score:rankUnit.score,nickName:rankUnit.nickName,exScore:rankUnit.exScore};
            res.push(rankInfo);    
        }
        let myRank = this.getRankInfo(gameId)
        let data = {rankList:res,myRank:myRank}
        return {code:ErrorCode.ok,data:data};
    }

    static getRankInfo(gameId:string){
        let rankUnit = this.rankMap.get(gameId);
        if(!rankUnit){
            return {rank:-1};
        }
        let index =  this.rank.indexOf(rankUnit);
        let rankInfo:RankInfo = {score:rankUnit.score,exScore:rankUnit.exScore,nickName:rankUnit.nickName,gameId:gameId}
        let data = {rank:index,rankinfo:rankInfo}
        return data;
    }

}