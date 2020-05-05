/* eslint-disable no-undef */

const { expect } = require('chai');
const sinon = require('sinon');
const dbHelper = require('../../helpers/database');
const { Product } = require('../../models/product');

describe('Product Model', () => {
    describe('Find product by product id', () => {
        it('should throw an error if not connected to Mongodb', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.throws(new Error('MongoDB not connected!'));

            try {
                await Product.findOneById('507f1f77bcf86cd799439011');
            } catch (error) {
                expect(error.message).to.equal('MongoDB not connected!');
            }

            dbHelper.getDb.restore();
        });

        it('should throw an error if the product id does not exist', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    findOne: async () => undefined
                })
            });

            try {
                await Product.findOneById('507f1f77bcf86cd799439011');
            } catch (error) {
                expect(error.message).to.equal('Product with id 507f1f77bcf86cd799439011 not found');
            }

            dbHelper.getDb.restore();
        });

        it('should return the product object with the given id', async () => {
            const prodcut = {
                _id: '507f1f77bcf86cd799439011',
                name: 'Test',
                description: 'test description',
                price: 9.99,
                imgUrl: null,
            };

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    findOne: async () => prodcut
                })
            });

            const p = await Product.findOneById('507f1f77bcf86cd799439011');
            expect(p).to.eql(new Product(prodcut));

            dbHelper.getDb.restore();
        });
    });

    describe('Find products', () => {
        it('should throw an error if not connected to Mongodb', async () => {
            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.throws(new Error('MongoDB not connected!'));

            try {
                await Product.find(2, 0);
            } catch (error) {
                expect(error.message).to.equal('MongoDB not connected!');
            }

            dbHelper.getDb.restore();
        });

        it('should return an empty list if no products are found', async () => {
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

            const products = await Product.find(2, 0);
            expect(products).to.be.an('Array');
            expect(products.length).to.equal(0);

            dbHelper.getDb.restore();
        });

        it('should return 5 products if limit is not supplied or invalid', async () => {
            const products = [];
            for (let i = 0; i < 10; i++) {
                products.push({
                    _id: `507f1f77bcf86cd79943901${i}`,
                    name: `Product ${i}`,
                    description: 'test description',
                    price: 9.99,
                    imgUrl: null,
                });
            }

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => products.slice(skipNum, skipNum+limit)
                            })
                        })
                    })
                })
            });

            let foundProducts = await Product.find(-2, 0);
            expect(foundProducts.length).to.equal(5);

            foundProducts = await Product.find(0, 0);
            expect(foundProducts.length).to.equal(5);

            dbHelper.getDb.restore();
        });

        it('should return the number of products given by limit at page 0 if page is not supplied or invalid', async () => {
            const products = [];
            for (let i = 0; i < 10; i++) {
                products.push({
                    _id: `507f1f77bcf86cd79943901${i}`,
                    name: `Product ${i}`,
                    description: 'test description',
                    price: 9.99,
                    imgUrl: null,
                });
            }

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => products.slice(skipNum, skipNum+limit)
                            })
                        })
                    })
                })
            });

            let foundProducts = await Product.find(2, 0);
            for (let i = 0; i < 2; i++) {
                const expectedName = `Product ${i}`;
                expect(foundProducts[i].name).to.equal(expectedName);
            }

            foundProducts = await Product.find(2, -2);
            for (let i = 0; i < 2; i++) {
                const expectedName = `Product ${i}`;
                expect(foundProducts[i].name).to.equal(expectedName);
            }

            dbHelper.getDb.restore();
        });

        it('should return the number of products given by limit', async () => {
            const products = [];
            for (let i = 0; i < 10; i++) {
                products.push({
                    _id: `507f1f77bcf86cd79943901${i}`,
                    name: `Product ${i}`,
                    description: 'test description',
                    price: 9.99,
                    imgUrl: null,
                });
            }

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => products.slice(skipNum, skipNum+limit)
                            })
                        })
                    })
                })
            });

            let foundProducts = await Product.find(2, 0);
            expect(foundProducts.length).to.equal(2);

            foundProducts = await Product.find(4, 0);
            expect(foundProducts.length).to.equal(4);

            dbHelper.getDb.restore();
        });

        it('should return the number of products given by limit indexed by page', async () => {
            const products = [];
            for (let i = 0; i < 10; i++) {
                products.push({
                    _id: `507f1f77bcf86cd79943901${i}`,
                    name: `Product ${i}`,
                    description: 'test description',
                    price: 9.99,
                    imgUrl: null,
                });
            }

            sinon.stub(dbHelper, 'getDb');
            dbHelper.getDb.returns({
                collection: () => ({
                    find: () => ({
                        skip: (skipNum) => ({
                            limit: (limit) => ({
                                toArray: async () => products.slice(skipNum, skipNum+limit)
                            })
                        })
                    })
                })
            });

            let limit = 3;
            let page = 0;
            let foundProducts = await Product.find(limit, page);
            expect(foundProducts.length).to.equal(limit);
            for (let i = 0; i < limit; i++) {
                const expectedName = `Product ${limit*page + i}`;
                expect(foundProducts[i].name).to.equal(expectedName);
            }

            limit = 3;
            page = 1;
            foundProducts = await Product.find(limit, page);
            expect(foundProducts.length).to.equal(limit);
            for (let i = 0; i < limit; i++) {
                const expectedName = `Product ${limit*page + i}`;
                expect(foundProducts[i].name).to.equal(expectedName);
            }

            dbHelper.getDb.restore();
        });
    });
});
