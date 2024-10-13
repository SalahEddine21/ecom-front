import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRateResponse } from '../../models/exchangeRateResponse';
import { Currency } from '../../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencySubject!: BehaviorSubject<Currency>;
  public currency$!: Observable<Currency>;
  currency : Currency = new Currency('USD', 1);
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // api USD currency to others

  constructor(private readonly httpClient : HttpClient) {
    this.currencySubject = new BehaviorSubject<Currency>(this.currency);
    this.currency$ = this.currencySubject.asObservable();

    window.addEventListener('storage', (event) => {
      if (event.key === 'currency' && event.newValue) {
        let currency = JSON.parse(event.newValue);
        this.currencySubject.next(currency);
      }
    });
  }

  updateCurrency(currency : Currency){
    localStorage.setItem('currency', JSON.stringify(currency));
    this.currencySubject.next(currency);
  }

  getCurrency() : Currency{
    const currencyString = localStorage.getItem('currency');
    if(currencyString){
      return JSON.parse(currencyString);
    }
    return this.currency;
  }

  getConversionRates() : Observable<ExchangeRateResponse>{
    return this.httpClient.get<ExchangeRateResponse>(this.apiUrl);
  }
}
