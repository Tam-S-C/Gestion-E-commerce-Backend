import express from "express";
import { productsRoutes } from "./routes/products.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// ROUTES

app.use("/api/products", productsRoutes);

// App Listen PORT

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});