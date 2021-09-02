import { MongodbMoudle, ReHash } from "mx-database"
import { DBDefine, ErrorCode, playerContinueInfo, playerDailyInfo } from "../../defines/define"
import NodeCache from "node-cache"
import { LoggerMoudle } from "../../lib/logger"
import { LocalDate } from "mx-tool";
import { TablesService } from "../../lib/tables";

export class UnitRole {

    /**role缓存数据：必须通过封装函数操作缓存数据 */
    static readonly stdTTL = 15 * 60;
    static roleCache = new NodeCache({ stdTTL: UnitRole.stdTTL, checkperiod: 120, useClones: false });

     /**游戏id这个和 _id绑定 */
     gameId!: string;
     dbInfo!: ReHash<{ [key: string]: (string | number | object|playerContinueInfo) }>;

    
     static async init() {
        
        
        return;
    }

    private static setRoleCache(gameId: string, role: UnitRole) {
        this.roleCache.set<UnitRole>(gameId, role);
    }

    // 获取role缓存
    static getRoleCache(gameId: string): UnitRole {
        let cache = this.roleCache.get<UnitRole>(gameId);
        if (!cache) {
            return null;
        }

        // 重设ttl
        this.roleCache.ttl(gameId, this.stdTTL);
        return cache;
    }

    // 删除role缓存
    static delRoleCache(gameId: string) {

        let t_info = UnitRole.getRoleCache(gameId);
        if (!t_info) return false;

        this.roleCache.del(gameId);
        return true;
    }

    // 获取缓存统计信息
    static getCacheStats() {
        return this.roleCache.getStats();
    }

    get(key: string) {
        return this.dbInfo.get(key);
    }

    set(key: string, value: any) {
        this.dbInfo.set(key, value);
    }

    /**玩家id 一个玩家id可能对应多个gameId*/
    get uid(): string {
        return this.dbInfo.get('uid');
    }

    get token(): string {
        return this.dbInfo.get('token');
    }

    get nickName(): string {
        return this.dbInfo.get('nickName') || "";
    }

    set nickName(v: string) {
        this.dbInfo.set('nickName', v || "");
    }

    get avatarUrl(): string {
        return this.dbInfo.get('avatarUrl') || "";
    }

    get isFighting():boolean{
        return this.dbInfo.get('isFighting') || false;
    }

    set isFighting(v){
        this.dbInfo.set('isFighting', v);
    }

    set avatarUrl(v: string) {
        this.dbInfo.set('avatarUrl', v);
    }

    get coin() {
        return this.dbInfo.get('coin') || 0;
    }
    set coin(v) {
        this.dbInfo.set('coin', v);
    }

    get strength() {
        return this.dbInfo.get('strength') || 0;
    }
    set strength(v) {
        this.dbInfo.set('strength', v);
    }

    get updateStrengthTime(){
        return this.dbInfo.get('updateStrengthTime') || LocalDate.now();
    }

    set updateStrengthTime(v){
        this.dbInfo.set('updateStrengthTime', v);
    }

    set maxLevel(v:number){
        this.dbInfo.set("maxLevel",v);
    }

    get maxLevel(){
        return this.dbInfo.get("maxLevel");
    }

    set playerModelId(v:string){
        this.dbInfo.set("modelId",v);
    }

    get playerModelId(){
        return this.dbInfo.get("modelId");
    }

    set playerModels(v:object){
        this.dbInfo.set("models",v);
    }

    get playerModels(){
        return this.dbInfo.get("models");
    }

    set knifeId(v:string){
        this.dbInfo.set("knifeId",v);
    }

    get knifeId(){
        return this.dbInfo.get("knifeId");
    }

    set playerGrade(v:number){
        this.dbInfo.set("playerGrade",v);
    }

    get playerGrade(){
        return this.dbInfo.get("playerGrade");
    }

    set knifeGrade(v:number){
        this.dbInfo.set("knifeGrade",v);
    }

    get knifeGrade(){
        return this.dbInfo.get("knifeGrade");
    }
    
    set currentKnifeGrade(v:number){
        this.dbInfo.set("currentKnifeGrade",v);
    }

    get currentKnifeGrade(){
        return this.dbInfo.get("currentKnifeGrade")||1;
    }


    set currentLevel(v:number){
        this.dbInfo.set("currentLevel",v);
    }

    get currentLevel(){
        return this.dbInfo.get("currentLevel");
    }

    set playerContinueInfo(v:object){
        this.dbInfo.set("playerContinueInfo",v)
    }

    get playerContinueInfo():playerContinueInfo{
        return this.dbInfo.get("playerContinueInfo") as playerContinueInfo
    }
    
    set playerDailyInfo(v:playerDailyInfo){
        this.dbInfo.set("playerDailyInfo",v)
    }

    get playerDailyInfo(){
        return this.dbInfo.get("playerDailyInfo")||this.createPlayerDailyInfo() as playerDailyInfo
    }

    set lastLoginDate(v:number){
        this.dbInfo.set("lastLoginDate",v)
    }

    get lastLoginDate(){
      return  this.dbInfo.get("lastLoginDate")||LocalDate.now();
    }

    calculateContinueReward(){
        let now = LocalDate.now();
        let currentPlayerContinueInfo : playerContinueInfo = this.playerContinueInfo
        let preTime = currentPlayerContinueInfo.startTime;
        let currentAccumulatedTime = currentPlayerContinueInfo.accumulatedTime;
        if(currentAccumulatedTime>=TablesService.getContinueRewardMax()){
            return;
        }
        let timeInterval = Math.floor((now-preTime)/1000);
        let addAccumulatedTime =  timeInterval-currentAccumulatedTime;
        if((addAccumulatedTime+currentAccumulatedTime)>TablesService.getContinueRewardMax()){
            addAccumulatedTime = TablesService.getContinueRewardMax()-currentAccumulatedTime;
        }
        let levelConfig =  TablesService.getLevelConfig(currentPlayerContinueInfo.currentLevel.toString());
        if(levelConfig){
            let addCoin = Math.floor(addAccumulatedTime/TablesService.getContinueRewardTime())*levelConfig.iContinueReward;
            if(currentPlayerContinueInfo.currentLevel != Number(this.maxLevel)){
                currentPlayerContinueInfo.currentLevel = this.maxLevel;
            }
            if(addCoin>0){
                currentPlayerContinueInfo.accumulatedCoin = currentPlayerContinueInfo.accumulatedCoin+addCoin;
                let addTime = addCoin/levelConfig.iContinueReward*TablesService.getContinueRewardTime();
                currentPlayerContinueInfo.accumulatedTime = currentPlayerContinueInfo.accumulatedTime+addTime;
            }
        }
        this.playerContinueInfo = currentPlayerContinueInfo;
    }

    recalcalteStrength(){
        let preTime = this.updateStrengthTime;
        let now =  LocalDate.now();
        let str = this.strength;
        if(str < TablesService.getStrengthRecoverMax()){ //身上体力小于最大体力值,要回复
            let delta = Math.floor(((now - preTime) / 1000 / TablesService.getStrengthRecover()));
            if (delta>0){
                delta = Math.min(delta,TablesService.getStrengthRecoverMax());
                this.strength = str + delta;
                this.updateStrengthTime = now;
            }
        }else{
            this.updateStrengthTime = now;
        }
    }




    /**生成发送给客户端的数据 */
    toClient() {
        let loginInfo = {
            gameId: this.dbInfo.get('_id'),
            nickName : this.nickName,
            avatarUrl : this.avatarUrl,
            strength : this.strength,
            playerModelId : this.playerModelId,
            knifeId : this.knifeId,
            playerGrade : this.playerGrade,
            knifeGrade:this.knifeGrade,
            currentKnifeGrade:this.currentKnifeGrade,
            maxLevel : this.maxLevel,
            coin : this.coin,
            updateStrengthTime : this.updateStrengthTime,
            playerModels:this.playerModels,
            playerContinueInfo:this.playerContinueInfo,
            playerDailyInfo:this.playerDailyInfo
           
        };
        return loginInfo;
    }

    toClientOnlevelSuccess(){
        let data = {
            strength : this.strength,
            maxLevel : this.maxLevel,
            coin : this.coin,
            updateStrengthTime : this.updateStrengthTime,
            playerModels:this.playerModels,
            playerContinueInfo:this.playerContinueInfo
           
        };
        return data;
    }

    toPlayerModelLevelUp(){
        let data = {
            coin : this.coin,
            playerModelId:this.playerModelId,
            playerGrade : this.playerGrade,
            playerModels:this.playerModels,
            currentModelLevel:this.playerModels[this.playerModelId]
        };
        return data;
    }

    toKnifeLevelUp(){
        let data = {
            coin : this.coin,
            knifeId : this.knifeId,
            playerGrade : this.playerGrade,
            playerModels:this.playerModels,
            knifeGrade:this.knifeGrade,
            currentKnifeGrade:this.currentKnifeGrade
        };
        return data;
    }


    toDrawDailyReward(){
        let data = {
            coin : this.coin,
            strength : this.strength,
            playerDailyInfo:this.playerDailyInfo
        };
        return data;
    }

    // 为了后期分布式服务，这里采用回调模式
    static async getRole(gameId: string, token?: string): Promise<{ code: ErrorCode, role: UnitRole }> {
        let roleCache = UnitRole.getRoleCache(gameId);
        if (roleCache) {
            if (token == undefined || roleCache.token == token) {
                return { code: ErrorCode.ok, role: roleCache };
            }
            else {
                throw ({ code: ErrorCode.role_token_error });
            }
        }

        // 重新下载玩家
        return new Promise(function (resolve, reject) {
            MongodbMoudle.get_database(DBDefine.db).get_unit<{ [key: string]: any }>(DBDefine.col_role, { _id: gameId }).load().then(function (dbInfo) {
                if (dbInfo.empty) {
                    // 这里需要创角
                    reject({ code: ErrorCode.role_no });
                }
                else {
                    // 这里ok了
                    UnitRole.createLoad(gameId, dbInfo).then(role => {
                        if (token == undefined || role.token == token) {
                            resolve({ code: ErrorCode.ok, role: UnitRole.getRoleCache(gameId) });
                        }
                        else {
                            reject({ code: ErrorCode.role_token_error });
                        }
                    }).catch(function () {
                        reject({ code: ErrorCode.role_token_error });
                    });

                }
            }).catch(function (res) {
                // 异常了，这里需要推出
                // console.log(res);
                reject({ code: ErrorCode.db_error, errMsg: res });
            })
        })
    }

    /**创建一个对象 */
    private static async createLoad(gameId: string, db: ReHash<{ [key: string]: (string | number | object) }>) {
        let roleCache = UnitRole.getRoleCache(gameId);
        if (roleCache) {
            return roleCache;
        }
        //if (UnitRole.gameIdMap.has(gameId)) return UnitRole.gameIdMap.get(gameId) as UnitRole;
        let role = new UnitRole();
        role.dbInfo = db;
        role.gameId = gameId;

        // 保存到缓存中
        //UnitRole.gameIdMap.set(gameId, role);
        UnitRole.setRoleCache(gameId, role);

        return role;
    }

     /**创建角色流程 */
     static registRole(gameId: string, uid: string, version: string, inviterId: string, nickName: string, avatarUrl: string): Promise<{ code: number, role: UnitRole }> {
        let roleCache = UnitRole.getRoleCache(gameId);
        if (roleCache) {
            throw { code: ErrorCode.role_exist };
        }

        return new Promise(function (resolve, reject) {
            MongodbMoudle.get_database(DBDefine.db)
                .update_insert(DBDefine.col_role, { _id: gameId }, { uid: uid, version: version, updateStrengthTime: LocalDate.now(), lastSaveTime: LocalDate.now(), beneficiaryId: inviterId, nickName: nickName, avatarUrl: avatarUrl,
                })
                .then(function () {
                    UnitRole.getRole(gameId).then((rs) => {

                        // 初始化角色数据
                        UnitRole.initRoleData(gameId);

                        // 保存注册日志
                        // LoggerMoudle.roleRegist(gameId, uid, activityId, inviterId);
                        const sInvite = Object.keys(inviterId).length == 0 ? 2 : 1;
                        //LoggerMoudle.userLoginLog(gameId, "regist", sInvite.toString(), "");

                        resolve(rs);
                    }).catch(reject);
                }).catch(reject)
        })
    }

    /**
     * 初始化玩家数据
     * @param gameId 
     */
     static async initRoleData(gameId: string) {
        let role = UnitRole.getRoleCache(gameId);
        if (role) {
           // todo
           role.coin = 0;
           role.strength = TablesService.getStrengthRecoverMax();
           role.knifeId = "0";
           role.playerModelId = "0";
           role.maxLevel = 0;
           role.currentLevel = 0;
           role.playerGrade = 1;
           role.knifeGrade = 1;
           role.isFighting = false;
           role.playerContinueInfo = {startTime:LocalDate.now(),currentLevel:role.maxLevel,accumulatedCoin:0,accumulatedTime:0}
           role.updateStrengthTime = Date.now();
           role.playerModels = {"0":1}
           role.playerDailyInfo = {day:1,draw:false}
           role.currentKnifeGrade = 1;
        }
    }

    /**
     * 登录事务处理
     *
     * @memberof UnitRole
     */
     public async beforeLogin(inviterId: string) {
       
        // 重置每日数据
        await this.resetDailyData();

        // 保存登录日志
        // LoggerMoudle.roleLogin(this.gameId, this.uid, this.activityId, inviterId);
        const sInvite = Object.keys(inviterId).length == 0 ? 2 : 1;
        //LoggerMoudle.userLoginLog(this.gameId, "login", sInvite.toString(), "");
    }

    // 重置每日数据
    private async resetDailyData() {
        let nowTime: number = LocalDate.now();
        let lastLoginDate = this.lastLoginDate
        let isSameDay =  LocalDate.isDaily(nowTime,lastLoginDate);
        if(!isSameDay){
           this.restDailyReward()
        }
    }

    private restDailyReward(){
        let dailyInfo = this.playerDailyInfo;
        if(!dailyInfo){
            this.createPlayerDailyInfo();
        }
        dailyInfo = this.playerDailyInfo;
        if (dailyInfo.draw){
            let reward =  TablesService.getDailyConfig(dailyInfo.day+1);
            if(reward){
                dailyInfo.day = dailyInfo.day+1;
                dailyInfo.draw = false;
                this.playerDailyInfo = dailyInfo;
            }
        }
    }

    public createPlayerDailyInfo(){
        this.playerDailyInfo = {day:1,draw:false}
        return this.playerDailyInfo;
    }

    /**所有信息 测试用 */
    allInfoTest() {
        let preTime = this.updateStrengthTime;
        let now =  LocalDate.now();
        let str = this.strength;
        if(str < 10){ //身上体力小于10,要回复
            let delta = Math.floor(((now - preTime) / 1000 / 60));
            this.strength = str + delta;
            this.updateStrengthTime = now;
        }

        let infos = {
            gameId: this.dbInfo.get('_id'),
            uid: this.uid,
            nickName: this.nickName,
            avatarUrl: this.avatarUrl,
            coin: this.coin,
            strength:this.strength,
            isFighting: this.isFighting,
            
        };
        return infos;
    }
}