import fs from "node:fs";
import { v4 as uuid } from "uuid";


class ProductsService {
  path;
  products = [];

  constructor({ path }) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

// ---------------------------------------
// getAllProducts
 /**
   * @returns {Array} Retorna todos los productos.
   */
// ---------------------------------------
  async getAllProducts() {
    return this.products;
  }


// ---------------------------------------
// getProductById
 /**
   * @param {id} id - Id del producto.
   * @returns {Object} Retorna un producto por id.
   */
// ---------------------------------------
  async getProductById({ id }) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }


// ---------------------------------------
// createProduct
 /**
   * @param {Object} product - Producto a crear.
   * @returns {Object} Retorna el producto creado.
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
      thumbnails: ["rutafoto1", "rutafoto2", "rutafoto3"],
    };

    this.products.push(product);

    try {
      await this.saveProductOnFile();
      return product;
    } catch (error) {
      console.error("Error al crear el producto");
    }
  }


// ---------------------------------------
// updateProduct
 /**
   * @param {Object} product - Producto a actualizar.
   * @returns {Object} Retorna el producto actualizado.
   */
// ---------------------------------------

  async updateProduct({
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
      console.error("Error al actualizar el producto");
    }
  }


// ----------------------------------------
// deleteProduct
 /**
   * @param {id} id - Id del producto a eliminar
   * @returns {Object} Retorna el producto eliminado.
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
      console.error("Error al eliminar el producto");
    }
  }


// ----------------------------------------
// saveProductOnFile
 /**
   * @param {Object} product - Producto a guardar.
   * @returns  - Retorna el producto guardado.
   */
// ----------------------------------------

  async saveProductOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
    } catch (error) {
      console.error("Error al guardar el producto");
    }
  }
}
