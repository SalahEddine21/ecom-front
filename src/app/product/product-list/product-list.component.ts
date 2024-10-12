import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { CartProduct } from '../../models/Cart';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  layout: "list" | "grid" = "list";
  loadingData : boolean = false;

  constructor(private readonly productService : ProductService,
    private readonly cartService : CartService,
    private readonly messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllproducts();
  }

  getAllproducts(){
    this.loadingData = true;
    this.productService.getProducts().subscribe(resp => {
      this.products = resp;
      this.loadingData = false;      
    })
  }

  addProduct(product : Product){
    const cartProduct : CartProduct = {
      productId : product.id,
      quantity : 1
    };
    this.cartService.addProduct(cartProduct);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
  }
}
