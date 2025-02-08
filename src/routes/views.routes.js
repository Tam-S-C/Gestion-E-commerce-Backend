import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";
import { productModel } from "../models/product.model.js";

export const viewsRouter = Router();

// GET HOME
viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render("home", { products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al obtener los productos", error: error.message });
    }
});

// GET PRODUCTS paginados
viewsRouter.get("/products", async (req, res) => {
    const { page = 1, limit = 6, sort, query } = req.query;
    try {
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { category: new RegExp(query, "i") },
                    { title: new RegExp(query, "i") }
                ]
            };
        }

        const options = {
            page: Number(page),
            limit: Number(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
            lean: true
        };

        const products = await productModel.paginate(filter, options);
        res.render("products", { products, query, sort });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET CART by ID
viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid).populate("products.product").lean();
        if (!cart) {
            return res.render("carts", { error: "El carrito no existe" });
        }
        res.render("carts", { cart, cartId: cid }); 
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.render("carts", { error: "Error al obtener el carrito" });
    }
});



