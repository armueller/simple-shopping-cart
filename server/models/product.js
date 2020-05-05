const { ObjectID } = require('mongodb');
const dbHelper = require('../helpers/database');

class Product {
    /**
     * 
     * @param {string} productId 
     */
    static async findOneById(productId) {
        const productsCollection = dbHelper.getDb('AUAssignmentDB').collection('Products');
        const product = await productsCollection.findOne({ _id: ObjectID(productId) });
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        return new Product(product);
    }

    /**
     * 
     * @param {number} limit 
     * @param {number} page 
     */
    static async find(limit, page) {
        if (!limit || limit < 0 || limit > 10) {
            limit = 5;
        }
        if (!page || page < 0) {
            page = 0;
        }
        const productsCollection = dbHelper.getDb('AUAssignmentDB').collection('Products');
        const skipNum = limit * page;
        const products = await productsCollection.find({}).skip(skipNum).limit(limit).toArray();
        return products.map((mongoObj) => new Product(mongoObj));
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
         * @type {string}
         */
        this.name = mongoObj.name;

        /**
         * @type {string}
         */
        this.description = mongoObj.description;

        /**
         * @type {number}
         */
        this.price = mongoObj.price;

        /**
         * @type {string}
         */
        this.imgUrl = mongoObj.imgUrl;
    }
}

exports.Product = Product;
