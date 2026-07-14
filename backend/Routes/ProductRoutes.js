import express from "express";
import { StatusCodes } from "http-status-codes";
import ProductsController from "../Controller/ProductsController.js";
import { matchedData, param, validationResult, body } from "express-validator";

const ProductRoute = express.Router();

// READ ALL
ProductRoute.get("/", async (req, res) => {
  try {
    const getProductsResult = await ProductsController.showProducts();

    return res.status(StatusCodes.OK).json({
      message: `${getProductsResult.length} Product/s successfully retrieved.`,
      data: getProductsResult || null,
    });
  } catch (error) {
    console.error("GET /products error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "FAILED TO RETRIEVE PRODUCTS. Database connection error.",
    });
  }
});

// READ ONE
ProductRoute.get(
  "/:productId",
  [
    param("productId")
      .exists()
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 24, max: 24 })
      .isHexadecimal(),
  ],
  async (req, res) => {
    // Error, exit early
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const productIdToGet = matchedData(req)["productId"];
      const getOneProductResult = await ProductsController.showOneProduct(
        productIdToGet
      );

      return res.status(StatusCodes.OK).json({
        message: getOneProductResult
          ? "Successfully retrieved one product"
          : "Product doesn't exist.",
        data: getOneProductResult || null,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO RETRIEVE ONE PRODUCT. Database connection error.",
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
    body("productName").exists().isString().notEmpty().trim().toUpperCase(),
    body("productType").exists().isString().notEmpty().trim().toUpperCase(),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const newProductName = matchedData(req)["productName"];
      const newProductType = matchedData(req)["productType"];

      const newProductInDatabase = await ProductsController.createProduct(
        newProductName,
        newProductType
      );

      return res.status(StatusCodes.OK).json({
        message: newProductInDatabase
          ? "Successfully added one product"
          : "Failed to add one product",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO ADD ONE PRODUCT. Database connection error.",
      });
    }
  }
);

// UPDATE
ProductRoute.patch(
  "/update/:productId",
  [
    param("productId")
      .exists()
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 24, max: 24 })
      .isHexadecimal(),
    body("productName").exists().isString().notEmpty().trim().toUpperCase(),
    body("productType").exists().isString().notEmpty().trim().toUpperCase(),
  ],
  async (req, res) => {
    // Errors in validation, exit early
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const productId = matchedData(req)["productId"];
      const newProductName = matchedData(req)["productName"];
      const newProductType = matchedData(req)["productType"];

      const updateResult = await ProductsController.updateProduct(
        productId,
        newProductName,
        newProductType
      );

      return res.status(StatusCodes.OK).json({
        message: updateResult
          ? "Successfully updated one product"
          : "Failed to update one product",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO UPDATE PRODUCT. Database connection error.",
      });
    }
  }
);

// DELETE
ProductRoute.delete(
  "/delete/:productId",
  [
    param("productId")
      .exists()
      .isString()
      .notEmpty()
      .trim()
      .isLength({ min: 24, max: 24 })
      .isHexadecimal(),
  ],
  async (req, res) => {
    // Errors in validation, exit early
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const productId = matchedData(req)["productId"];

      const deleteResult = await ProductsController.deleteProduct(productId);
      return res.status(StatusCodes.OK).json({
        message: deleteResult
          ? "Successfully deleted one product"
          : "Failed to delete one product",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO DELETE PRODUCT. Database connection error.",
      });
    }
  }
);

export default ProductRoute;
