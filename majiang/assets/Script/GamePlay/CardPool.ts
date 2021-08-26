import Card from "./Card";

export default class CardPool{
    
    pool:Array<Array<Card>>;

    selectCards:Array<Card>;

    constructor(){
        this.pool = new Array();
        for (let i = 0; i < 4; i++) {
            this.pool.push(new Array());
        }
        this.selectCards = new Array();
    }

    containCard(card:Card):boolean{
      return this.selectCards.indexOf(card)!=-1
    }

    addSelectCard(card:Card){
        if (this.containCard(card)) {
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

}