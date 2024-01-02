import { model } from "mongoose";
import productsSchema from './schemas/productSchema.js';

const productsModel = model("products", productsSchema);

export { productsModel };