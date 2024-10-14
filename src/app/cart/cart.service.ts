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
    let cart : Cart = this.getCart();
    this.cartSubject = new BehaviorSubject<Cart>(cart);
    this.cart$ = this.cartSubject.asObservable();
    this.cartSubject.next(cart);

    // Listen to the storage event to synchronize cart changes across tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart' && event.newValue) {
        let cart = JSON.parse(event.newValue);
        this.cartSubject.next(cart);
      }
    });
  }

  /**
   * get current cart value
   * @returns current cart
   */
  getCart() : Cart{
    const cartAsString = localStorage.getItem('cart');
    if(cartAsString){
      return JSON.parse(cartAsString);
    }
    return new Cart(2, new Date());
  }

  notifyCartUpdate(cart : Cart){
    this.cartSubject.next(cart);
  }

  /**
   * called when the using hit the add product to cart button
   * @param cartProduct 
   */
  addProduct(cartProduct : CartProduct){
    const cart = this.getCart();
    let product = cart.products?.find(el => el.productId == cartProduct.productId);
    if(isNullOrUndefined(product)){
      cart.products?.push(cartProduct);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.notifyCartUpdate(cart);
    }
  }

  /**
   * called when the user add/remove quantity's product
   * @param productId 
   * @param updateType 
   */
  updateProductQty(productId : Number, updateType : QUANTITY_UPDATES){
    const cart = this.getCart();
    let product = cart.products.find(product => product.productId == productId);
    if(product){
      product.quantity = updateType == QUANTITY_UPDATES.INCREASE ? 
        (product.quantity + 1) : (product.quantity - 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.notifyCartUpdate(cart);
    }
  }

  /**
   * called when the user remove product from cart
   * @param productId 
   */
  removeFromCart(productId: Number): void {
    const cart = this.getCart();
    const product = cart.products.find(product => product.productId == productId);
    if(product){
      const productIndex = cart.products.indexOf(product);
      if(productIndex != -1){
        cart.products.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.notifyCartUpdate(cart);
      }
    }
  }
}
