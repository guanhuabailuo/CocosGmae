export default class PoolBox{

    size:number;

    length:number;

    wide:number;

    interval:number;

    pos:cc.Vec3[];

    constructor(size:number,length:number,wide:number,interval:number){
        this.size = size;
        this.length = length;
        this.wide = wide;
        this.interval = interval;
        this.pos = [];
    }

    caculatePosByIndex(indexTemp:number):cc.Vec3{
        let index = indexTemp;
        if(this.pos[index]){
            return this.pos[index];
        }
        let index_x =  Math.floor(index/this.size);
        let index_y = index - this.size*index_x;
        let x =  this.length/2 - (this.length/this.size)*(index_x) - 100;
        let y = (this.wide/this.size)*(index_y) - this.wide/2+50;
        this.pos[index] = new cc.Vec3(y,x,0)
        return this.pos[index];
    }

}