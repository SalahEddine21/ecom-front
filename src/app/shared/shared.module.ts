import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { CurrencyConversionPipe } from './pipes/currency-conversion.pipe';
import { SearchPipe } from './pipes/searchPipe';



@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyConversionPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    MenubarModule,
    DropdownModule,
    FormsModule
  ],
  providers: [],
  exports : [
    HeaderComponent,
    CurrencyConversionPipe,
    SearchPipe
  ]
})
export class SharedModule { }
