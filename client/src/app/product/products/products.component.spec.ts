import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ProductsComponent', () => {
    let matDialog: MatDialog;
    let sidenavService: SidenavService;
    let screenWidthService: ScreenWidthService;
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [ProductsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        matDialog = TestBed.inject(MatDialog);
        sidenavService = TestBed.inject(SidenavService);
        screenWidthService = TestBed.inject(ScreenWidthService);
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
