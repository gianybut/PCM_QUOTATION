import mongoose from "mongoose";

import ProductsModel from "../Model/ProductsModel.js";
import { LocalStore } from "../Model/LocalStore.js";

class ProductsController {
  static isDatabaseAvailable() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Retrieves all Product entries from the database.
   * @returns {Array<JSON> | null} An array containing JSONs, each JSON entry contains one Product details. Returns null instead if no products are found. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async showProducts() {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.listProducts();
    }

    try {
      const products = await ProductsModel.find({});
      return products || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a Product entry from the database.
   * @param {string} productId - The productId of the product to show in string form,
   * @returns {JSON | null} The JSON entry of the retrieved product. Otherwise returns null if no product has been found. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async showOneProduct(productId) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.getProduct(productId);
    }

    try {
      const productToFind = await ProductsModel.findById(productId);
      return productToFind || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new product in the database. ENSURE PARAMETERS are sanitized (strings are trimmed or made sure they are string, etc.) first before calling this function.
   * @param {string} newProductName - The name of the new product.
   * @param {string} newProductType - The product type of the new product, can only be one of the following [
      "PERFUME",
      "CAR DIFFUSER",
      "ALCOHOL",
      "DISH WASHER",
      "COLOGNE",
      "FABRIC CONDITIONER",
      "HAND SOAP",
      "MISCELLANEOUS",
    ], (must be all capital letters)
   * @returns {Boolean} true if operation succeeded in adding new product, otherwise false.
   */
  static async createProduct(newProductName, newProductType) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.createProduct(newProductName, newProductType);
    }

    const newProduct = new ProductsModel({
      productName: newProductName,
      productType: newProductType,
    });

    try {
      await newProduct.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Deletes a Product entry from the database.
   * @param {string} productId - The productId of the product to be deleted in string form.
   * @returns {Boolean} true if the product is successfully deleted otherwise, returns false. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async deleteProduct(productId) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.deleteProduct(productId);
    }

    try {
      const productToDelete = await ProductsModel.findByIdAndDelete(productId);
      return productToDelete ? true : false;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the Product entry from the database matching the productId parameter.
   * @param {string} productId - The productId of the product to be updated in string form.
   * @param {string} newProductName - The product's new name, set as null if doesn't need update.
   * @param {string} newProductType - The product's new product type, MUST BE ONE OF TO THE FOLLOWING VALUES [
      "PERFUME",
      "CAR DIFFUSER",
      "ALCOHOL",
      "DISH WASHER",
      "COLOGNE",
      "FABRIC CONDITIONER",
      "HAND SOAP",
      "MISCELLANEOUS",
    ], set as null if doesn't need update.
   * @returns {Boolean} true if the product is successfully update otherwise, returns false.
   */
  static async updateProduct(
    productId,
    newProductName = null,
    newProductType = null
  ) {
    if (!this.isDatabaseAvailable()) {
      const productDetails = {};

      if (newProductName) {
        productDetails["productName"] = newProductName;
      }

      if (newProductType) {
        productDetails["productType"] = newProductType;
      }

      return LocalStore.updateProduct(productId, productDetails);
    }

    let productNewDetails = {};
    if (newProductName) {
      productNewDetails["productName"] = newProductName;
    }
    if (newProductType) {
      productNewDetails["productType"] = newProductType;
    }

    try {
      const productToUpdate = await ProductsModel.findByIdAndUpdate(
        productId,
        productNewDetails
      );
      return productToUpdate ? true : false;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductsController;
