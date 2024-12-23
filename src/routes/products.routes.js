import { Router } from "express";
import { productService } from "../services/products.service.js";

export const productsRoutes = Router();

// RUTAS-ROUTES => ENDPOINTS

//GET ALL

productsRoutes.get("/", async (req, res) => {
    const products = await productService.getAllProducts();
    
    res.status(200).json(products);
});

//GET BY ID

productsRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    
    const product = await productService.getProductById({ id });

    if (!product) { 
       return res.status(404).json({ message: "No se encontró el producto, ID inválido." });
    }

    res.status(200).json(product);

});

//POST

productsRoutes.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (
        typeof title !== "string" || 
        typeof description !== "string" || 
        typeof code !== "string" || 
        typeof price !== "number" || 
        typeof stock !== "number" || 
        typeof category !== "string" ||
        (thumbnails && !Array.isArray(thumbnails))
    ) {
        return res.status(400).json({ error: "Datos inválidos en el cuerpo de la solicitud" });
    }

    try {
        const product = await productService.createProduct({ 
            title, 
            description, 
            code, 
            price, 
            status: status ?? true, 
            stock, 
            category, 
            thumbnails: thumbnails ?? [] 
        });

        res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el producto." });
    }
});

//PUT

productsRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock, category } = req.body;

    try {
        const product = await productService.updateProduct({ id, title, description, code, price, status, stock, category });

        if (!product) {
            return res.status(404).json({ message: "No se encontró el producto." });
        }

        res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el producto." });
    }
});

// DELETE

productsRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const product = await productService.deleteProduct({ id });

    if (!product) {
        return res.status(404).json({ message: "No se encontró el producto." });
    }
    res.status(200).json({product});
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el producto." });
    }
});

