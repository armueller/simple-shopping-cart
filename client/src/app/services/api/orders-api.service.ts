import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { State as OrdersState } from 'src/app/store/orders/orders.reducer';
import { State as CartState } from 'src/app/store/cart/cart.reducer';
import { Order } from 'src/app/models/Order';
import { AddOrders } from 'src/app/store/orders/orders.actions';
import { Clear } from 'src/app/store/cart/cart.actions';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class OrdersApiService {
    readonly ordersEndpoint = 'http://localhost:3000/orders';
    readonly requestLimit = 5;

    loadingOrders$ = new BehaviorSubject<boolean>(false);
    loadingError$ = new Subject<HttpErrorResponse>();

    savingOrder$ = new BehaviorSubject<boolean>(false);
    savingError$ = new Subject<HttpErrorResponse>();

    private nextPage = 0;
    private lastPage = -1;

    constructor(
        private http: HttpClient,
        private ordersStore: Store<{ ordersState: OrdersState }>,
        private cartStore: Store<{ cartState: CartState }>) {

        // this.getOrders();
    }

    async getOrders() {
        if (this.nextPage === this.lastPage) {
            return;
        }

        this.loadingOrders$.next(true);

        let params = new HttpParams().set('page', this.nextPage.toString());
        params = params.append('limit', this.requestLimit.toString());

        try {
            const orders = await this.http.get<Order[]>(this.ordersEndpoint, { params }).toPromise();
            this.lastPage = this.nextPage;
            if (orders.length > 0) {
                this.nextPage += 1;
            }
            this.ordersStore.dispatch(new AddOrders(orders));
        } catch (error) {
            this.loadingError$.next(error);
        }
        this.loadingOrders$.next(false);
    }

    async saveNewOrder() {
        this.savingOrder$.next(true);

        try {
            const orderItems = await this.getFormattedOrderItems();
            const order = await this.http.post<Order>(this.ordersEndpoint, { orderItems }).toPromise();
            this.ordersStore.dispatch(new AddOrders([order]));
            this.cartStore.dispatch(new Clear());
        } catch (error) {
            this.savingError$.next(error);
        }

        this.savingOrder$.next(false);
    }

    private getFormattedOrderItems(): Promise<{ productId: string, qty: number }[]> {
        return new Promise((resolve) => {
            this.cartStore.select('cartState').pipe(
                map(store => store.orderItems),
                map(orderItems => orderItems.map(item => ({ productId: item.product._id, qty: item.qty }))),
                take(1),
            ).subscribe(orderItems => {
                resolve(orderItems);
            });
        });
    }

    canLoadMore() {
        return this.nextPage !== this.lastPage;
    }
}
