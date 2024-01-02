import bookModel from './schemas/bookSchema.js';
import productsModel from './schemas/productSchema.js';
import { model } from "mongoose";

export default async function () {

    try {
        const booksmodel = model("books", bookModel);
        console.log('Book collection created');
        const productModel = model("products", productsModel);
        console.log('Product collection created');
    }
    catch (err) {
        console.log(err);
    }

}

