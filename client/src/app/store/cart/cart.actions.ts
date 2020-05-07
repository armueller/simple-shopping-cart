import { Action } from '@ngrx/store';
import { OrderItem } from 'src/app/models/OrderItem';

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_QTY = 'ADD_ITEM_QTY';
export const SUB_ITEM_QTY = 'SUB_ITEM_QTY';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR = 'CLEAR';

export type Actions =
    AddItem
    | AddItemQty
    | SubItemQty
    | RemoveItem
    | Clear;

export class AddItem implements Action {
    readonly type = ADD_ITEM;

    constructor(public payload: OrderItem) { }
}

export class AddItemQty implements Action {
    readonly type = ADD_ITEM_QTY;

    constructor(public payload: { itemIdx: number }) { }
}

export class SubItemQty implements Action {
    readonly type = SUB_ITEM_QTY;

    constructor(public payload: { itemIdx: number }) { }
}

export class RemoveItem implements Action {
    readonly type = REMOVE_ITEM;

    constructor(public payload: { itemIdx: number }) { }
}

export class Clear implements Action {
    readonly type = CLEAR;
}
