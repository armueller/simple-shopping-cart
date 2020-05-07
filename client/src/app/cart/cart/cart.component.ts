import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable, of } from 'rxjs';
import { OrderItem } from 'src/app/models/OrderItem';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/cart/cart.reducer';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    isMobile$: Observable<boolean>;
    orderItems$: Observable<OrderItem[]>;

    constructor(
        private router: Router,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private cartStore: Store<{ cartState: State }>) { }

    ngOnInit(): void {
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Cart');
        // this.orderItems$ = this.cartStore.select('cartState').pipe(
        //     map(store => store.orderItems)
        // );
        this.orderItems$ = of([
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
        ]);
    }

    onCheckOut(): void {
        
    }

    onNavToProducts(): void {
        this.router.navigate(['/products']);
    }

}
