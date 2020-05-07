import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from 'src/app/dialogs/order-details-dialog/order-details-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/orders/orders.reducer';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersApiService } from 'src/app/services/api/orders-api.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
    subscriptions: Subscription;
    isLoading$: Observable<boolean>;
    isMobile$: Observable<boolean>;
    orders$: Observable<Order[]>;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private ordersApiService: OrdersApiService,
        private ordersStore: Store<{ ordersState: State }>) { }

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.isLoading$ = this.ordersApiService.loadingOrders$;
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Orders');

        this.orders$ = this.ordersStore.select('ordersState').pipe(
            map(state => state.orders)
        );

        this.subscriptions.add(this.ordersApiService.loadingError$.subscribe((error) => {
            this.showError(error);
        }));
    }

    private showError(error: HttpErrorResponse) {
        console.log(error);
        this.snackBar.open('Something went wrong while loading orders! Please try again later.', 'Dismiss', {
            duration: 2000,
        });
    }

    onOpenOrderDetails(order: Order): void {
        this.dialog.open(OrderDetailsDialogComponent, { data: order, autoFocus: false });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
