import ProductsModel from "../Model/ProductsModel.js";

class ProductsController {
  /**
   * Retrieves all Product entries from the database.
   * @returns {Array<JSON> | null} An array containing JSONs, each JSON entry contains one Product details. Returns null instead if operation failed.
   */
  static async showProducts() {
    try {
      const products = await ProductsModel.find({});
      console.log("SUCCESSFUL in getting Products from database.");
      return products;
    } catch (error) {
      console.log("FAILED in getting Products from database.");
      return null;
    }
  }

  /**
   * Retrieves a Product entry from the database.
   * @param {string} productId - The productId of the product to show in string form,
   * @returns {JSON | null} The JSON entry of the retrieved product, if successfully retrieved. Otherwise returns null.
   */
  static async showOneProduct(productId) {
    try {
      const product = await ProductsModel.findById(productId);
      console.log("SUCCESSFUL in getting a Product from database.");
      return product;
    } catch (error) {
      console.log("FAILED in getting a Product from database.");
      return null;
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
   * @param {JSON} newProductSizes - An object containing key:value pairs of product sizes and their price (in Philippine Pesos). Example = {"85ml" : 100}
   * @returns {Boolean} true if operation succeeded in adding new product, otherwise false.
   */
  static async createProduct(newProductName, newProductType, newProductSizes) {
    const newProduct = new ProductsModel({
      productName: newProductName,
      productType: newProductType,
      productSizes: newProductSizes,
    });

    try {
      await newProduct.save();
      console.log("SUCCESSFUL in adding new Product in database.");
      return true;
    } catch (error) {
      console.log("FAILED in adding new Product in database.");
      return false;
    }
  }

  static async deleteProduct() {}
}

export default ProductsController;
