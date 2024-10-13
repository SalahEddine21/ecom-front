import { RouterModule, Routes } from "@angular/router";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { NgModule } from "@angular/core";
import { productResolverResolver } from "../shared/resolvers/product-resolver.resolver";

const routes: Routes = [
    {
        path: 'detail',
        component: CartDetailComponent,
        resolve: {
          products: productResolverResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CartRoutingModule { }