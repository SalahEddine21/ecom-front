import { ResolveFn } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { inject } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

export const productResolverResolver: ResolveFn<Observable<Product[]>> = (route, state) => {
  const productService = inject(ProductService);  // Inject the ProductService
  return productService.getProducts();
};
