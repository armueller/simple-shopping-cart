import * as fromCart from './cart.reducer';
import * as fromActions from './cart.actions';
import { Order } from 'src/app/models/Order';


describe('Cart Reducer', () => {
    it('should have an initial state', () => {
        const intialState = fromCart.initialState;
        const currentState = fromCart.cartReducer(undefined, undefined);

        expect(currentState).toBe(intialState);
    });

    describe('AddItem Action', () => {
        it('should add items to cart', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            expect(state.orderItems.length).toEqual(2);
            expect(state.orderItems[0].product._id).toEqual('5eacc0d257d570ddacde193c');
            expect(state.orderItems[0].qty).toEqual(1);
            expect(state.orderItems[1].product._id).toEqual('5eacc0d257d570ddacde193d');
            expect(state.orderItems[1].qty).toEqual(2);
        });

        it('should add quantities if item being added to cart already exists in cart', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            expect(state.orderItems.length).toEqual(1);
            expect(state.orderItems[0].product._id).toEqual('5eacc0d257d570ddacde193c');
            expect(state.orderItems[0].qty).toEqual(3);
        });
    });

    describe('AddItemQty Action', () => {
        it('should add 1 to item quantity at index', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            state = fromCart.cartReducer(state, addItemAction);

            let addItemQtyAction = new fromActions.AddItemQty({ itemIdx: 0 });
            state = fromCart.cartReducer(state, addItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(2);
            expect(state.orderItems[1].qty).toEqual(1);

            addItemQtyAction = new fromActions.AddItemQty({ itemIdx: 1 });
            state = fromCart.cartReducer(state, addItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(2);
            expect(state.orderItems[1].qty).toEqual(2);
        });

        it('should do nothing if index is out of bounds', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            state = fromCart.cartReducer(state, addItemAction);

            let addItemQtyAction = new fromActions.AddItemQty({ itemIdx: -1 });
            state = fromCart.cartReducer(state, addItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(1);
            expect(state.orderItems[1].qty).toEqual(1);

            addItemQtyAction = new fromActions.AddItemQty({ itemIdx: 10 });
            state = fromCart.cartReducer(state, addItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(1);
            expect(state.orderItems[1].qty).toEqual(1);
        });
    });

    describe('SubItemQty Action', () => {
        it('should subtract 1 from item quantity at index', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let subItemQtyAction = new fromActions.SubItemQty({ itemIdx: 0 });
            state = fromCart.cartReducer(state, subItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(1);
            expect(state.orderItems[1].qty).toEqual(2);

            subItemQtyAction = new fromActions.SubItemQty({ itemIdx: 1 });
            state = fromCart.cartReducer(state, subItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(1);
            expect(state.orderItems[1].qty).toEqual(1);
        });

        it('should do nothing if index is out of bounds', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let subItemQtyAction = new fromActions.SubItemQty({ itemIdx: -1 });
            state = fromCart.cartReducer(state, subItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(2);
            expect(state.orderItems[1].qty).toEqual(2);

            subItemQtyAction = new fromActions.SubItemQty({ itemIdx: 10 });
            state = fromCart.cartReducer(state, subItemQtyAction);
            expect(state.orderItems[0].qty).toEqual(2);
            expect(state.orderItems[1].qty).toEqual(2);
        });

        it('should remove item from cart at index if item quantity at index is 1', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 1
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let subItemQtyAction = new fromActions.SubItemQty({ itemIdx: 0 });
            state = fromCart.cartReducer(state, subItemQtyAction);
            expect(state.orderItems.length).toEqual(1);
            expect(state.orderItems[0].qty).toEqual(2);
            expect(state.orderItems[0].product._id).toEqual('5eacc0d257d570ddacde193d');
        });
    });

    describe('RemoveItem Action', () => {
        it('should remove item from cart at index', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let removeItemAction = new fromActions.RemoveItem({ itemIdx: 0 });
            state = fromCart.cartReducer(state, removeItemAction);
            expect(state.orderItems.length).toEqual(1);
            expect(state.orderItems[0].product._id).toEqual('5eacc0d257d570ddacde193d');
        });

        it('should do nothing if index is out of bounds', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let removeItemAction = new fromActions.RemoveItem({ itemIdx: -1 });
            state = fromCart.cartReducer(state, removeItemAction);
            expect(state.orderItems.length).toEqual(2);

            removeItemAction = new fromActions.RemoveItem({ itemIdx: 10 });
            state = fromCart.cartReducer(state, removeItemAction);
            expect(state.orderItems.length).toEqual(2);
        });
    });

    describe('Clear Action', () => {
        it('should reset state to initial state', () => {
            let addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            let state = fromCart.cartReducer(undefined, addItemAction);

            addItemAction = new fromActions.AddItem({
                product: {
                    _id: '5eacc0d257d570ddacde193d',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: null
                },
                qty: 2
            });
            state = fromCart.cartReducer(state, addItemAction);

            let clearAction = new fromActions.Clear();
            state = fromCart.cartReducer(state, clearAction);
            expect(state.orderItems.length).toEqual(0);
        });
    });
});


