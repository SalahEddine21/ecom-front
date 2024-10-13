import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    DropdownModule,
    FormsModule
  ],
  providers: [CurrencyService],
  exports : [
    HeaderComponent
  ]
})
export class SharedModule { }
