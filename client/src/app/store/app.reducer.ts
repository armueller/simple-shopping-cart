import { ActionReducerMap } from '@ngrx/store';

import * as fromCart from './cart/cart.reducer';
import * as fromOrders from './orders/orders.reducer';
import * as fromProducts from './products/products.reducer';

export interface AppState {
    cartState: fromCart.State;
    ordersState: fromOrders.State;
    productsState: fromProducts.State;
}

export const reducers: ActionReducerMap<AppState> = {
    cartState: fromCart.cartReducer,
    ordersState: fromOrders.ordersReducer,
    productsState: fromProducts.productsReducer,
};
