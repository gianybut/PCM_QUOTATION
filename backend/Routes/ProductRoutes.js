import express, { query } from "express";
import { StatusCodes } from "http-status-codes";
import ProductsController from "../Controller/ProductsController.js";

import { matchedData, param, validationResult, body } from "express-validator";
import ProductModel from "../Model/ProductsModel.js";

const ProductRoute = express.Router();
ProductRoute.use(express.json());
// Product routes start with ":/products"

// getProductResult[0]["_id"].toString() -- this is how to access product ID
// productToUpdate["productSizes"].forEach((key, value) => {
//   console.log(`${key} and Php ${value}`);                  -- to access productSizes, treat it like a JSON
// });

// READ ALL
ProductRoute.get("/", async (req, res) => {
  const getProductsResult = await ProductsController.showProducts();

  if (getProductsResult) {
    return res.status(StatusCodes.OK).json({
      message: "Products successfully retrieved.",
      data: getProductsResult,
    });
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to retrieve Products.", data: null });
  }
});

// READ ONE
ProductRoute.get(
  "/:productId",
  [param("productId").isString().notEmpty().escape()],
  async (req, res) => {
    const productIdToGet = matchedData(req)["productId"];
    console.log(productIdToGet);

    const getOneProductResult = await ProductsController.showOneProduct(
      productIdToGet
    );

    if (getOneProductResult) {
      return res.status(StatusCodes.OK).json({
        message: "Successfully retrieved one product",
        data: getOneProductResult,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to retrieve one product",
        data: null,
      });
    }
  }
);

// CREATE
// Product sizes - ml, l, gallon, g
ProductRoute.post(
  "/create",
  [
    body("productName")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toUpperCase(),
    body("productType")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toUpperCase(),
    body("productSizes")
      .exists()
      .isObject()
      .custom((obj) => Object.keys(obj).length > 0),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("One of the required parameters is missing.");
    }

    const newProductName = matchedData(req)["productName"];
    const newProductType = matchedData(req)["productType"];
    const newProductSizes = matchedData(req)["productSizes"];
    const newProductInDatabase = await ProductsController.createProduct(
      newProductName,
      newProductType,
      newProductSizes
    );

    if (newProductInDatabase) {
      return res.status(StatusCodes.OK).send("Successfully added one product");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Failed to add one product");
    }
  }
);

// UPDATE

// DELETE

export default ProductRoute;
