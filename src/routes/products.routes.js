import { Router } from "express";
import { productModel } from "../models/product.model.js";

export const productsRouter = Router();

//GET
productsRouter.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { category: { $regex: query, $options: "i" } }, 
                    { title: { $regex: query, $options: "i" } }
                ]
            };
        }
        let options = {
            page: Number(page),
            limit: Number(limit),
            lean: true 
        };

        if (sort === "asc") {
            options.sort = { price: 1 };
        } else if (sort === "desc") {
            options.sort = { price: -1 };
        }
        
        const products = await productModel.paginate(filter, options);
        
        if (!products.docs.length) {
            return res.status(404).json({ status: "error", message: "No se encontraron productos." });
        }

        res.json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}` : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al obtener los productos", error: error.message });
    }
});

// POST: Crear un nuevo producto
productsRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ status: "success", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
});

// POST agregar prod. al carrito
productsRouter.post("/:pid/cart", async (req, res) => {
    try {
        const { pid } = req.params;
        const { cartId } = req.body;
        
        let cart = await cartsModel.findById(cartId);
        if (!cart) {
            cart = await cartsModel.create({ products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId.equals(pid));
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await cart.save();
        res.status(200).json({ message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto al carrito", error: error.message });
    }
});

// PUT: Editar un producto por ID
productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await productModel.findByIdAndUpdate(pid, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "success", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
});


// DELETE
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(pid);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
});
