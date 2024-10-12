import { RouterModule, Routes } from "@angular/router";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'detail',
        component: CartDetailComponent,
        resolve: {
          //cart: CancelTaskClosureResolver
        },
        //canActivate: [CheckBrowserVersionGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [CanDeactivateGuard]
  })
  export class CartRoutingModule { }