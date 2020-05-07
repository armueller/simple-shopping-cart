import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
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
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
    subscriptions: Subscription;
    isLoading$: Observable<boolean>;
    isMobile$: Observable<boolean>;
    products$: Observable<Product[]>;

    @ViewChild('productsContainer') productsContainerElement: ElementRef;
    @ViewChild('productsList') productsListElement: ElementRef;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private productsApiService: ProductsApiService,
        private productStore: Store<{ productsState: State }>) { }

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.isLoading$ = this.productsApiService.loadingProducts$;
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Products');

        this.products$ = this.productStore.select('productsState').pipe(
            map(store => store.products)
        );

        this.subscriptions.add(this.productsApiService.loadingError$.subscribe((error) => {
            this.showError(error);
        }));
    }

    private showError(error: HttpErrorResponse) {
        console.log(error);
        this.snackBar.open('Something went wrong while loading products! Please try again later.', 'Dismiss', {
            duration: 2000,
        });
    }

    ngAfterViewInit() {
        this.loadMore();
    }

    private async loadMore() {
        // while (this.productsListElement.nativeElement.offsetHeight === 0) {
        //     await this.wait(10);
        //     console.log('waiting...');
        // }
        let productContainerHeight = this.productsContainerElement.nativeElement.offsetHeight;
        let productListHeight = this.productsListElement.nativeElement.offsetHeight;
        let isOverflowing = productListHeight > productContainerHeight;
        while (!isOverflowing && this.productsApiService.canLoadMore()) {
            await this.productsApiService.getProducts();
            productContainerHeight = this.productsContainerElement.nativeElement.offsetHeight;
            productListHeight = this.productsListElement.nativeElement.offsetHeight;
            isOverflowing = productListHeight > productContainerHeight;
        }
    }

    private wait(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            this.productsApiService.getProducts();
        }
    }

    onProductClicked(product: Product) {
        this.dialog.open(ProductDetailsDialogComponent, { data: product, autoFocus: false });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
