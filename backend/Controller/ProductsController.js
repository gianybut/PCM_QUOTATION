import ProductsModel from "../Model/ProductsModel.js";

class ProductsController {
  static async showProducts() {
    try {
      const products = await ProductsModel.find({});
      console.log("SUCCESSFUL in getting Products from database.");
      console.log(products);
      return products;
    } catch (error) {
      console.log("FAILED in getting Products from database.");
      return null;
    }
  }

  /**
   * Creates a new product in the database. ENSURE PARAMETERS are sanitized (strings are trimmed or made sure they are string, etc.) first before calling this function.
   * @param {string} newProductName - The name of the new product.
   * @param {JSON} newProductSizes - An object containing key:value pairs of product sizes and their price (in Philippine Pesos). Example = {"85ml" : 100}
   * @returns {Boolean} true if operation succeeded in adding new product, otherwise false.
   */
  static async createProduct(newProductName, newProductSizes) {
    const newProduct = new ProductsModel({
      productName: newProductName,
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
}

export default ProductsController;
