import express from "express";
import { productsRoutes } from "./routes/products.routes.js";
import { cartsRoutes } from "./routes/carts.routes.js";
import path from "path";
import { __dirname } from "./dirname.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../src/public")));

// ROUTES

app.use("/api/products", productsRoutes);

app.use("/api/carts", cartsRoutes);

// App Listen PORT

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});