import ProductsModel from "../Model/ProductsModel.js";

const ProductsController = {
  showProducts: async () => {
    try {
      const products = await ProductsModel.find({});
      console.log("SUCCESSFUL in getting Products from database.");
      console.log(products);
      return products;
    } catch (error) {
      console.log("FAILED in getting Products from database.");
      return null;
    }
  },

  createProduct: async () => {
    ProductsModel.save;
  },
};

export default ProductsController;
