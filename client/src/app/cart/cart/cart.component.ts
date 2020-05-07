import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { OrderItem } from 'src/app/models/OrderItem';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/cart/cart.reducer';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
    subscriptions: Subscription;
    isLoading$: Observable<boolean>;
    isMobile$: Observable<boolean>;
    orderItems$: Observable<OrderItem[]>;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private ordersApiService: OrdersApiService,
        private cartStore: Store<{ cartState: State }>) { }

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.isLoading$ = this.ordersApiService.savingOrder$;
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Cart');

        this.orderItems$ = this.cartStore.select('cartState').pipe(
            map(store => store.orderItems)
        );

        this.subscriptions.add(this.ordersApiService.savingError$.subscribe((error) => {
            this.showError(error);
        }));
    }

    private showError(error: HttpErrorResponse) {
        console.log(error);
        this.snackBar.open('Something went wrong while checking out! Please try again later.', 'Dismiss', {
            duration: 2000,
        });
    }

    onCheckOut() {
        this.ordersApiService.saveNewOrder();
    }

    onNavToProducts(): void {
        this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
