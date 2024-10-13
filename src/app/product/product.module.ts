import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ButtonModule } from 'primeng/button';
import { ProductRoutingModule } from './product-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/pipes/searchPipe';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    ProductRoutingModule,
    DataViewModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), MessageService
  ]
})
export class ProductModule { }
