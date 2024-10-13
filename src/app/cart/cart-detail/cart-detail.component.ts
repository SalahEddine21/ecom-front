import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Cart';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../product/product.service';
import { isNullOrUndefined, NOT_FOUND } from '../../shared/utils/stringUtils';
import { QUANTITY_UPDATES } from '../../shared/utils/constantUtils';
import { CurrencyPipe } from '@angular/common';
import { CurrencyService } from '../../shared/services/currency.service';
import { Currency } from '../../models/currency';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit{

  cart : Cart | undefined;
  products : Product[] = [];
  allProducts : Product[] = [];
  loadingData : boolean = false;
  QUANTITY_UPDATES = QUANTITY_UPDATES;
  currency : Currency;

  constructor(private readonly cartService : CartService,
    private readonly currencyService: CurrencyService,
    private readonly cdr : ChangeDetectorRef,
    private readonly route: ActivatedRoute
  ) {
    this.currency = this.currencyService.currency;
  }

  ngOnInit(): void {
    this.getAllproducts();
    this.cartService.cart$.subscribe(() => {
      this.cart = this.cartService.getCart();
      this.setCartProducts();
      this.cdr.detectChanges();
    });

    this.currencyService.currency$.subscribe(() => {
      this.currency = this.currencyService.getCurrency();
    });
  }


  getAllproducts(){
    this.allProducts = this.route.snapshot.data['products'];
    this.setCartProducts();      
  }

  setCartProducts() {
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
}
