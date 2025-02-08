

//---------------------------------------
// Entrega 1 y 2 con FileSystem
//---------------------------------------


import fs from "node:fs";
import { v4 as uuid } from "uuid";

class ProductsService {
  path;
  products = [];

  /**
   * @param { path } path 
   */

  constructor({ path }) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        console.error("Error al leer el archivo de productos:", error);
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }


  // ---------------------------------------
  // getAllProducts
  /**
   * @returns { Promise<Array> } 
   */
  // ---------------------------------------
  async getAllProducts() {
    return this.products;
  }


  // ---------------------------------------
  // getProductById
  /**
   * @param {id} id 
   * @returns {Object} 
   */
  // ---------------------------------------
  async getProductById({ id }) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  // ---------------------------------------
  // createProduct
  /**
   * @param {Object} product
   * @returns {Promise<Object>} 
   * @throws {Error} 
   */
  // ---------------------------------------
  async createProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  }) {
    const id = uuid();

    if (this.products.some((product) => product.id === id)) {
      throw new Error("El producto ya existe");
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error(`El código "${code}" ya está en uso por otro producto.`);
    }

    const product = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: [ "fotoEjemplo-1.jpg", "fotoEjemplo-2.jpg", "fotoEjemplo-3.jpg" ], 
    };

    this.products.push(product);

    try {
      await this.saveProductOnFile();
      return product;
    } catch (error) {
        throw new Error("No se pudo crear el producto.");
    }
  }

  // ---------------------------------------
  // updateProduct
  /**
   * @param {Object} product 
   * @returns {Promise<Object|null>} 
   */
  // ---------------------------------------

  async updateProduct({
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  }) {
    
    const product = this.products.find((product) => product.id === id);

    if (
      code &&
      this.products.some((prod) => prod.code === code && prod.id !== id)
    ) {
      throw new Error(`El código "${code}" ya está en uso por otro producto.`);
    }

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.status = status ?? product.status;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;

    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = product;

    try {
      await this.saveProductOnFile();
      return product;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw new Error("No se pudo actualizar el producto.");
    }
  }

  // ----------------------------------------
  // deleteProduct
  /**
   * @param {id} id - 
   * @returns {Promise<Object|null>} 
   */
  // ----------------------------------------

  async deleteProduct({ id }) {

    const product = this.products.find((product) => product.id === id);
    
    if (!product) {
      return null;
    }
    const index = this.products.findIndex((product) => product.id === id);
    const [deletedProduct] = this.products.splice(index, 1);

    try {
      await this.saveProductOnFile();
      return deletedProduct;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw new Error("No se pudo eliminar el producto.");
    }
  }

  // ----------------------------------------
  // saveProductOnFile
  /**
   * @returns {Promise<void>} 
   */
  // ----------------------------------------

  async saveProductOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log("Productos guardados en el archivo correctamente.");
    } catch (error) {
      console.error("Error al guardar el archivo de productos:", error); 
      throw new Error("Error al guardar el archivo.");
    }
  }
}

export const productService = new ProductsService({
    path: "./src/db/products.json",
  });