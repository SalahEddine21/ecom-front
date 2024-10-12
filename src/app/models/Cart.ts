export class Cart {
    userId : Number | undefined;
    date : Date | undefined;
    products : CartProduct[] = [];

    constructor(userId : Number, date : Date){
        this.userId = userId;
        this.date = date;
    }
}

export class CartProduct {
    productId : Number | undefined;
    quantity : number = 0;
}