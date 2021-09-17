import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import { CardInfo } from "../UI/GamePlayNode";
import Card from "./Card";
import { ContinuousFilter } from "./WinFilter/Filter";

export default class CardPool{
    
    pool:Array<Array<Card>>;

    selectCards:Array<Card>;

    filter:ContinuousFilter;

    size:number;

    length:number;

    wide:number;

    interval:number;


    constructor(size:number){
        this.size = size;
        this.pool = new Array();
        for (let i = 0; i < size; i++) {
            this.pool.push(new Array());
        }
        this.selectCards = new Array();
        this.filter = new ContinuousFilter();
    }

    containCard(card:Card):boolean{
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

    join(card:Card,index?:number){
        let idnex =  Math.floor(index/this.size);
        this.pool[idnex][index - this.size*idnex] = card; 
    }

    addSelectCard(card:Card){
        if (this.selectCards.indexOf(card)!=-1) {
            return;
        }
        this.selectCards.push(card);
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
        if (a1 != undefined) {
            this.pool[a1][a2] = b;
        }
        if (b1 != undefined) {
            this.pool[b1][b2] = a;
        }
    }

    checkComb():boolean{
        let needCheckEnd = this.size - 2;
        console.info("**********")
        for (let i = 0; i < this.size; i++) {
            let info =""
           for (let j = 0; j < this.size; j++) {
                info += this.pool[i][j].type+this.pool[i][j].number+" "
           }
           console.info(info);
        }


        //横排
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < needCheckEnd; j++) {
                let first  = this.pool[i][j];
                let second = this.pool[i][j+1];
                let third = this.pool[i][j+2];
                let tag1 = this.filter.check(first,second,third);
                if(tag1.win){
                    EVENT.emit(EventId.card_comb,tag1);
                    return true;
                }
                
            }
        }
        console.info(111)
        //竖排
        for (let i = 0; i < needCheckEnd; i++) {
            for (let j = 0; j <this.size; j++) {
                let first  = this.pool[i][j];
                let second = this.pool[i+1][j];
                let third = this.pool[i+2][j];
                let tag1 = this.filter.check(first,second,third);
                if(tag1.win){
                    EVENT.emit(EventId.card_comb,tag1);
                    return true;
                }
               
            }
        }
        return false;
    }

    caculatePosByIndex(index:number){
        let index_x =  Math.floor(index/this.size);
        let index_y = index - this.size*index_x;
        
    }


}