import fs from "node:fs";
import { v4 as uuid } from "uuid";

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
  // updateCart
  /**
   * @param {Object} cart - Datos actualizados del carrito.
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