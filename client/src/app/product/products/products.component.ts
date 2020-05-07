import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from 'src/app/dialogs/product-details-dialog/product-details-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/products/products.reducer';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    isMobile$: Observable<boolean>;
    products$: Observable<Product[]>;

    constructor(
        private dialog: MatDialog,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private productStore: Store<{productsState: State}>) { }

    ngOnInit(): void {
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Products');
        this.products$ = this.productStore.select('productsState').pipe(
            map(store => store.products)
        );
    }

    onProductClicked(product: Product) {
        this.dialog.open(ProductDetailsDialogComponent, { data: product, autoFocus: false });
    }

}
