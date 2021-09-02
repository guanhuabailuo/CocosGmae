import { ReHash } from "mx-database";
import { RankInfo } from "../../defines/define";
import NodeCache from "node-cache"
import { LocalDate } from "mx-logger/lib/Time";

export class RankUnit{
    static readonly stdTTL = 15 * 60;
    static rankUnitCache = new NodeCache({ stdTTL: RankUnit.stdTTL, checkperiod: 120, useClones: false });

     /**游戏id这个和 _id绑定 */
     gameId!: string;
     dbInfo!: ReHash<{ [key: string]: (number|string|object) }>;
    static async init() {
        return;
    }

    static setRoleCache(gameId: string, rankUnit: RankUnit) {
        this.rankUnitCache.set<RankUnit>(gameId, rankUnit);
    }

    static getRankUnit(gameId:string):RankUnit{
        let cache =  this.rankUnitCache.get<RankUnit>(gameId)
        if(!cache){
            return null;
        }
         // 重设ttl
         this.rankUnitCache.ttl(gameId, this.stdTTL);
        return cache;
    }

    get nickName():string{
        return this.dbInfo.get("nickName")||"";
    }

    set nickName(v:string){
        this.dbInfo.set("nickName",v);
    }

    get score():number{
        return this.dbInfo.get("score")||0;
    }

    set score(v:number){
        this.dbInfo.set("score",v);
    }

    get exScore():number{
        return this.dbInfo.get("exScore")||0;
    }

    set exScore(v:number){
        this.dbInfo.set("exScore",v);
    }

    get updateTime(){
        return this.dbInfo.get("updateTime")||LocalDate.now();
    }

    set updateTime(v:number){
        this.dbInfo.set("updateTime",v);
    }


    static createRankUnit(gameId:string,dbInfo){
        let rankUnit = new RankUnit();
        rankUnit.dbInfo = dbInfo;
        rankUnit.gameId = gameId;
        return rankUnit;
    }

}