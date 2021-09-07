export default class GameData{

    private _uuid: string;
    

    constructor(){

    }
    
    public get uuid(): string {
        return this._uuid;
    }
    public set uuid(value: string) {
        this._uuid = value;
    }

}
var GameData_INS = new GameData();