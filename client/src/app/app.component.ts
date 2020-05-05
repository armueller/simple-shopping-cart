import { Component, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { ScreenWidthService } from './services/screen-width.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('sidenav') public sidenav: MatSidenav;

    constructor(private sidenavService: SidenavService,
                private screenWidthService: ScreenWidthService) {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidthService.setWidth(event.target.innerWidth);
    }

    ngAfterViewInit() {
        this.sidenavService.setSideNavRef(this.sidenav);
    }
}
