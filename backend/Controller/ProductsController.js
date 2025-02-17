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
      const productToFind = await ProductsModel.findById(productId);
      if (productToFind) {
        console.log("SUCCESSFUL in getting a Product from database.");
        return productToFind;
      } else {
        console.log(
          "FAILED in getting a Product from database. Product doesn't exist"
        );
        return null;
      }
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

  /**
   * Deletes a Product entry from the database.
   * @param {string} productId - The productId of the product to be deleted in string form.
   * @returns {Boolean} true if the product is successfully deleted otherwise, returns false.
   */
  static async deleteProduct(productId) {
    try {
      const productToDelete = await ProductsModel.findByIdAndDelete(productId);
      if (productToDelete) {
        console.log("SUCCESSFUL in deleting a Product from database.");
        return true;
      } else {
        console.log(
          "FAILED in deleting a Product from database, Product doesn't exist."
        );
        return true;
      }
    } catch (error) {
      console.log("FAILED in deleting a Product from database.");
      return false;
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
    * @param {JSON} newProductSizes - The product's new size, must be a JSON having following the key:value format "productTypeName" : priceInPhilippinePeso. Example {"85ml":100}, set as null if doesn't need update.
   * @returns {Boolean} true if the product is successfully update otherwise, returns false.
   */
  static async updateProduct(
    productId,
    newProductName = null,
    newProductType = null,
    newProductSizes = null
  ) {
    let productNewDetails = {};
    if (newProductName) {
      productNewDetails["productName"] = newProductName;
    }
    if (newProductType) {
      productNewDetails["productType"] = newProductType;
    }
    if (newProductSizes) {
      productNewDetails["productSizes"] = newProductSizes;
    }

    try {
      const productToUpdate = await ProductsModel.findByIdAndUpdate(
        productId,
        productNewDetails
      );
      if (productToUpdate) {
        console.log("SUCCESSFUL in updating a Product from database.");
        return true;
      } else {
        console.log("FAILED in updating a Product from database.");
        return false;
      }
    } catch (error) {
      console.log(error);
      console.log("FAILED in updating a Product from database.");
      return false;
    }
  }
}

export default ProductsController;
