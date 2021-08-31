export default class BaseState{

    status:StateStatus =  StateStatus.none;


    update(dt){

    }

    start(){
        this.status = StateStatus.start
    }

    end(){
        this.status = StateStatus.end
    }

    reset(){
        this.status = StateStatus.none
    }

}

export enum StateStatus{
    none="none",
    start = "started",
    running = "running",
    end = "end",


}