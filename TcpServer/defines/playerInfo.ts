// 好友信息
export interface playerInfo {
    fid: string;            // 角色id
    name: string;           // 昵称
    avatar: string;         // 头像
    stealTime: number;      // 上次从好友处偷水时间
    createTime: number;     // 关系链创建时间
}