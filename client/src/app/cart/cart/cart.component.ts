import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    isMobile$: Observable<boolean>;

    constructor(private sidenavService: SidenavService,
                private screenWidthService: ScreenWidthService) { }

    ngOnInit(): void {
        this.isMobile$ = this.screenWidthService.isMobile$;
        this.sidenavService.setPageTitle('Cart');
    }

}
