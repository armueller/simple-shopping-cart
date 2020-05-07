import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store/cart/cart.reducer';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    let store: MockStore<{ cartState: State }>;
    const initialState: State = { orderItems: [] };
    
    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         imports: [RouterTestingModule],
    //         providers: [provideMockStore({ initialState })],
    //         declarations: [CartComponent]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     store = TestBed.inject(MockStore);

    //     fixture = TestBed.createComponent(CartComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
