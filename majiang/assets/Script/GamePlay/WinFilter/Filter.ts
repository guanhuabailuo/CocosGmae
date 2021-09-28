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
        if(card_1.type == CardType.dead || card_1.type == CardType.empty || card_2.type == CardType.dead || card_2.type == CardType.empty||card_3.type == CardType.dead || card_3.type == CardType.empty ){
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

export interface WinTag{
    cardType?:CardType;
}

export enum WinModle{

    qingyise="qingyise",
    duanyaojiu = "duanyaojiu",
    none = "none",
}

export function getWinName(winModel:WinModle):string{
    switch(winModel){
        case WinModle.qingyise:
            return "清一色"
    }

    return ""
}



export class WinFilter{

    check(tag_1:CombTag,tag_2:CombTag,tag_3:CombTag,tag_4:CombTag):WinModle{

        return WinModle.none;
    }
}

export class qingyiseFilter extends WinFilter{

    check(tag_1:CombTag,tag_2:CombTag,tag_3:CombTag,tag_4:CombTag):WinModle{
        let winTag:WinTag = {} 
        if(tag_1.cardtype == tag_2.cardtype && tag_2.cardtype == tag_3.cardtype && tag_3.cardtype == tag_4.cardtype){
            winTag.cardType = tag_1.cardtype;
            return WinModle.qingyise
        }
        return WinModle.none;
    }
}

export class duanyaojiuFilter extends WinFilter{

    check(tag_1:CombTag,tag_2:CombTag,tag_3:CombTag,tag_4:CombTag):WinModle{
        let pass = true;
        pass = pass&&this.checkTag(tag_1);
        pass = pass&&this.checkTag(tag_2);
        pass = pass&&this.checkTag(tag_3);
        pass = pass&&this.checkTag(tag_4);
        if(pass){
            return WinModle.duanyaojiu;
        }
        return WinModle.none;
    }

    checkTag(tag:CombTag):boolean{
        if(tag.cardtype == CardType.zi||tag.cardtype == CardType.feng){
            return false;
        }
        if(tag.winType == CombType.peng){
            if(tag.num == 1 || tag.num == 9){
                return false;
            }
        }

        if(tag.winType == CombType.lianzi){
            if(tag.num == 2 || tag.num == 8){
                return false;
            }
        }
        return true;
    }


}
