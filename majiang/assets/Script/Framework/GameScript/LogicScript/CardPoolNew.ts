
import { EventId } from "../../../Define/EventId";
import { CardInfo } from "../../../UI/GamePlayNode";
import { EVENT } from "../../Event/EventMgr";
import { CombTag, ContinuousFilter } from "./FilterNew";


export default class CardPoolNew{
    
    pool:Array<Array<CardInfo>>;

    selectCards:Array<CardInfo>;

    filter:ContinuousFilter;

    size:number;

    length:number;

    wide:number;

    interval:number;

    onAnimation:boolean;


    constructor(size:number){
        this.size = size;
        this.pool = new Array();
        for (let i = 0; i < size; i++) {
            this.pool.push(new Array());
        }
        this.selectCards = new Array();
        this.filter = new ContinuousFilter();
        this.onAnimation = false;
    }

    containCard(card:CardInfo):boolean{
        for (let i = 0; i < this.pool.length; i++) {
            let littelPool = this.pool[i];
            for (let j = 0; j < littelPool.length; j++) {
                let current = littelPool[j];
                if (current == card){
                    return true;
                }
            }
         }
     return false;
    }

    join(card:CardInfo,index?:number){
        let idnex =  Math.floor(index/this.size);
        this.pool[idnex][index - this.size*idnex] = card; 
    }

    addSelectCard(card:CardInfo):boolean{
        if(this.onAnimation){
            return false;
        }
        
        if (this.selectCards.indexOf(card)!=-1) {
            return false;
        }
        
        if(this.selectCards.length == 0){
            this.selectCards.push(card);
            return true;
        }
        if(this.selectCards.length >= 2 ){
            return false;
        }
        let one = this.selectCards[0];
        if(!this.neighbor(one,card)){
            return false;
        }
        this.selectCards.push(card);
        return true;
    }

    neighbor(one:CardInfo,two:CardInfo){
        if(Math.abs(one.poolIndex-two.poolIndex) == 1){
            return true;
        }
        if(Math.abs(one.poolIndex-two.poolIndex) == this.size){
            return true;
        }
        return false;
    }

    canAddSelectCard():boolean{
        return this.selectCards.length < 2;
    }

    canStartExchange():boolean{
        return this.selectCards.length >= 2;
    }


    exchange() {
        let a1,a2,b1,b2;
        let a = this.selectCards[0];
        let b = this.selectCards[1];
        let apoolIndex = a.poolIndex;
        let bpoolIndex = b.poolIndex;
        a.poolIndex = bpoolIndex;
        b.poolIndex = apoolIndex;
        for (let i = 0; i < this.pool.length; i++) {
           let littelPool = this.pool[i];
           for (let j = 0; j < littelPool.length; j++) {
               let current = littelPool[j];
               if (a == current) {
                   a1=i;
                   a2=j;
               }
               if (b == current) {
                b1=i;
                b2=j;
            }
           }
        }
        this.pool[a1][a2] = b;
        this.pool[b1][b2] = a;
        
    }

    debugPrint(){
        console.info("**********")
        for (let i = 0; i < this.size; i++) {
            let info =""
           for (let j = 0; j < this.size; j++) {
               let card = this.pool[i][j];
               if(card){
                info += this.pool[i][j].cardType+this.pool[i][j].number+" "
               }
                
           }
           console.info(info);
        }
    }

    checkComb():CombTag{
        this.debugPrint();
        let needCheckEnd = this.size - 2;
        //横排
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < needCheckEnd; j++) {
                let first  = this.pool[i][j];
                let second = this.pool[i][j+1];
                let third = this.pool[i][j+2];
                let tag1 = this.filter.check(first,second,third);
                if(tag1.win){
                    return tag1;
                }
            }
        }
        //竖排
        for (let i = 0; i < needCheckEnd; i++) {
            for (let j = 0; j <this.size; j++) {
                let first  = this.pool[i][j];
                let second = this.pool[i+1][j];
                let third = this.pool[i+2][j];
                let tag1 = this.filter.check(first,second,third);
                if(tag1.win){
                    return tag1;
                }
            }
        }
        return {win:false};
    }

    remove(cards: CardInfo[]) {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            let idnex =  Math.floor(card.poolIndex/this.size);
            this.pool[idnex][card.poolIndex - this.size*idnex] = undefined; 
        }
    }

    test(){
        let check:boolean = true;
        let change:CardInfo[] = [];
        while(check){
            check = false;
            for (let i = 0; i < this.pool.length-1; i++) {
                let littelPool = this.pool[i];
                for (let j = 0; j < littelPool.length; j++) {
                    let cardInfo = this.pool[i][j];
                    if(cardInfo){
                        let next = this.pool[i+1][j]
                        if(!next){
                            this.pool[i][j] = undefined;
                            this.pool[i+1][j] = cardInfo;
                            cardInfo.poolIndex = (i+1)*this.size+j;
                            check = true;
                            if(change.indexOf(cardInfo)==-1){
                                change.push(cardInfo);
                            }
                        }
                    }
                }
            }
        }
        return change;
    }

    reloadAllCard() {
        let map:Map<number,number[]> = new Map();
        for (let i = 0; i < this.pool.length; i++) {
            let littelPool = this.pool[i];
            for (let j = 0; j < littelPool.length; j++) {
                if(!this.pool[i][j]){
                    let nums = map.get(i);
                    if(nums){
                        nums.push(j);
                    }else{
                        nums = [];
                        nums.push(j);
                        map.set(i,nums);
                    }
                }
            }
        }
         


    }

}