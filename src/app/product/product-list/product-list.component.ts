import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { CartProduct } from '../../models/Cart';
import { MessageService, SelectItem } from 'primeng/api';
import { Currency } from '../../models/currency';
import { CurrencyService } from '../../shared/services/currency.service';
import { ActivatedRoute } from '@angular/router';

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
  currency : Currency;

  constructor(private readonly productService : ProductService,
    private readonly cartService : CartService,
    private readonly currencyService: CurrencyService,
    private readonly messageService: MessageService,
    private readonly route: ActivatedRoute
  ){
    this.currency = this.currencyService.currency;
  }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: 'desc' },
      { label: 'Price Low to High', value: 'asc' }
    ];
    this.setProductsData();
    this.getCategories();

    // catch currency update to update prices
    this.currencyService.currency$.subscribe(() => {
      this.currency = this.currencyService.getCurrency();
    });
  }

  setProductsData(){
    this.products = this.route.snapshot.data['products'];
    this.allProducts = this.products.slice();
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

  handleLayoutChange(event : any){
    this.layout = event.layout;
  }
}
