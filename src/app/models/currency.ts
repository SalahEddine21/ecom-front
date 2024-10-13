export class Currency {
    key : string | undefined;
    rate : number;

    constructor(key : string, rate : number){
        this.key = key;
        this.rate = rate;
    }
}