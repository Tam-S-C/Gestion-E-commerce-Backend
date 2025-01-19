import { Router } from "express";
import { products } from "./products.routes.js";

export const viewsRoutes = Router();

viewsRoutes.get("/", (req, res) => {
    res.render("home", { products });
});

viewsRoutes.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts");
});