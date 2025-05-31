import { Schema, models, model } from 'mongoose';

// Define the schema
const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    image:{
        productImageUrl: {
            type: String, 
            default: null,
            },
        productImagePublicId: {
            type: String, 
            default: null,
            },
        }
    },
  { timestamps: true }
)

// Prevent model overwrite during hot reload
const Product = models.Product || model('Product', productSchema);
export default Product;
