import { Injectable } from '@angular/core';
import { Cart, CartProduct } from '../models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNullOrUndefined } from '../shared/utils/stringUtils';
import { QUANTITY_UPDATES } from '../shared/utils/constantUtils';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject!: BehaviorSubject<Cart>;

  public cart$!: Observable<Cart>;

  constructor() {
    console.log('cerated');
    
    this.cartSubject = new BehaviorSubject<Cart>(new Cart(1, new Date()));
    this.cart$ = this.cartSubject.asObservable();
  }

  getCart() : Cart{
    // perform http query to get cart by user here
    return this.cartSubject.getValue();
  }

  addProduct(cartProduct : CartProduct){
    const cart = this.getCart();
    let product = cart.products?.find(el => el.productId == cartProduct.productId);
    if(isNullOrUndefined(product)){
      cart.products?.push(cartProduct);
      this.cartSubject.next(cart);
    }
  }

  updateProductQty(productId : Number, updateType : QUANTITY_UPDATES){
    const cart = this.getCart();
    const products = cart.products;
    let product = cart.products.find(product => product.productId == productId);
    if(product){
      product.quantity = updateType == QUANTITY_UPDATES.INCREASE ? 
        (product.quantity + 1) : (product.quantity - 1);
      this.cartSubject.next(cart);
    }

  }

  removeFromCart(productId: Number): void {
    const cart = this.getCart();
    const product = cart.products.find(product => product.productId == productId);
    if(product){
      const productIndex = cart.products.indexOf(product);
      if(productIndex != -1){
        cart.products.splice(productIndex, 1);
        this.cartSubject.next(cart);
      }
    }
  }
}
