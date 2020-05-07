import { Action } from '@ngrx/store';
import { Order } from 'src/app/models/Order';

export const ADD_ORDERS = 'ADD_ORDERS';
export const CLEAR_ORDERS = 'CLEAR_ORDERS';

export type Actions =
    AddOrders
    | Clear;

export class AddOrders implements Action {
    readonly type = ADD_ORDERS;

    constructor(public payload: Order[]) { }
}

export class Clear implements Action {
    readonly type = CLEAR_ORDERS;
}
