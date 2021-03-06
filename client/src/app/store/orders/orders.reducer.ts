import * as fromActions from './orders.actions';
import { Order } from '../../models/Order';

export interface State {
    orders: Order[];
}

export const initialState: State = {
    orders: [],
};

export function ordersReducer(state = initialState, action: fromActions.Actions): State {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case fromActions.ADD_ORDERS:
            const newOrders = state.orders.concat(action.payload);
            newOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return {
                ...state,
                orders: newOrders
            };
        case fromActions.CLEAR_ORDERS:
            return initialState;
        default:
            return state;
    }
}
