import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';
import { ProductService } from './product/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyService } from './shared/services/currency.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProductModule,
    SharedModule,
    CartModule
  ],
  providers: [ProductService, CartService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
