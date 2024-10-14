import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartRoutingModule } from './cart-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StepsModule } from 'primeng/steps';
import { CartProductComponent } from './cart-detail/cart-product/cart-product.component';
import { InputMaskModule } from 'primeng/inputmask';
import { PaiementInfoComponent } from './cart-detail/paiement-info/paiement-info.component';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaiementReviewComponent } from './cart-detail/paiement-review/paiement-review.component';



@NgModule({
  declarations: [
    CartDetailComponent,
    CartProductComponent,
    PaiementInfoComponent,
    PaiementReviewComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    TableModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    SharedModule,
    StepsModule,
    InputMaskModule,
    CardModule,
    MessageModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule
  ]
})
export class CartModule { }
