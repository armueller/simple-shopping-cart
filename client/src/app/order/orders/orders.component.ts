import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from 'src/app/dialogs/order-details-dialog/order-details-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/orders/orders.reducer';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    isMobile$: Observable<boolean>;
    orders$: Observable<Order[]>;

    constructor(
        private dialog: MatDialog,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private ordersStore: Store<{ordersState: State}>) { }

    ngOnInit(): void {
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Orders');
        this.orders$ = of([]);
        this.orders$ = this.ordersStore.select('ordersState').pipe(
            map(state => state.orders)
        );
    }

    onOpenOrderDetails(order: Order): void {
        this.dialog.open(OrderDetailsDialogComponent, { data: order, autoFocus: false });
    }

}
