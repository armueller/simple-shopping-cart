import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/products/products.reducer';
import { Product } from 'src/app/models/Product';
import { AddProducts } from 'src/app/store/products/products.actions';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductsApiService {
    readonly productEndpoint = 'http://0.0.0.0:3000/products';
    readonly requestLimit = 5;

    loadingProducts$ = new BehaviorSubject<boolean>(false);
    loadingError$ = new Subject<HttpErrorResponse>();

    private nextPage = 0;
    private lastPage = -1;

    constructor(
        private http: HttpClient,
        private productStore: Store<{ productsState: State }>) {

        // this.getProducts();
    }

    async getProducts() {
        if (this.nextPage === this.lastPage) {
            return;
        }

        this.loadingProducts$.next(true);
        let params = new HttpParams().set('page', this.nextPage.toString());
        params = params.append('limit', this.requestLimit.toString());

        try {
            const products = await this.http.get<Product[]>(this.productEndpoint, { params }).toPromise();
            this.lastPage = this.nextPage;
            if (products.length > 0) {
                this.nextPage += 1;
            }
            this.productStore.dispatch(new AddProducts(products));
        } catch (error) {
            this.loadingError$.next(error);
        }

        this.loadingProducts$.next(false);
    }

    canLoadMore() {
        return this.nextPage !== this.lastPage;
    }
}
