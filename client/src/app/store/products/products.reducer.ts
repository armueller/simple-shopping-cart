import * as fromActions from './products.actions';
import { Product } from '../../models/Product';

export interface State {
    products: Product[];
}

export const initialState: State = {
    products: [],
};

export function productsReducer(state = initialState, action: fromActions.Actions): State {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case fromActions.ADD_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(action.payload)
            };
        case fromActions.CLEAR_PRODUCTS:
            return initialState;
        default:
            return state;
    }
}
