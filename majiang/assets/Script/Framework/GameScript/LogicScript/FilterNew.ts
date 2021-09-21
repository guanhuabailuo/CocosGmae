import { CardType } from "../../../Define/Type";
import { CardInfo } from "../../../UI/GamePlayNode";



const { ccclass, property } = cc._decorator;

@ccclass
export class Filter {

    check(card_1: CardInfo, card_2: CardInfo, card_3: CardInfo): CombTag {
        return { win: false };
    }
}

export enum CombType {
    lianzi = "lianzi",
    peng = "peng",
}

export interface CombTag {
    win: boolean;
    cardtype?: CardType;
    winType?: CombType;
    num?: number;
    card?: CardInfo[]
}

@ccclass
export class ContinuousFilter extends Filter {

    check(card_1: CardInfo, card_2: CardInfo, card_3: CardInfo) {
        let tag: CombTag = { win: false };
        if (!card_1 || !card_2 || !card_3) {
            return tag;
        }
        if (card_1.cardType == CardType.dead || card_1.cardType == CardType.empty || card_2.cardType == CardType.dead || card_2.cardType == CardType.empty || card_3.cardType == CardType.dead || card_3.cardType == CardType.empty) {
            return tag;
        }

        if (card_1.cardType != card_2.cardType || card_2.cardType != card_3.cardType) {
            return tag;
        }

        let nums: CardInfo[] = [];
        nums[0] = card_1;
        nums[1] = card_2;
        nums[3] = card_3;

        nums.sort((a, b) => {
            return b.number - a.number;
        })


        if (nums[0].number == nums[1].number && nums[1].number == nums[2].number) {
            tag.card = [];
            tag.win = true;
            tag.cardtype = card_1.cardType;
            tag.winType = CombType.peng;
            tag.num = nums[0].number;
            tag.card[0] = nums[0];
            tag.card[1] = nums[1];
            tag.card[2] = nums[2];
        }

        if (card_1.cardType == CardType.tiao || card_1.cardType == CardType.tong || card_1.cardType == CardType.wan) {
            if (nums[0].number - nums[1].number == 1 && nums[1].number - nums[2].number == 1) {
                tag.win = true;
                tag.card = [];
                tag.cardtype = card_1.cardType;
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

export interface WinTag {
    cardType?: CardType;
}

export enum WinModle {

    qingyise = "qingyise",
    duanyaojiu = "duanyaojiu",
    yibeikou = "yibeikou",
    none = "none",
}

export function getWinName(winModel:WinModle):string{
    switch(winModel){
        case WinModle.qingyise:
            return "清一色";
        case WinModle.duanyaojiu:
            return "断幺九"
        case WinModle.qingyise:
            return "一杯口"
    }
    return "平胡"
}

export function getWinScore(winModel:WinModle):number{
    switch(winModel){
        case WinModle.qingyise:
            return 5000;
        case WinModle.duanyaojiu:
            return 1000;
        case WinModle.qingyise:
            return 1000
    }
    return 1000;
}



export class WinFilter {

    check(tag_1: CombTag, tag_2: CombTag, tag_3: CombTag, tag_4: CombTag): WinModle {

        return WinModle.none;
    }
}

export class qingyiseFilter extends WinFilter {

    check(tag_1: CombTag, tag_2: CombTag, tag_3: CombTag, tag_4: CombTag): WinModle {
        let winTag: WinTag = {}
        if (tag_1.cardtype == tag_2.cardtype && tag_2.cardtype == tag_3.cardtype && tag_3.cardtype == tag_4.cardtype) {
            winTag.cardType = tag_1.cardtype;
            return WinModle.qingyise
        }
        return WinModle.none;
    }
}

export function createArray(tag_1: CombTag, tag_2: CombTag, tag_3: CombTag, tag_4: CombTag){
    let tagArray = [];
    tagArray.push(tag_1);
    tagArray.push(tag_2);
    tagArray.push(tag_3);
    tagArray.push(tag_4);
    return tagArray;
}
export class yibeikou extends WinFilter {

    check(tag_1: CombTag, tag_2: CombTag, tag_3: CombTag, tag_4: CombTag): WinModle {
        let tags =  createArray(tag_1,tag_2,tag_3,tag_4);
        for (let i = 0; i < tags.length; i++) {
            for (let j = i+1; j < tags.length; j++) {
                if(this.checkOneGroup(tags[i],tags[j])){
                    return WinModle.yibeikou
                }
            }
        }
        return WinModle.none;
    }

    checkOneGroup(tag_1:CombTag,tag_2:CombTag){
        if(tag_1.cardtype != tag_2.cardtype){
            return false;
        }
        if(tag_1.winType != tag_2.winType){
            return false;
        }
        if(tag_1.winType != CombType.lianzi){
            return false;
        }
        if(tag_1.num != tag_2 .num){
            return false;
        }
        return true;
    }

}


export class duanyaojiuFilter extends WinFilter {

    check(tag_1: CombTag, tag_2: CombTag, tag_3: CombTag, tag_4: CombTag): WinModle {
        let pass = true;
        pass = pass && this.checkTag(tag_1);
        pass = pass && this.checkTag(tag_2);
        pass = pass && this.checkTag(tag_3);
        pass = pass && this.checkTag(tag_4);
        if (pass) {
            return WinModle.duanyaojiu;
        }
        return WinModle.none;
    }

    checkTag(tag: CombTag): boolean {
        if (tag.cardtype == CardType.zi || tag.cardtype == CardType.feng) {
            return false;
        }
        if (tag.winType == CombType.peng) {
            if (tag.num == 1 || tag.num == 9) {
                return false;
            }
        }

        if (tag.winType == CombType.lianzi) {
            if (tag.num == 2 || tag.num == 8) {
                return false;
            }
        }
        return true;
    }


}
