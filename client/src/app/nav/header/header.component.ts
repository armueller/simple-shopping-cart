import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/cart/cart.reducer';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    subscriptions: Subscription;
    isMobile$: Observable<boolean>;
    pageTitle$: Observable<string>;
    numItemsInCart$: Observable<number>;

    constructor(
        private router: Router,
        private sidenavService: SidenavService,
        private screenWidthService: ScreenWidthService,
        private cartStore: Store<{ cartState: State }>) { }

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.pageTitle$ = this.sidenavService.pageTitle$;

        this.numItemsInCart$ = this.cartStore.select('cartState').pipe(
            map(store => store.orderItems.reduce((total, item) => total + item.qty, 0))
        );
    }

    onOpenSideNav(): void {
        this.sidenavService.toggleSideNav();
    }

    onOpenCart(): void {
        this.sidenavService.closeSideNav();
        this.router.navigate(['/cart']);
    }

    onOpenPage(page: string): void {
        this.router.navigate([`/${page}`]);
    }
}
