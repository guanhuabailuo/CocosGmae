import { EventId } from "../Define/EventId";
import { EVENT } from "../Framework/Event/EventMgr";
import Card from "./Card";
import { ContinuousFilter } from "./WinFilter/Filter";

export default class CardPool{
    
    pool:Array<Array<Card>>;

    selectCards:Array<Card>;

    filter:ContinuousFilter;

    constructor(){
        this.pool = new Array();
        for (let i = 0; i < 4; i++) {
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
        let idnex =  Math.floor(index/4);
        if(index == 0){
            console.info(idnex.toString(),(index - 4*idnex).toString())
        }
        this.pool[idnex][index - 4*idnex] = card; 
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
        if (a1) {
            this.pool[a1][a2] = b;
        }
        if (b1) {
            this.pool[b1][b2] = a;
        }
    }

    checkComb(){
        for (let i = 0; i < 4; i++) {
             let littel = this.pool[i];
            for (let j = 0; j < 2; j++) {
                let first = littel[j];
                let sencend = littel[j+1];
                let three = littel[j+2];
                let tag = this.filter.check(first,sencend,three);
                if(tag.win == true){
                    EVENT.emit(EventId.card_comb,tag);
                }
            }            
        }

    }


}