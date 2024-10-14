import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CurrencyService } from '../services/currency.service';
import { ExchangeRateResponse } from '../../models/exchangeRateResponse';
import { Currency } from '../../models/currency';
import { environment } from '../../../environments/environment';
import { CURRENCIES } from '../utils/constantUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  items: MenuItem[] = [];
  currencies: any[] = [];
  conversionRates : ExchangeRateResponse | undefined;
  selectedCurrency: any;

  constructor(private readonly router: Router,
    private readonly currencyService : CurrencyService
  ){}

  ngOnInit(): void {
    this.items = [
      { label: 'Products', routerLink: ['/product/list'] },
      { label: 'Cart', routerLink: ['/cart/detail'] },
    ];

    this.currencies = CURRENCIES;

    const currency = this.currencyService.getCurrency();
    this.selectedCurrency = this.currencies.find(el => el.value == currency.key);

    this.getConversionRates();
  }

  getConversionRates(){
    this.currencyService.getConversionRates().subscribe(resp => {
      this.conversionRates = resp;
    });
  }

  changeCurrency(){
    if(this.conversionRates){
      this.currencyService.updateCurrency(new Currency(this.selectedCurrency.value, 
        this.conversionRates.rates[this.selectedCurrency.value]
      ));
    }
  }

  getImagePath(){
    return '/ecom-front/assets/images/';
    // if(environment.production){
    // }else{
    //   return '../../../assets/images/';
    // }
  }
}
