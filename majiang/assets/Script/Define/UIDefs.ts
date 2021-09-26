

/*
 * @Description: 
 * @Author: chenguanhui
 * @Date: 2019-08-13 13:54:36
 * @LastEditors: chenguanhui
 * @LastEditTime: 2019-08-23 10:17:48
 */

/**
* 层级管理
*/
export enum LayerType {

    /**
     * GUI层
     */
    GUI,

    /**
     * 弹出
     */
    Pop,

    /**
     * 提示
     */
    Tip,

    /**
     * 最顶层
     */
    Top
}


/**
 * UI类型定义
 */
export enum UIType {

    $Start,

    /** 二次确认界面 */
    Confirm,

    /** 分享引导 */
    ShareGuide,

    /** 加载 */
    Loading,

    /** 加载 */
    Load,

    /** 结算 */
    Blance,

    /** 复活 */
    Resurrection,

    /** 武器升级 */
    WeaponUp,

    /** 签到 */
    Dily,

    /** 关卡地图 */
    LevelMap,

    /** 玩家升级 */
    PlayerUp,

    /** 登录 */
    Login,

    /** 累计收益 */
    EarningsNode,

    /** 弹窗 */
    CommonTip,

    /** 游戏界面*/
    GameUI,
    $End
}


export class UIDataInfo {

    /**
     * 界面类型 
     */
    public uiType: UIType;

    /**
     * 资源路径
     */
    public uiPath: string;

    /** 屏蔽点击 */
    public preventTouch: boolean = true;

    constructor(uiType: UIType, uiPath: string, preventTouch: boolean = true) {
        this.uiType = uiType;
        this.uiPath = uiPath;
        this.preventTouch = preventTouch;
    }

    /**
     * 获取完整资源 
     */
    public get fullPath(): string {
        var localPath: string = "UIPrefab/";
        return localPath + this.uiPath;
    }

    /**
     * 获取UI的配置信息
     * @param uiType 
     */
    public static getUIData(uiType: UIType): UIDataInfo {
        for (let i = 0; i < this._uiDataList.length; ++i) {
            if (this._uiDataList[i].uiType == uiType) {
                return this._uiDataList[i];
            }
        }
        return null;
    }

    //  #region注册UI界面数据
    private static _uiDataList: Array<UIDataInfo> = [
        new UIDataInfo(UIType.Loading, "Loading",false),
        new UIDataInfo(UIType.Confirm, "common/confirm"),
        new UIDataInfo(UIType.Load, "Load",false),
        new UIDataInfo(UIType.Blance, "Blance",false),
        new UIDataInfo(UIType.Resurrection, "Resurrection",false),
        new UIDataInfo(UIType.Login, "Login",false),
        new UIDataInfo(UIType.WeaponUp, "WeaponUp",false),
        new UIDataInfo(UIType.Dily, "Sign",false),
        new UIDataInfo(UIType.LevelMap, "LevelMap",false),
        new UIDataInfo(UIType.PlayerUp, "PlayerUp",false),
        new UIDataInfo(UIType.EarningsNode, "EarningsNode",false),
        new UIDataInfo(UIType.CommonTip, "CommonTip",false),
        new UIDataInfo(UIType.GameUI, "GameUI", false),        
        
    ]
    //  #region
}