import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';


import { HeaderComponent } from './nav/header/header.component';
import { DrawerComponent } from './nav/drawer/drawer.component';
import { ProductsComponent } from './product/products/products.component';
import { OrdersComponent } from './order/orders/orders.component';
import { CartComponent } from './cart/cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ProductListItemComponent } from './product/product-list-item/product-list-item.component';
import { ProductDetailsDialogComponent } from './dialogs/product-details-dialog/product-details-dialog.component';
import { OrderItemCountPipe } from './pipes/order-item-count.pipe';
import { OrderDetailsDialogComponent } from './dialogs/order-details-dialog/order-details-dialog.component';
import { OrderTotalPipe } from './pipes/order-total.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DrawerComponent,
        ProductsComponent,
        OrdersComponent,
        CartComponent,
        CartItemComponent,
        ProductListItemComponent,
        ProductDetailsDialogComponent,
        OrderItemCountPipe,
        OrderDetailsDialogComponent,
        OrderTotalPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatBadgeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
