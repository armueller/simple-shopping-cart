import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


import { HeaderComponent } from './nav/header/header.component';
import { DrawerComponent } from './nav/drawer/drawer.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrdersComponent } from './order/orders/orders.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { AsyncButtonComponent } from './shared-ui/async-button/async-button.component';
import { ProductListItemComponent } from './product/product-list-item/product-list-item.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DrawerComponent,
        ProductsComponent,
        ProductDetailsComponent,
        OrdersComponent,
        OrderDetailsComponent,
        CartComponent,
        CartItemComponent,
        AsyncButtonComponent,
        ProductListItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
