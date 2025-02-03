import handlebars from "express-handlebars";
import express from "express";
import morgan from "morgan"; 
import path from "path";

import { productsRoutes, products } from "./routes/products.routes.js";
import { cartsRoutes } from "./routes/carts.routes.js";
import { viewsRoutes } from "./routes/views.routes.js";
import { __dirname } from "./dirname.js";
import { Server } from "socket.io";


const app = express();
const PORT = 8080;

app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, "../public")));


// HANDLEBARS

app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

// ROUTES

app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);


// WEBSOCKET.IO => Listen PORT

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);    
    socket.emit("init", products);
});