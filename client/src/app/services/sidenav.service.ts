import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav: MatSidenav;

    pageTitle$: BehaviorSubject<string>;

    constructor() {
        this.pageTitle$ = new BehaviorSubject('');
    }

    public setSideNavRef(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public toggleSideNav() {
        return this.sidenav.toggle();
    }

    public openSideNav() {
        return this.sidenav.open();
    }

    public closeSideNav() {
        return this.sidenav.close();
    }

    public setPageTitle(title: string) {
        this.pageTitle$.next(title);
    }
}
