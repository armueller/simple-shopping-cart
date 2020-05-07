import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { ProductsComponent } from './products.component';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as fromProduct from 'src/app/store/products/products.reducer';
import { Product } from 'src/app/models/Product';

describe('ProductsComponent', () => {
    let matDialog: MatDialog;
    let sidenavService: SidenavService;
    let screenWidthService: ScreenWidthService;

    let store: MockStore;
    let mockProductsSelector: MemoizedSelector<fromProduct.State, Product[]>;
    // const initialState: fromProduct.State = { products: [] };

    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         imports: [MatDialogModule],
    //         providers: [provideMockStore()],
    //         declarations: [ProductsComponent]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     matDialog = TestBed.inject(MatDialog);
    //     sidenavService = TestBed.inject(SidenavService);
    //     screenWidthService = TestBed.inject(ScreenWidthService);

    //     store = TestBed.inject(MockStore);
    //     mockProductsSelector = store.overrideSelector('productsState', []);
    //     fixture = TestBed.createComponent(ProductsComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
