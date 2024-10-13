import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { Currency } from '../../models/currency';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnChanges {

  @Input()
  products! : Product[];

  @Input()
  currency! : Currency;

  @Input()
  layout! : string;

  @Output()
  addProductEvent = new EventEmitter<Product>();

  constructor(private readonly cdr : ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currency']){
      this.currency = changes['currency'].currentValue;
      this.cdr.detectChanges();
    }
    if(changes['layout']){
      this.layout = changes['layout'].currentValue;
      this.cdr.detectChanges();
    }
  }

  addProduct(product : Product){
    return this.addProductEvent.emit(product);
  }
}
