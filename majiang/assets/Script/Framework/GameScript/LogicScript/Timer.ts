export default class LogicTimer{

    tick:(()=>void)

    runTime:number = 0;

    timeInterval:number;

    runCount = 0;

    count = -1;

    status = 0

    owner:any;

    constructor(owner:any,timeInterval:number,tick:()=>void,count?:number){
        this.owner = owner;
        this.timeInterval = timeInterval;
        this.tick = tick;
        if(count){
            this.count = count;
        }
    }

    update(dt:number){
        this.runTime += dt;
        if(this.runTime > this.timeInterval){
            if(this.runCount < this.count || this.count == -1){
                this.runCount ++;
                this.runTime = 0;
                if(this.tick){
                    this.tick.call(this.owner);
                }
            }
        }
    }

}