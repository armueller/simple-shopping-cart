import * as fromProducts from './products.reducer';
import * as fromActions from './products.actions';
import { Product } from 'src/app/models/Product';

const mockProducts: Product[] = [
    {
        _id: '5eacc0d257d570ddacde193c',
        name: '13 Amp Corded 7-1/4 in. Circular Saw',
        description: '13 Amp motor for cutting a variety of lumber.',
        price: 49.97,
        imgUrl: 'https://images.homedepot-static.com/productImages/4765d0a8-ae24-4d61-bab3-eab8a454667f/svn/ryobi-circular-saws-csb125-64_1000.jpg'
    },
    {
        _id: '5eacc13c57d570ddacde193d',
        name: '13 Amp 10 in. Professional Cast Iron Table Saw',
        description: '13 Amp motor and 30 in. rip capacity make this ideal for jobsites.',
        price: 699,
        imgUrl: 'https://images.homedepot-static.com/productImages/fe07bc9b-db8d-45a5-b517-116bfcaf406a/svn/ridgid-stationary-table-saws-r4520-64_1000.jpg'
    }, {
        _id: '5eacc18a57d570ddacde193e',
        name: '8.5 Amp 1-1/2 Peak HP Fixed Base Router',
        description: 'Die-cast aluminum base offers accuracy and stability.',
        price: 89,
        imgUrl: 'https://images.homedepot-static.com/productImages/f7198b4b-ebbe-43e2-b454-8c0d6687ccaa/svn/ryobi-corded-routers-r1631k-64_1000.jpg'
    }, {
        _id: '5eacc1de57d570ddacde193f',
        name: '18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle',
        description: '600 in./lbs. torque to power through the toughest applications',
        price: 69,
        imgUrl: 'https://images.homedepot-static.com/productImages/9658de57-408c-4741-87c4-d6faad7f844f/svn/ryobi-hammer-drills-p214-64_1000.jpg'
    }
];

describe('Products Reducer', () => {
    it('should have an initial state', () => {
        const intialState = fromProducts.initialState;
        const currentState = fromProducts.productsReducer(undefined, undefined);

        expect(currentState).toBe(intialState);
    });

    it('should add products with AddProducts action', () => {
        const action = new fromActions.AddProducts(mockProducts);
        const currentState = fromProducts.productsReducer(undefined, action);

        expect(currentState.products.length).toEqual(mockProducts.length);
        for (let i = 0; i < mockProducts.length; i++) {
            expect(currentState.products[i]).toBe(mockProducts[i]);
        }
    });

    it('should clear all products with Clear action', () => {
        const addAction = new fromActions.AddProducts(mockProducts);
        let state = fromProducts.productsReducer(undefined, addAction);
        expect(state.products.length).toEqual(mockProducts.length);

        const clearAction = new fromActions.Clear();
        state = fromProducts.productsReducer(state, clearAction);
        expect(state.products.length).toEqual(0);
    });
});


