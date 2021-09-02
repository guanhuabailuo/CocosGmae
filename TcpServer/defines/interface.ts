/**
 * auto generate by mx-convert
 */

/**
 * SeEnumBuffeBuffType generate by mx-convert 
 */
export enum SeEnumBuffeBuffType{ 
      YuanChengGongJi=1,
      JianSuXiaoGuo=2,
      ShangHaiWaiXing=3,
      BaoJi=4,
      GeiShouJiDanWeiJiabuffer=5,
      GuaiWuJingJie=6,
      ZhaoHuanGuaiWu=7,
}


/**
 * SeEnumBuffCovereBuffCover generate by mx-convert 
 */
export enum SeEnumBuffCovereBuffCover{ 
      DieJia=1,
      DaZhiQuDai=2,
      XiaoZhiQuDai=3,
}


/**
 * SeEnumItemeType generate by mx-convert 
 */
export enum SeEnumItemeType{ 
      JinBi=0,
      TiLi=1,
}


/**
 * SeEnumLeveleLevelType generate by mx-convert 
 */
export enum SeEnumLeveleLevelType{ 
      PuTongGuanKa=1,
      ZhangAiGuanKa=2,
      TaoZhanGuanKa=3,
      JiangLiGuanKa=4,
      BossGuanKa=5,
}


/**
 * SeEnumLevelUpCosteType generate by mx-convert 
 */
export enum SeEnumLevelUpCosteType{ 
      WaiDao=1,
      JiaoSe=2,
}


/**
 * SeEnumMonstereMonsterType generate by mx-convert 
 */
export enum SeEnumMonstereMonsterType{ 
      BuXieDaiDaoJu=0,
      XieDaiBaoZou=1,
}


/**
 * SeEnumPlayereLockType generate by mx-convert 
 */
export enum SeEnumPlayereLockType{ 
      GuanKaJieSuo=1,
      DengJiJieSuo=2,
}


/**
 * SeResBuff generate by mx-convert 
 */
export interface SeResBuff{ 
      iID:number;
      eBuffType:SeEnumBuffeBuffType;
      aiBuffParam:Array<number>;
      iRef:number;
      iBuffTime:number;
      sBuffAni:string;
      sDec:string;
}


/**
 * SeResBuffCover generate by mx-convert 
 */
export interface SeResBuffCover{ 
      iID:number;
      eBuffCover:SeEnumBuffCovereBuffCover;
      sDec:string;
}


/**
 * SeResDaily generate by mx-convert 
 */
export interface SeResDaily{ 
      iID:number;
      sTitle:string;
      iRewardTime:number;
      aiReward1:Array<number>;
      aiReward2:Array<number>;
      sRewardPic:string;
}


/**
 * SeResGlobal generate by mx-convert 
 */
export interface SeResGlobal{ 
      sId:string;
      sGlobalType:string;
      iGlobalNumber:number;
}


/**
 * SeResItem generate by mx-convert 
 */
export interface SeResItem{ 
      iID:number;
      sName:string;
      eType:SeEnumItemeType;
      iMaxNum:number;
      sDec:string;
      sItemPic:string;
}


/**
 * SeResKnife generate by mx-convert 
 */
export interface SeResKnife{ 
      iID:number;
      sKnifeName:string;
      iLockLevel:number;
      sKnifePrefab:string;
      sKnifeAttack:string;
      sDec:string;
      sKnifePic:string;
}


/**
 * SeResKnifeNum generate by mx-convert 
 */
export interface SeResKnifeNum{ 
      iID:number;
      iKnifeRadius:number;
      iKnifeNums:number;
      iKnifeSpeed:number;
}


/**
 * SeResLevel generate by mx-convert 
 */
export interface SeResLevel{ 
      iID:number;
      sLevelName:string;
      eLevelType:SeEnumLeveleLevelType;
      sLevelPrefab:string;
      sLevelAniPrefab:string;
      aiCameraStart:Array<number>;
      iMonsterNums:number;
      iKillReward:number;
      iWinReward:number;
      iContinueReward:number;
}


/**
 * SeResLevelUpCost generate by mx-convert 
 */
export interface SeResLevelUpCost{ 
      iID:number;
      eType:SeEnumLevelUpCosteType;
      iLevel:number;
      ICost:number;
}


/**
 * SeResMonster generate by mx-convert 
 */
export interface SeResMonster{ 
      iID:number;
      sMonsterName:string;
      eMonsterType:SeEnumMonstereMonsterType;
      sMonsterPic:string;
      iMonsterSpeed:number;
      iScale:number;
      aiBuff:Array<number>;
}


/**
 * SeResMonsterRefresh generate by mx-convert 
 */
export interface SeResMonsterRefresh{ 
      sLevelID:string;
      aiRefreshTime:Array<number>;
      asMonsterID:Array<string>;
      asMonsterNum:Array<string>;
      asMonsterHP:Array<string>;
}


/**
 * SeResPlayer generate by mx-convert 
 */
export interface SeResPlayer{ 
      iID:number;
      sPlayerName:string;
      eLockType:SeEnumPlayereLockType;
      aiLockCondition:Array<number>;
      aiLockParam:Array<number>;
      sPlayerPrefab:string;
      sPlayerAttack:string;
      aiBuff:Array<number>;
      sDec:string;
      sPlayerPic:string;
}


