import express from "express";
import { StatusCodes } from "http-status-codes";
import ProductsController from "../Controller/ProductsController.js";

const ProductRoute = express.Router();
// Product routes start with ":/products"

// getProductResult[0]["_id"].toString() -- this is how to access product ID
// productToUpdate["productSizes"].forEach((key, value) => {
//   console.log(`${key} and Php ${value}`);                  -- to access productSizes, treat it like a JSON
// });
ProductRoute.get("/", async (req, res) => {
  const addProductResult = await ProductsController.createProduct(
    "Bruh Cologne",
    "PERFUME",
    { "60ml": 100 }
  );

  const updateProductResult = await ProductsController.updateProduct(
    "67b02471f559764001f0ccab",
    null,
    "COLOGNE"
  );

  const getProductResult = await ProductsController.showOneProduct(
    "67b02471f559764001f0ccab"
  );

  console.log(getProductResult);
  return res.status(StatusCodes.OK).send("OK");
});

export default ProductRoute;
