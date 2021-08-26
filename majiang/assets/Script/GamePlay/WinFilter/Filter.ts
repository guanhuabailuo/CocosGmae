import Card from "../Card";


const {ccclass, property} = cc._decorator;

@ccclass
export  class Filter{

    check(card_1:Card,card_2:Card,card_3:Card):boolean{
        return false;
    }
}

//peng
@ccclass
export  class ContinuousFilter extends Filter{
    
    check(card_1:Card,card_2:Card,card_3:Card){
        if(!card_1||!card_2||!card_3){
            return false;
        }
        if(card_1.type == card_2.type && card_2.type == card_3.type){
            if(card_1.number == card_2.number && card_2.number == card_3.number){
                return true;
            }
        }
        return false;
    }
}