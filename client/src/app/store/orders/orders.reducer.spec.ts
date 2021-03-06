import * as fromOrders from './orders.reducer';
import * as fromActions from './orders.actions';
import { Order } from 'src/app/models/Order';

const mockOrders: Order[] = [
    {
        _id: '5eacc0d257d570ddacde193c',
        createdAt: new Date('2020-04-17T18:24:00'),
        items: [
            {
                product: {
                    _id: '5eacc13c57d570ddacde193d',
                    name: '13 Amp 10 in. Professional Cast Iron Table Saw',
                    description: '13 Amp motor and 30 in. rip capacity make this ideal for jobsites.',
                    price: 699,
                    imgUrl: 'https://images.homedepot-static.com/productImages/fe07bc9b-db8d-45a5-b517-116bfcaf406a/svn/ridgid-stationary-table-saws-r4520-64_1000.jpg'
                },
                qty: 1
            },
            {
                product: {
                    _id: '5eacc0d257d570ddacde193c',
                    name: '13 Amp Corded 7-1/4 in. Circular Saw',
                    description: '13 Amp motor for cutting a variety of lumber.',
                    price: 49.97,
                    imgUrl: 'https://images.homedepot-static.com/productImages/4765d0a8-ae24-4d61-bab3-eab8a454667f/svn/ryobi-circular-saws-csb125-64_1000.jpg'
                },
                qty: 2
            }
        ],
        total: 798.94,
    },
    {
        _id: '5eacc0d257d570ddacde1933',
        createdAt: new Date('2020-05-01T13:18:00'),
        items: [
            {
                product: {
                    _id: '5eacc1de57d570ddacde193f',
                    name: '18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle',
                    description: '600 in./lbs. torque to power through the toughest applications',
                    price: 69,
                    imgUrl: 'https://images.homedepot-static.com/productImages/9658de57-408c-4741-87c4-d6faad7f844f/svn/ryobi-hammer-drills-p214-64_1000.jpg'
                },
                qty: 5
            }
        ],
        total: 345,
    },
];

describe('Order Reducer', () => {
    it('should have an initial state', () => {
        const intialState = fromOrders.initialState;
        const currentState = fromOrders.ordersReducer(undefined, undefined);

        expect(currentState).toBe(intialState);
    });

    it('should add orders in decending order by createdAt with AddOrders action', () => {
        const action = new fromActions.AddOrders(mockOrders);
        const currentState = fromOrders.ordersReducer(undefined, action);

        expect(currentState.orders.length).toEqual(mockOrders.length);
        expect(currentState.orders[0].createdAt.getTime()).toBeGreaterThan(currentState.orders[1].createdAt.getTime());
    });

    it('should clear all orders with Clear action', () => {
        const addAction = new fromActions.AddOrders(mockOrders);
        let state = fromOrders.ordersReducer(undefined, addAction);
        expect(state.orders.length).toEqual(mockOrders.length);

        const clearAction = new fromActions.Clear();
        state = fromOrders.ordersReducer(state, clearAction);
        expect(state.orders.length).toEqual(0);
    });
});


