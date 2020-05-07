import * as fromActions from './cart.actions';
import { OrderItem } from '../../models/OrderItem';

export interface State {
    orderItems: OrderItem[];
}

export const initialState: State = {
    orderItems: [],
};

export function cartReducer(state = initialState, action: fromActions.Actions): State {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case fromActions.ADD_ITEM:
            return handleAddItem(state, action.payload);
        case fromActions.ADD_ITEM_QTY:
            return handleAddItemQty(state, action.payload.productId);
        case fromActions.SUB_ITEM_QTY:
            return handleSubItemQty(state, action.payload.productId);
        case fromActions.REMOVE_ITEM:
            return handleRemoveItem(state, action.payload.productId);
        case fromActions.CLEAR:
            return initialState;
        default:
            return state;
    }
}

function handleAddItem(state: State, newItem: OrderItem): State {
    const existingItemIdx = state.orderItems.findIndex((item) => item.product._id === newItem.product._id);
    if (existingItemIdx !== -1) {
        const newQty = state.orderItems[existingItemIdx].qty + newItem.qty;

        const newOrderItems = [...state.orderItems];
        newOrderItems[existingItemIdx] = new OrderItem(state.orderItems[existingItemIdx].product, newQty);
        state = {
            ...state,
            orderItems: newOrderItems
        };
    } else {
        state = {
            ...state,
            orderItems: [...state.orderItems, newItem]
        };
    }
    return state;
}

function handleAddItemQty(state: State, productId: string): State {
    const orderItemIdx = state.orderItems.findIndex(item => item.product._id === productId);
    if (orderItemIdx !== -1) {
        const newQty = state.orderItems[orderItemIdx].qty + 1;

        const newOrderItems = [...state.orderItems];
        newOrderItems[orderItemIdx] = new OrderItem(state.orderItems[orderItemIdx].product, newQty);
        state = {
            ...state,
            orderItems: newOrderItems
        };
    }
    return state;
}

function handleSubItemQty(state: State, productId: string): State {
    const orderItemIdx = state.orderItems.findIndex(item => item.product._id === productId);
    if (orderItemIdx !== -1) {
        const newQty = state.orderItems[orderItemIdx].qty - 1;

        const newOrderItems = [...state.orderItems];
        newOrderItems[orderItemIdx] = new OrderItem(state.orderItems[orderItemIdx].product, newQty);
        state = {
            ...state,
            orderItems: newOrderItems.filter(item => item.qty > 0)
        };
    }
    return state;
}

function handleRemoveItem(state: State, productId: string): State {
    return {
        ...state,
        orderItems: state.orderItems.filter(item => item.product._id !== productId)
    };
}
