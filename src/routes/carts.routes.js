import { Router } from "express";
import { cartService } from "../services/carts.service.js";

export const cartsRoutes = Router();

// RUTAS-ROUTES => ENDPOINTS


//GET cart BY ID => Listar todos los productos del carrito

cartsRoutes.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.getCartById({ id: cid });
        
        if (!cart) {
            return res.status(404).json({ message: "No se encontró el carrito." });
        }
        
        res.status(200).json(cart.products);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el carrito." });
    }
});


//POST => Crear un nuevo carrito

cartsRoutes.post("/", async (req, res) => {
    
    try {
    const cart = await cartService.createCart({ products: []});

    res.status(201).json(cart);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el carrito." });
    }
});


// POST => Agregar un producto al carrito

cartsRoutes.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const cart = await cartService.getCartById({ id: cid });
        
        if (!cart) {
            return res.status(404).json({ message: "No se encontró el carrito." });
        }

        // Si el producto existe en el carrito, incrementa su cantidad
        const existingProductIndex = cart.products.findIndex(
            item => item.product === pid
        );
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // Si no existe agregarlo al carrito
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        // Actualizar el carrito
        const updatedCart = await cartService.updateCart({
            id: cid,
            products: cart.products
        });

        res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json({ message: "Error al agregar el producto al carrito." });
    }
});