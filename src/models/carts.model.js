import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        _id: false
    }]
});

cartSchema.pre('find', function() {
    this.populate('products.product');
});

export const cartsModel = model("carts", cartSchema);