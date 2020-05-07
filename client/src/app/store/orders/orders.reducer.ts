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
            return {
                ...state,
                orders: state.orders.concat(action.payload)
            };
        case fromActions.CLEAR:
            return initialState;
        default:
            return state;
    }
}
