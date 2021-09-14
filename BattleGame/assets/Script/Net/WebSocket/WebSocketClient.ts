import { RequestCode, ResponseCode } from './Code'

export default class WebSocketClient {
    _port: number
    _host: string
    _status: SocketStatus
    _ws: WebSocket

    _date: Date

    _rtt: number = 150

    _reConnTimer = null as any

    _uuid: string

    onOpen: ((ServerPackage: ServerPackage) => {}) | null

    onClientRegisetred: ((ServerPackage: ServerPackage) => void) | null

    regisetr: (() => void) | null

    listenerMap: Map<ResponseCode, Listner>

    constructor(host: string, port: number, uuid: string) {
        this._uuid = uuid
        this._port = port
        this._host = host
        this._status = SocketStatus.none
        this._date = new Date()
        this.listenerMap = new Map()
    }

    startConn() {
        const that: WebSocketClient = this
        this._ws = new WebSocket('ws://' + this._host + ':' + this._port)
        this._ws.onopen = function (event) {
            that.onopen(event)
        }
        this._ws.onmessage = function (event) {
            that.onmessage(event)
        }
        this._ws.onerror = function (event) {
            that.onerror(event)
        }
        this._ws.onclose = function (event) {
            that.onclose(event)
        }
    }

    onopen(event) {
        console.info('on web socket open:' + event)
        if (this._reConnTimer) {
            clearInterval(this._reConnTimer)
            this._reConnTimer = undefined
        }
        this._status = SocketStatus.connected

        let _package = new ClientPackage(RequestCode.regiset, { uuid: this._uuid })
        this._ws.send(_package.encode())
    }

    onmessage(event) {
        const _package: ServerPackage = new ServerPackage()
        _package.decode(event.data)
        if (_package.code == ResponseCode.ping) {
            this.pong(_package)
            return
        }
        if (_package.code == ResponseCode.regiset) {
            this.onRegisetred(_package)
            return
        }
        let lisner = this.listenerMap.get(_package.code)
        console.info(_package)
        if (lisner) {
            lisner.listner.call(lisner.target, _package)
        } else {
            console.info('消息没有处理的:' + _package.code)
        }
    }
    onRegisetred(_package: ServerPackage) {
        this._status = SocketStatus.regisetred
        if (this.onClientRegisetred) {
            this.onClientRegisetred(_package)
        }
        this.ping()
        setInterval(() => {
            this.ping()
        }, 2*1000)
    }

    pong(_package: ServerPackage) {
        let data = _package.data
        let currentTime = data.clientTime
        //this._rtt = this._date.getTime() - currentTime
    }

    ping() {
        let _package: ClientPackage = new ClientPackage(RequestCode.ping, { clientTime: this._date.getTime() })
        this.sendMessage(_package)
    }

    sendMessage(clientPackage: ClientPackage) {
        if (this._status != SocketStatus.regisetred) {
            console.error('socket 未开启')
            return
        }
        this._ws.send(clientPackage.encode())
    }

    onerror(event) {
        console.info('on web socket error:' + event)
    }

    onclose(event) {
        console.info('on web socket close:' + event)
        this._status = SocketStatus.closed
    }

    addListener(code: ResponseCode, listner: (_package: ServerPackage) => void, target: any) {
        let _lisnter: Listner = { code: code, listner: listner, target: target }
        this.listenerMap.set(code, _lisnter)
    }

    removeListener(code: ResponseCode, listner: (_package: ServerPackage) => void, target: any) {
        this.listenerMap.delete(code)
    }
}

interface Listner {
    code: ResponseCode
    listner: (_package: ServerPackage) => void
    target: any
}

export enum SocketStatus {
    none = 'none',
    connected = 'connected',
    regisetred = 'regisetred',
    closed = 'closed',
}

export class ServerPackage {
    code: number
    data: any
    decode(string) {
        let data = JSON.parse(string)
        this.code = data.code
        this.data = data.data
    }
}

export class ClientPackage {
    constructor(code: number, date: any) {
        this.code = code
        this.data = date
    }
    code: number
    data: any
    encode(): string {
        const packageData = { code: this.code, data: this.data }
        return JSON.stringify(packageData)
    }
}
