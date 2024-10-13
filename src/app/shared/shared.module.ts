import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { CurrencyConversionPipe } from './pipes/currency-conversion.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyConversionPipe
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
    CurrencyConversionPipe
  ]
})
export class SharedModule { }
