import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { CartProduct } from '../../models/Cart';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  allProducts : Product[] = [];
  layout: "list" | "grid" = "list";
  loadingData : boolean = false;
  searchText : string = "";
  sortOptions!: SelectItem[];
  categories : String[] = [];
  sortOrder!: number;
  sortField!: string;

  constructor(private readonly productService : ProductService,
    private readonly cartService : CartService,
    private readonly messageService: MessageService
  ){}

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: 'desc' },
      { label: 'Price Low to High', value: 'asc' }
    ];
    this.getAllproducts();
    this.getCategories();
  }

  getAllproducts(){
    this.loadingData = true;
    this.productService.getProducts().subscribe(resp => {
      this.products = resp;
      this.allProducts = this.products.slice();
      this.loadingData = false;      
    })
  }

  getCategories(){
    this.productService.getCategories().subscribe(resp => {
      this.categories = ['All', ...resp];
    });
  }

  addProduct(product : Product){
    const cartProduct : CartProduct = {
      productId : product.id,
      quantity : 1
    };
    this.cartService.addProduct(cartProduct);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
  }

  onSortChange(event: any) {
    let order = event.value;
    this.products.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }


  filterByCategory(event : any){
    let category = event.value;
    if(category != 'All'){
      this.products = this.allProducts?.filter(el => el.category == category);
    }else{
      this.products = this.allProducts;
    }
  }

}
