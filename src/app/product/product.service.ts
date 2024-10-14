import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; 

  constructor(private readonly httpClient : HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCategories() : Observable<String[]> {
    return this.httpClient.get<String[]>(`${this.apiUrl}/products/categories`);
  }
}
