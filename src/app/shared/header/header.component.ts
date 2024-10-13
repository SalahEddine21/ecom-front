import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CurrencyService } from '../services/currency.service';
import { ExchangeRateResponse } from '../../models/exchangeRateResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  items: MenuItem[] = [];
  currencies: any[] = [];
  activeItem: string = '';
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

    this.activeItem = this.router.url;

    this.currencies = [
      { label: 'USD ($)', value: 'USD' },
      { label: 'EUR (€)', value: 'EUR' },
      { label: 'MAD (DH)', value: 'MAD' }
    ];

    this.selectedCurrency = this.currencies[0];
    this.getConversionRates();
  }

  getConversionRates(){
    this.currencyService.getConversionRates().subscribe(resp => {
      this.conversionRates = resp;
    });
  }

  changeCurrency(){
    if(this.conversionRates){
      this.currencyService.updateCurrency(this.conversionRates.rates[this.selectedCurrency.value]);
    }
  }
}
