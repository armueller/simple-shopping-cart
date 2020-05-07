import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products/products.component';
import { OrdersComponent } from './order/orders/orders.component';
import { CartComponent } from './cart/cart/cart.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'orders',
        component: OrdersComponent,
    },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '/cart' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
