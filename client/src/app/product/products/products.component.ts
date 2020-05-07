import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from 'src/app/dialogs/product-details-dialog/product-details-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/products/products.reducer';
import { map } from 'rxjs/operators';
import { ProductsApiService } from 'src/app/services/api/products-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    isLoading$: BehaviorSubject<boolean>;
    isMobile$: Observable<boolean>;
    products$: Observable<Product[]>;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private productApiService: ProductsApiService,
        private productStore: Store<{ productsState: State }>) { }

    ngOnInit(): void {
        this.isLoading$ = new BehaviorSubject(true);
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Products');
        this.products$ = this.productStore.select('productsState').pipe(
            map(store => store.products)
        );

        this.productApiService.getProducts()
            .then(() => this.isLoading$.next(false))
            .catch((error) => this.showError(error));
    }

    private showError(error: HttpErrorResponse) {
        console.log(error);
        this.snackBar.open('Something went wrong while loading products! Please try again later.', 'Dismiss', {
            duration: 2000,
        });
    }

    onProductClicked(product: Product) {
        this.dialog.open(ProductDetailsDialogComponent, { data: product, autoFocus: false });
    }

}
