import express from "express";
import { productService } from "./services/products.service.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// RUTAS-ROUTES => ENDPOINTS

//GET ALL

app.get("/api/products", async (req, res) => {
    const products = await productService.getAllProducts();
    
    res.status(200).json(products);
    //res.send("<h1>Hola mundo</h1>")
});

//GET BY ID

app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById({ id });

    if (!product) { 
       return res.status(404).json({ message: "No se encontró el producto." });
    }

    res.status(200).json(product);

});

//POST

app.post("/api/products", async (req, res) => {
    const { title, description, code, price, status, stock, category } = req.body;
    
    try {
    const product = await productService.createProduct({ title, description, code, price, status, stock, category});

    res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el producto." });
    }
});

//PUT

app.put("/api/products/:id", async (req, res) => {
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

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const product = await productService.deleteProduct({ id });

    if (!product) {
        return res.status(404).json({ message: "No se encontró el producto." });
    }
    res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el producto." });
    }
});

// PORT

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});