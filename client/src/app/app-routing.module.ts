import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrdersComponent } from './order/orders/orders.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { CartComponent } from './cart/cart/cart.component';


const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
        children: [
            { path: ':productId', component: ProductDetailsComponent },
        ]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        children: [
            { path: ':orderId', component: OrderDetailsComponent },
        ]
    },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '/products' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
