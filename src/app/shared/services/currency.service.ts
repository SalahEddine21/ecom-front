import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRateResponse } from '../../models/exchangeRateResponse';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencySubject!: BehaviorSubject<Number>;
  public currency$!: Observable<Number>;
  currencyRate : Number = 1;
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // api USD currency to others

  constructor(private readonly httpClient : HttpClient) {
    this.currencySubject = new BehaviorSubject<Number>(this.currencyRate);
    this.currency$ = this.currencySubject.asObservable();
  }

  updateCurrency(value : Number){
    this.currencySubject.next(value);
  }

  getConversionRates() : Observable<ExchangeRateResponse>{
    return this.httpClient.get<ExchangeRateResponse>(this.apiUrl);
  }
}
