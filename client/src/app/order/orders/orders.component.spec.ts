import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { OrdersComponent } from './orders.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { OrderItemCountPipe } from 'src/app/pipes/order-item-count.pipe';

describe('OrdersComponent', () => {
    let matDialog: MatDialog;
    let sidenavService: SidenavService;
    let screenWidthService: ScreenWidthService;

    let store: MockStore;
    const initialState = { orders: [] };

    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         imports: [MatDialogModule],
    //         providers: [OrderItemCountPipe, provideMockStore({ initialState })],
    //         declarations: [OrderItemCountPipe, OrdersComponent]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     matDialog = TestBed.inject(MatDialog);
    //     sidenavService = TestBed.inject(SidenavService);
    //     screenWidthService = TestBed.inject(ScreenWidthService);

    //     TestBed.inject(OrderItemCountPipe);
    //     store = TestBed.inject(MockStore);
        
    //     fixture = TestBed.createComponent(OrdersComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
