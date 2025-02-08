import { cartsModel } from "../models/carts.model.js";

export const addProductToCart = async (cartId, productId) => {
    try {
        const cart = await cartsModel.findById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};
