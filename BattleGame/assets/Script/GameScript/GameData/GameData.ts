import { RoomMember } from "../../Net/WebSocket/Code";

export default class GameData{

    private _uuid: string;

    private _roomeDate: RoomData;

    private _roomId: number;
    
    
    
    static INS = new GameData();

    constructor(){

    }

    public get uuid(): string {
        return this._uuid;
    }
    public set uuid(value: string) {
        this._uuid = value;
    }

    public get roomeDate(): RoomData {
        return this._roomeDate;
    }
    public set roomeDate(value: RoomData) {
        this._roomeDate = value;
    }

    public get roomId(): number {
        return this._roomId;
    }
    public set roomId(value: number) {
        this._roomId = value;
    }
}

export interface RoomData {
    members:RoomMember[]
}