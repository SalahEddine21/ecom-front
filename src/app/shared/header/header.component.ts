import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  items: MenuItem[] = [];
  currencies: any[] = [];
  activeItem: string = '';
  selectedCurrency: any;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.items = [
      { label: 'Products', routerLink: ['/product/list'] },
      { label: 'Cart', routerLink: ['/cart/detail'] },
    ];

    this.activeItem = this.router.url;

    // this.router.events.subscribe((event: any) => {
    //   if (event.url) {
    //     this.activeItem = event.url;
    //   }
    // });

    this.currencies = [
      { label: 'USD ($)', value: 'USD' },
      { label: 'EUR (€)', value: 'EUR' },
      { label: 'GBP (£)', value: 'GBP' }
    ];

    this.selectedCurrency = this.currencies[0];
  }
}
