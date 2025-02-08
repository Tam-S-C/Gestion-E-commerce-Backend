import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";

export const cartRouter = Router();

// Obtener todos los carritos (API JSON)
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartsModel.find().populate("products.product").lean();
        res.status(200).json({ status: "success", carts });
    } catch (error) {
        console.error("Error al obtener los carritos:", error);
        res.status(500).json({ message: "Error al obtener los carritos", error: error.message });
    }
});

// Obtener un carrito por ID (API JSON)
cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid).populate("products.product").lean();
        if (!cart) {
            return res.status(404).json({ message: "El carrito no existe" });
        }
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
    }
});

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartsModel.create({ products: [] });
        res.status(201).json({ status: "success", cart: newCart });
    } catch (error) {
        console.error("Error creando el carrito:", error);
        res.status(500).json({ message: "Error al crear el carrito", error: error.message });
    }
});

// Agregar un producto a un carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar producto al carrito", error: error.message });
    }
});

// Eliminar un producto del carrito
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar producto del carrito", error: error.message });
    }
});

// Actualizar un carrito con un arreglo de productos
cartRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const cart = await cartsModel.findByIdAndUpdate(cid, { products }, { new: true });
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el carrito", error: error.message });
    }
});

// Actualizar la cantidad de un producto en el carrito
cartRouter.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        const product = cart.products.find(p => p.product.toString() === pid);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
        product.quantity = quantity;
        await cart.save();
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cantidad del producto", error: error.message });
    }
});

// Eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        cart.products = [];
        await cart.save();
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar todos los productos del carrito", error: error.message });
    }
});

