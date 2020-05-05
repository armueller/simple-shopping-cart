/* eslint-disable no-undef */

const { expect, assert } = require('chai');
const sinon = require('sinon');
const dbHelper = require('../../helpers/database');
const { Product } = require('../../models/product');
const { Order } = require('../../models/order');

describe('Order Model', () => {
    describe('Find order by order id', () => {
        it('should throw an error if not connected to Mongodb', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.throws(new Error('MongoDB not connected!'));

            try {
                await Order.findOneById('507f1f77bcf86cd799439011');
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('MongoDB not connected!');
            }
        });

        it('should throw an error if the order id does not exist', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    findOne: async () => undefined
                })
            });

            try {
                await Order.findOneById('507f1f77bcf86cd799439011');
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('Order with id 507f1f77bcf86cd799439011 not found');
            }
        });

        it('should return the order object with the given id', async () => {
            const order = {
                _id: '507f1f77bcf86cd799439011',
                createdAt: new Date(),
                items: [
                    {
                        _id: '507f1f77bcf86cd799439012',
                        name: 'Product',
                        description: 'test description',
                        price: 9.99,
                        imgUrl: null,
                    }
                ],
                total: 9.99,
            };

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    findOne: async () => order
                })
            });

            const o = await Order.findOneById('507f1f77bcf86cd799439011');
            expect(o).to.eql(new Order(order));
        });

        afterEach(function () {
            if (dbHelper.getDb.restore) {
                dbHelper.getDb.restore();
            }
        });
    });

    describe('Find orders', () => {
        it('should throw an error if not connected to Mongodb', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.throws(new Error('MongoDB not connected!'));

            try {
                await Order.find(2, 0);
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('MongoDB not connected!');
            }
        });

        it('should return an empty list if no orders are found', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: () => ({
                            limit: () => ({
                                toArray: async () => []
                            })
                        })
                    })
                })
            });

            const order = await Order.find(2, 0);
            expect(order).to.be.an('Array');
            expect(order.length).to.equal(0);
        });

        it('should return 5 orders if limit is not supplied or invalid', async () => {
            const orders = makeDummyOrders();

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => orders.slice(skipNum, skipNum + limit)
                            })
                        })
                    })
                })
            });

            let foundOrders = await Order.find(-2, 0);
            expect(foundOrders.length).to.equal(5);

            foundOrders = await Order.find(0, 0);
            expect(foundOrders.length).to.equal(5);
        });

        it('should return the number of orders given by limit at page 0 if page is not supplied or invalid', async () => {
            const orders = makeDummyOrders();

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => orders.slice(skipNum, skipNum + limit)
                            })
                        })
                    })
                })
            });

            let foundOrders = await Order.find(2, 0);
            for (let i = 0; i < 2; i++) {
                const expectedOrderId = `507f1f77bcf86cd79943901${i}`;
                expect(foundOrders[i]._id).to.equal(expectedOrderId);
            }

            foundOrders = await Order.find(2, -2);
            for (let i = 0; i < 2; i++) {
                const expectedOrderId = `507f1f77bcf86cd79943901${i}`;
                expect(foundOrders[i]._id).to.equal(expectedOrderId);
            }
        });

        it('should return the number of orders given by limit', async () => {
            const orders = makeDummyOrders();

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => orders.slice(skipNum, skipNum + limit)
                            })
                        })
                    })
                })
            });

            let foundOrders = await Order.find(2, 0);
            expect(foundOrders.length).to.equal(2);

            foundOrders = await Order.find(4, 0);
            expect(foundOrders.length).to.equal(4);
        });

        it('should return the number of orders given by limit indexed by page', async () => {
            const orders = makeDummyOrders();

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => orders.slice(skipNum, skipNum + limit)
                            })
                        })
                    })
                })
            });

            let limit = 3;
            let page = 0;
            let foundOrders = await Order.find(limit, page);
            expect(foundOrders.length).to.equal(limit);
            for (let i = 0; i < limit; i++) {
                const expectedOrderId = `507f1f77bcf86cd79943901${limit * page + i}`;
                expect(foundOrders[i]._id).to.equal(expectedOrderId);
            }

            limit = 3;
            page = 1;
            foundOrders = await Order.find(limit, page);
            expect(foundOrders.length).to.equal(limit);
            for (let i = 0; i < limit; i++) {
                const expectedOrderId = `507f1f77bcf86cd79943901${limit * page + i}`;
                expect(foundOrders[i]._id).to.equal(expectedOrderId);
            }
        });

        afterEach(function () {
            if (dbHelper.getDb.restore) {
                dbHelper.getDb.restore();
            }
        });
    });

    describe('Save new order', () => {
        it('should throw an error if not connected to Mongodb', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.throws(new Error('MongoDB not connected!'));

            try {
                await Order.saveNew([{productId: '507f1f77bcf86cd799439010', qty: 1}]);
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('MongoDB not connected!');
            }
        });

        it('should throw an error if given an empty or undefined list', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => { }
            });

            try {
                await Order.saveNew([]);
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('Cannot save empty order');
            }
        });

        it('should throw an error if there is a quantity in items list less than or equal to 0', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => { }
            });

            const items = [];
            for (let i = 0; i < 3; i++) {
                const item = {
                    productId: `507f1f77bcf86cd79943901${i}`,
                    qty: i - 1
                };
                items.push(item);
            }

            try {
                await Order.saveNew(items);
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('Found invalid quantity, item quantity must be grater than 0');
            }
        });

        it('should throw an error if there is an invalid/non-existent productId in items list', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => { }
            });
            sinon.stub(Product, 'findOneById');
            Product.findOneById.throws();

            const items = [];
            for (let i = 0; i < 3; i++) {
                const item = {
                    productId: `507f1f77bcf86cd79943901${i}`,
                    qty: i + 1,
                };
                items.push(item);
            }

            try {
                await Order.saveNew(items);
                assert.fail();
            } catch (error) {
                expect(error.message).to.equal('Found invalid productId, cannot order non-existent products');
            }
        });

        it('should call insertOne with order object and return the time the order was placed/saved', async () => {
            sinon.stub(dbHelper, 'getDb');
            const collectionMock = {
                insertOne: async () => { }
            };
            dbHelper.getDb.returns({
                collection: () => collectionMock
            });
            const insertOneMockSpy = sinon.spy(collectionMock, 'insertOne');

            sinon.stub(Product, 'findOneById');
            Product.findOneById.withArgs('507f1f77bcf86cd799439010').resolves({
                _id: '507f1f77bcf86cd799439010',
                name: 'Product 0',
                description: 'test description',
                price: 2.99,
                imgUrl: null,
            });
            Product.findOneById.withArgs('507f1f77bcf86cd799439011').resolves({
                _id: '507f1f77bcf86cd799439011',
                name: 'Product 1',
                description: 'test description',
                price: 5.99,
                imgUrl: null,
            });
            Product.findOneById.withArgs('507f1f77bcf86cd799439012').resolves({
                _id: '507f1f77bcf86cd799439012',
                name: 'Product 2',
                description: 'test description',
                price: 1.99,
                imgUrl: null,
            });
            sinon.stub(Date, 'now');
            Date.now.returns(1588703588521);

            const items = [];
            for (let i = 0; i < 3; i++) {
                const item = {
                    productId: `507f1f77bcf86cd79943901${i}`,
                    qty: i + 1,
                };
                items.push(item);
            }

            const orderTime = await Order.saveNew(items);
            expect(orderTime).to.equal(1588703588521);
            expect(insertOneMockSpy.calledOnce).to.be.true;
            expect(insertOneMockSpy.getCall(0).args[0]).to.eql({
                createdAt: 1588703588521,
                items: [
                    {
                        product: {
                            _id: '507f1f77bcf86cd799439010',
                            name: 'Product 0',
                            description: 'test description',
                            price: 2.99,
                            imgUrl: null,
                        },
                        qty: 1,
                    },
                    {
                        product: {
                            _id: '507f1f77bcf86cd799439011',
                            name: 'Product 1',
                            description: 'test description',
                            price: 5.99,
                            imgUrl: null,
                        },
                        qty: 2,
                    },
                    {
                        product: {
                            _id: '507f1f77bcf86cd799439012',
                            name: 'Product 2',
                            description: 'test description',
                            price: 1.99,
                            imgUrl: null,
                        },
                        qty: 3,
                    },
                ],
                total: (1 * 2.99) + (2 * 5.99) + (3 * 1.99)
            });
        });

        afterEach(function () {
            if (dbHelper.getDb.restore) {
                dbHelper.getDb.restore();
            }
            if (Product.findOneById.restore) {
                Product.findOneById.restore();
            }
            if (Date.now.restore) {
                Date.now.restore();
            }
        });
    });
});


function makeDummyOrders() {
    const orders = [];
    for (let i = 0; i < 10; i++) {
        const order = {
            _id: `507f1f77bcf86cd79943901${i}`,
            createdAt: new Date(),
            items: [],
            total: 5.97,
        };
        for (let k = 0; k < 3; k++) {
            order.items.push({
                _id: `507f1f77bcf86cd7994390${i}${k}`,
                name: `Product ${k}`,
                description: 'test description',
                price: 1.99,
                imgUrl: null,
            });
        }
        orders.push(order);
    }
    return orders;
}