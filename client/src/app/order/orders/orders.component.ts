import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from 'src/app/dialogs/order-details-dialog/order-details-dialog.component';

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
        private screenWidthService: ScreenWidthService) { }

    ngOnInit(): void {
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Orders');
        this.orders$ = of([
            {
                _id: '5eacc0d257d570ddacde193c',
                createdAt: new Date('2020-04-17T18:24:00'),
                items: [
                    {
                        product: {
                            _id: '5eacc13c57d570ddacde193d',
                            name: '13 Amp 10 in. Professional Cast Iron Table Saw',
                            description: '13 Amp motor and 30 in. rip capacity make this ideal for jobsites.',
                            price: 699,
                            imgUrl: 'https://images.homedepot-static.com/productImages/fe07bc9b-db8d-45a5-b517-116bfcaf406a/svn/ridgid-stationary-table-saws-r4520-64_1000.jpg'
                        },
                        qty: 1
                    },
                    {
                        product: {
                            _id: '5eacc0d257d570ddacde193c',
                            name: '13 Amp Corded 7-1/4 in. Circular Saw',
                            description: '13 Amp motor for cutting a variety of lumber.',
                            price: 49.97,
                            imgUrl: 'https://images.homedepot-static.com/productImages/4765d0a8-ae24-4d61-bab3-eab8a454667f/svn/ryobi-circular-saws-csb125-64_1000.jpg'
                        },
                        qty: 2
                    }
                ],
                total: 798.94,
            },
            {
                _id: '5eacc0d257d570ddacde1933',
                createdAt: new Date('2020-05-01T13:18:00'),
                items: [
                    {
                        product: {
                            _id: '5eacc1de57d570ddacde193f',
                            name: '18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle',
                            description: '600 in./lbs. torque to power through the toughest applications',
                            price: 69,
                            imgUrl: 'https://images.homedepot-static.com/productImages/9658de57-408c-4741-87c4-d6faad7f844f/svn/ryobi-hammer-drills-p214-64_1000.jpg'
                        },
                        qty: 5
                    }
                ],
                total: 345,
            }]);
    }

    onOpenOrderDetails(order: Order): void {
        this.dialog.open(OrderDetailsDialogComponent, { data: order, autoFocus: false });
    }

}
