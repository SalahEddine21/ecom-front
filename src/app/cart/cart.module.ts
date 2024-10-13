import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartRoutingModule } from './cart-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CartDetailComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    TableModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    SharedModule
  ]
})
export class CartModule { }
