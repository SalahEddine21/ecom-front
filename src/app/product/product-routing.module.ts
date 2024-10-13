import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { productResolverResolver } from "../shared/resolvers/product-resolver.resolver";

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent,
        resolve: {
          products: productResolverResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [CanDeactivateGuard]
  })
  export class ProductRoutingModule { }