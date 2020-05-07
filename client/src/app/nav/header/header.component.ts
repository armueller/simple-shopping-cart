import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    subscriptions: Subscription;
    isMobile$: Observable<boolean>;
    pageTitle$: Observable<string>;

    constructor(private router: Router,
                private sidenavService: SidenavService,
                private screenWidthService: ScreenWidthService) { }

    ngOnInit(): void {
        this.subscriptions = new Subscription();
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.pageTitle$ = this.sidenavService.pageTitle$;
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
