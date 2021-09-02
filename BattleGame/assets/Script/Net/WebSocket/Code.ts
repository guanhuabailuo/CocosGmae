export  enum RequestCode{
    ping = 1,
    regiset = 2,

    createRome = 3,
    joinRome = 4,


    RomeTick = 100,
}


export enum ResponseCode {
    ping = 10001,
    regiset = 10002,
    createRome = 10003,

    RomeTick = 10100,

    //广播段
    room_member_bordcast = 30001,

    error = 99999,
}


export interface RoomMember{
    name:string
    uuid?:string
}