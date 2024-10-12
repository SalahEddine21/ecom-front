import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpClient : HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.httpClient.get<Product[]>('/api/products');
  }
}
