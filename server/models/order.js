const { ObjectID } = require('mongodb');
const dbHelper = require('../helpers/database');
const { Product } = require('./product');

class Order {
    /**
     * 
     * @param {string} orderId 
     */
    static async findOneById(orderId) {
        const ordersCollection = dbHelper.getDb('AUAssignmentDB').collection('Orders');
        const order = await ordersCollection.findOne({ _id: ObjectID(orderId) });
        if (!order) {
            throw new Error(`Order with id ${orderId} not found`);
        }
        return new Order(order);
    }

    /**
     * 
     * @param {number} limit 
     * @param {number} page 
     */
    static async find(limit, page) {
        if (!limit || limit < 0) {
            limit = 5;
        }
        if (!page || page < 0) {
            page = 0;
        }
        const ordersCollection = dbHelper.getDb('AUAssignmentDB').collection('Orders');
        const skipNum = limit * page;
        const orders = await ordersCollection.find({}).skip(skipNum).limit(limit).toArray();
        return orders.map((mongoObj) => new Order(mongoObj));
    }

    /**
     * 
     * @param {{productId: string, qty: number}[]} orderItems 
     */
    static async saveNew(orderItems) {
        if (!orderItems || !orderItems.length) {
            throw new Error('Cannot save empty order');
        }
        const invalidQty = orderItems.find((item) => item.qty < 1);
        if (invalidQty) {
            throw new Error('Found invalid quantity, item quantity must be grater than 0');
        }

        const ordersCollection = dbHelper.getDb('AUAssignmentDB').collection('Orders');

        let inflatedOrderItems;
        try {
            inflatedOrderItems = await Promise.all(orderItems.map(async (item) => {
                const product = await Product.findOneById(item.productId);
                return {
                    product,
                    qty: item.qty,
                };
            }));
        } catch (error) {
            console.log(error);
            throw new Error('Found invalid productId, cannot order non-existent products');
        }

        const orderTimestamp = Date.now();
        const orderTotal = inflatedOrderItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
        const orderObj = {
            createdAt: orderTimestamp,
            items: inflatedOrderItems,
            total: orderTotal,
        };

        await ordersCollection.insertOne(orderObj);
        return orderTimestamp;
    }

    /**
     * 
     * @param {any} mongoObj 
     */
    constructor(mongoObj) {
        /**
         * @type {string}
         */
        this._id = mongoObj._id;

        /**
         * @type {Date}
         */
        this.createdAt = mongoObj.createdAt;

        /**
         * @type {{product: Product, qty: number}[]}
         */
        this.items = mongoObj.items;

        /**
         * @type {number}
         */
        this.total = mongoObj.total;
    }
}

exports.Order = Order;