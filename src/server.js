import handlebars from "express-handlebars";
import session from "express-session";
import Handlebars from "handlebars";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import path from "path";

import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { productsRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./dirname.js";

const app = express();
const PORT = 5000;

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


// HBS
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      multiply: (price, quantity) => {
        return price * quantity;
      },
      calculateTotal: (products) => {
        return products.reduce((total, product) => {
          return total + (product.product.price * product.quantity);
        }, 0);
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));


mongoose
  .connect(
    "mongodb+srv://tamaracanzobre:zdwIV2TZpBKZkZLl@backend-products.d44ge.mongodb.net/ecommerce",
  )
  .then(() => {
    console.log("Conectado a la Base de Datos exitosamente");
  })
  .catch((error) => {
    console.log("Error al conectar a la BD", error);
  });

//ROUTES
app.use("/", viewsRouter);
app.use("/products", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
