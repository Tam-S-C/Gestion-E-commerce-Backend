import fs from "node:fs";
import { v4 as uuid } from "uuid";
import { productService } from "./products.service.js";

class CartsService {
  path;
  carts = [];

  /**
   * @param { path } path - Path del archivo donde se guardan los carritos.
   */


  constructor({ path }) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        console.error("Error al leer el archivo de carritos:", error);
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  // ---------------------------------------
  // getCartById
  /**
   * @param {id} id - Id del carrito a buscar.
   * @returns {Object} Devuelve el carrito con el id pasado por parámetro.
   */
  // ---------------------------------------

  async getCartById({ id }) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart;
  }

  // ---------------------------------------
  // createCart
  /**
   * @returns {Promise<Object>} Promesa que resuelve con el carrito creado.
   */
  // ---------------------------------------

  async createCart() {
    const id = uuid();

    const cart = {
      id,
      products: [] 
    };

    this.carts.push(cart);

    try {
      await this.saveCartOnFile();
      return cart;
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      throw new Error("No se pudo crear el carrito.");
    }
  }

// ---------------------------------------
// addProductToCart
/**
   * @param {string} cartId - ID del carrito.
   * @param {string} productId - ID del producto a agregar.
   * @returns {Promise<Object>} Promesa que resuelve con el carrito actualizado.
 */
// ---------------------------------------

async addProductToCart({ cartId, productId }) {

  const cart = this.carts.find((cart) => cart.id === cartId);
  if (!cart) throw new Error("El carrito no existe.");

  const product = await productService.getProductById({ id: productId });
  if (!product) throw new Error("El producto no existe.");

  const productIndex = cart.products.findIndex((item) => item.product === productId);
  if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
  } else {
      cart.products.push({ product: productId, quantity: 1 });
  }

  try {
    await this.saveCartOnFile();
    return cart;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw new Error("No se pudo agregar el producto al carrito.");
  }
}

  // ---------------------------------------
  // updateCart
 /**
   * @param {Object} cart - Datos actualizados del carrito.
   * @param {string} id - ID del carrito a actualizar.
   * @param {Array} products - Array de productos actualizados.
   * @returns {Promise<Object|null>} Promesa que resuelve con el carrito actualizado o null si no se encuentra.
   */
  // ---------------------------------------

  async updateCart({ id, products }) {
    
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) {
      return null;
    }

    cart.products = products;

    const index = this.carts.findIndex((cart) => cart.id === id);
    this.carts[index] = cart;

    try {
      await this.saveCartOnFile();
      return cart;
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw new Error("No se pudo actualizar el carrito.");
    }
  }

  // ----------------------------------------
  // saveCartOnFile
  /**
   * @returns {Promise<void>} Promesa que se resuelve cuando los carritos se han guardado correctamente.
   */
  // ----------------------------------------

  async saveCartOnFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2)
      );
    } catch (error) {
      console.error("Error al guardar el archivo de carritos:", error);
      throw new Error("No se pudo guardar el archivo de carritos.");
    }
  }
}

export const cartService = new CartsService({
  path: "./src/db/carts.json",
});