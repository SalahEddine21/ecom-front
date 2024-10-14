import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { CartService } from '../../cart.service';
import { CurrencyService } from '../../../shared/services/currency.service';
import { Currency } from '../../../models/currency';
import { Cart } from '../../../models/Cart';
import { isNullOrUndefined, NOT_FOUND } from '../../../shared/utils/stringUtils';
import { QUANTITY_UPDATES } from '../../../shared/utils/constantUtils';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent implements OnInit{

  @Input()
  allProducts : Product[] = [];

  @Output()
  nextEvent = new EventEmitter();

  products : Product[] = [];
  cart : Cart | undefined;
  currency : Currency;
  QUANTITY_UPDATES = QUANTITY_UPDATES;

  constructor(private readonly cartService : CartService,
    private readonly currencyService: CurrencyService,
    private readonly cdr : ChangeDetectorRef
  ){
      this.currency = this.currencyService.currency;
  }

  ngOnInit(): void {
    this.setCartProducts();

    // catch cart update event in other tabs
    this.cartService.cart$.subscribe(() => {
      this.cart = this.cartService.getCart();
      this.setCartProducts();
      this.cdr.detectChanges();
    });

    // catch the currency event changes
    this.currencyService.currency$.subscribe(() => {
      this.currency = this.currencyService.getCurrency();
    });
  }

  setCartProducts() {
    // selecting products added in cart from list of all products
    if (this.cart && this.cart.products.length > 0) {
      let cartProductIds: (Number | undefined)[] = this.cart.products.map(p => p.productId);
      if (!isNullOrUndefined(cartProductIds)) {
        this.products = this.allProducts.filter(el => cartProductIds.indexOf(el.id) != NOT_FOUND);
      }
    }else{
      this.products = [];
    }
  }

  getProductQty(productId : Number){
    let product = this.cart?.products.find(el => el.productId == productId);
    return product?.quantity;
  }

  updateQty(productId : Number, updateType : QUANTITY_UPDATES){
    this.cartService.updateProductQty(productId, updateType);
  }

  removeProduct(productId : Number){
    this.cartService.removeFromCart(productId);
  }

  goToNextTab(){
    this.nextEvent.emit();
  }
}
