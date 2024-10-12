import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Cart';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../product/product.service';
import { isNullOrUndefined, NOT_FOUND } from '../../shared/utils/stringUtils';
import { QUANTITY_UPDATES } from '../../shared/utils/constantUtils';

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

  constructor(private readonly cartService : CartService,
    private readonly productService : ProductService,
    private readonly cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.getAllproducts();
    this.cartService.cart$.subscribe((cartItems) => {
      this.cart = cartItems;
      this.setCartProducts();
      this.cdr.detectChanges();
    });
  }


  getAllproducts(){
    this.loadingData = true;
    this.productService.getProducts().subscribe(resp => {
      this.allProducts = resp;
      this.setCartProducts();      
      this.loadingData = false;
    })
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
