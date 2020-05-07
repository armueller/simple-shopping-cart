import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/models/OrderItem';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/cart/cart.reducer';
import { SubItemQty, AddItemQty } from 'src/app/store/cart/cart.actions';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
    @Input() orderItem: OrderItem;
    constructor(
        private cartStore: Store<{ cartState: State }>) { }

    ngOnInit(): void {
    }

    onSubtractQty(): void {
        this.cartStore.dispatch(new SubItemQty({productId: this.orderItem.product._id}));
    }
    onAddQty(): void {
        this.cartStore.dispatch(new AddItemQty({productId: this.orderItem.product._id}));
    }
}
