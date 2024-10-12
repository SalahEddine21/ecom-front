import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent,
        resolve: {
          //cancelTaskClosure: CancelTaskClosureResolver
        },
        //canActivate: [CheckBrowserVersionGuard],
    }
    //{ path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [CanDeactivateGuard]
  })
  export class ProductRoutingModule { }