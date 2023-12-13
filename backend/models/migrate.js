import bookModel from './schemas/bookSchema.js';
import { model } from "mongoose";

export default async function () {

    try {
        const booksmodel = model("books", bookModel);
        console.log('Book collection created');
    }
    catch (err) {
        console.log(err);
    }

}

