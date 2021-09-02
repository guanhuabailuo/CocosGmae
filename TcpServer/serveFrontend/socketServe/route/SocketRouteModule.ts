import { ResponseCode, RequestCode } from "../cede";

var routeMap: {
    [f: number]: {
        target: any;
        value: (param: { [x: string]: any }) => Promise<any>;
    }
} = {};

export var SocketRouteModule = {

    route(code:number):MethodDecorator{
        return(target, name, descriptor)=>{
            routeMap[code] = {
                target: target,
                value: descriptor.value as any,
            } 
        };
    },

    async handler(code:number,params){
        let method = this.getRouteFunc(code,params)
        let res = await method();
        return res;
    },

    getRouteFunc(code: number,params) {
        let routeObj = routeMap[code];
        if (!routeObj) {
            return undefined;
        }
        return routeObj.value.bind(routeObj.target,params)
    },

    

}