import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';

@Component({
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

    constructor(private router: Router,
                private sidenavService: SidenavService) { }

    ngOnInit(): void {
    }

    onOpenPage(page: string): void {
        this.sidenavService.closeSideNav();
        this.router.navigate([`/${page}`]);
    }
}
