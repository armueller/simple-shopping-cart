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
        this.orderItems$ = this.cartStore.select('cartState').pipe(
            map(store => store.orderItems)
        );
    }

    onCheckOut(): void {
        
    }

    onNavToProducts(): void {
        this.router.navigate(['/products']);
    }

}
