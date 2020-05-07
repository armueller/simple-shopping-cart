import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/orders/orders.reducer';
import { Order } from 'src/app/models/Order';
import { AddOrders } from 'src/app/store/orders/orders.actions';


@Injectable({
    providedIn: 'root'
})
export class OrdersApiService {
    readonly productEndpoint = 'http://localhost:3000/orders';
    readonly requestLimit = 5;

    currentPage = 0;

    constructor(
        private http: HttpClient,
        private ordersStore: Store<{ ordersState: State }>) { }

    async getProducts() {
        let params = new HttpParams().set('page', this.currentPage.toString());
        params = params.append('limit', this.requestLimit.toString());

        const orders = await this.http.get<Order[]>(this.productEndpoint, { params }).toPromise();
        this.ordersStore.dispatch(new AddOrders(orders));
        this.currentPage += 1;
    }
}
