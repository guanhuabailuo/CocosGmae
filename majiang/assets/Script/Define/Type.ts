export enum CardType{
    empty = "empty",
    dead = "dead",
    wan="wan",
    tong="tong",
    tiao="tiao",
    zi="zi",
    feng="feng",
}

export enum PoolType{
    SendPool = "SendPool",
    GamePool = "GamePool",
    WinPool = "WinPool",
}


export enum GameStatus{
    Start = "start",
    Run = "run",
    gameOver = "gameOver",
}

export enum RoundStep{
    DrawCard = "DrawCard",
    ExchangeCard = "ExchangeCard",
    Check = "Check"
}