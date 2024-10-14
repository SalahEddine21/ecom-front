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
import { MenuItem } from 'primeng/api';
import { PaymentCard } from '../../models/payment-card';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit{

  items: MenuItem[] | undefined;
  cart : Cart | undefined;
  allProducts : Product[] = [];
  active : number = 0;
  paymentData! : PaymentCard;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.allProducts = this.route.snapshot.data['products'];
    this.items = [
      {
          label: 'Shopping Cart'
      },
      {
          label: 'Paiement Info'
      },
      {
          label: 'Review'
      }
    ];
  }

  setPayment(payment : PaymentCard){
    this.paymentData = payment;
    this.active = 2;
    console.log(this.paymentData);
  }

  validateCommand(){
    // validate user final command here, and re initialise all saved data (carts, products...)
  }
}
