import { CardType } from "../../Define/Type";
import Card from "../Card";


const {ccclass, property} = cc._decorator;

@ccclass
export  class Filter{

    check(card_1:Card,card_2:Card,card_3:Card):CombTag{
        return {win:false}; 
    }
}

export enum CombType{
    lianzi = "lianzi",
    peng = "peng",
}

export interface CombTag{
    win:boolean;
    cardtype?:CardType;
    winType?:CombType;
    num?:number;
    card?:Card[]
}

@ccclass
export  class ContinuousFilter extends Filter{
    
    check(card_1:Card,card_2:Card,card_3:Card){
        let tag:CombTag = {win:false}; 
        if(!card_1||!card_2||!card_3){
            return tag;
        }

        if(card_1.type != card_2.type || card_2.type != card_3.type){
            return tag;
        }

        let nums:Card[] = [];
        nums[0] = card_1;
        nums[1] = card_2;
        nums[3] = card_3;

        nums.sort((a,b)=>{
            return b.number-a.number;
        })
         
        
        if(nums[0].number == nums[1].number && nums[1].number == nums[2].number){
            tag.card = [];
            tag.win = true;
            tag.cardtype = card_1.type;
            tag.winType = CombType.peng;
            tag.num = nums[0].number;
            tag.card[0] = nums[0];
            tag.card[1] = nums[1];
            tag.card[2] = nums[2];
        }
        
        if(card_1.type == CardType.tiao||card_1.type == CardType.tong||card_1.type == CardType.wan){
            if(nums[0].number-nums[1].number ==  1 && nums[1].number-nums[2].number == 1){
                tag.win = true;
                tag.card = [];
                tag.cardtype = card_1.type;
                tag.winType = CombType.lianzi;
                tag.num = nums[1].number;
                tag.card[0] = nums[0];
                tag.card[1] = nums[1];
                tag.card[2] = nums[2];
            }
        }
        return tag;
    }
}