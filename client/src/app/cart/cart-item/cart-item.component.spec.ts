import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CartItemComponent } from './cart-item.component';
import { State } from 'src/app/store/cart/cart.reducer';

describe('CartItemComponent', () => {
    let component: CartItemComponent;
    let fixture: ComponentFixture<CartItemComponent>;

    let store: MockStore;
    const initialState: State = { orderItems: [] };

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         providers: [provideMockStore({ initialState })],
    //         declarations: [CartItemComponent]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     store = TestBed.inject(MockStore);

    //     fixture = TestBed.createComponent(CartItemComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
