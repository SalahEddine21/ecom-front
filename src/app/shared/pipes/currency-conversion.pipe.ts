import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../../models/currency';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  transform(amount: number, currencyRate: number): number {
    if(currencyRate){
      return amount * currencyRate;
    }
    return amount;
  }

}
