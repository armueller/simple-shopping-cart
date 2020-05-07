import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/products/products.reducer';
import { Product } from 'src/app/models/Product';
import { AddProducts } from 'src/app/store/products/products.actions';


@Injectable({
    providedIn: 'root'
})
export class ProductsApiService {
    readonly productEndpoint = 'http://localhost:3000/products';
    readonly requestLimit = 5;

    currentPage = 0;

    constructor(
        private http: HttpClient,
        private productStore: Store<{ productsState: State }>) { }

    async getProducts() {
        let params = new HttpParams().set('page', this.currentPage.toString());
        params = params.append('limit', this.requestLimit.toString());

        const products = await this.http.get<Product[]>(this.productEndpoint, { params }).toPromise();
        this.productStore.dispatch(new AddProducts(products));
        this.currentPage += 1;
    }
}
