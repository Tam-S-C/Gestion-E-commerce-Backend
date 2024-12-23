import fs from "node:fs";
import { v4 as uuid } from "uuid";

class ProductsService {
  path;
  products = [];

  /**
   * @param { path } path - Path del archivo donde se guardan los productos.
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
   * @returns { Promise<Array> } - Devuelve todos los productos.
   */
  // ---------------------------------------
  async getAllProducts() {
    return this.products;
  }


  // ---------------------------------------
  // getProductById
  /**
   * @param {id} id - Id del producto a buscar.
   * @returns {Object} Devuelve el producto con el id pasado por parámetro.
   */
  // ---------------------------------------
  async getProductById({ id }) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  // ---------------------------------------
  // createProduct
  /**
   * @param {Object} product - Datos del producto a crear.
   * @returns {Promise<Object>} Promesa que resuelve con el producto creado.
   * @throws {Error} Si ya existe un producto con el mismo ID.
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
        console.error("Error al crear el producto:", error);
    }
  }

  // ---------------------------------------
  // updateProduct
  /**
   * @param {Object} product - Datos actualizados del producto.
   * @returns {Promise<Object|null>} Promesa que resuelve con el producto actualizado o `null` si no se encuentra.
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

    if (!product) {
      return null;
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
   * @param {id} id - Id del producto a eliminar.
   * @returns {Promise<Object|null>} Promesa que resuelve con el producto eliminado o `null` si no se encuentra.
   */
  // ----------------------------------------

  async deleteProduct({ id }) {

    const product = this.products.find((product) => product.id === id);
    
    if (!product) {
      return null;
    }
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
    try {
      await this.saveProductOnFile();
      return product;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw new Error("No se pudo eliminar el producto.");
    }
  }

  // ----------------------------------------
  // saveProductOnFile
  /**
   * @returns {Promise<void>} Promesa que se resuelve cuando los productos se han guardado correctamente.
   */
  // ----------------------------------------

  async saveProductOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
    } catch (error) {
      console.error("Error al guardar el archivo de productos:", error); 
    }
  }
}

export const productService = new ProductsService({
    path: "./src/db/products.json",
  });