import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const CLEAR = 'CLEAR';

export type Actions =
    AddProducts
    | Clear;

export class AddProducts implements Action {
    readonly type = ADD_PRODUCTS;

    constructor(public payload: Product[]) { }
}

export class Clear implements Action {
    readonly type = CLEAR;
}
