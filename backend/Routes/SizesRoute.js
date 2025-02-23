import express, { query } from "express";
import { StatusCodes } from "http-status-codes";
import SizesController from "../Controller/SizesController.js";
import { matchedData, param, validationResult, body } from "express-validator";

// Size routes start with ":/sizes"
const SizesRoute = express.Router();
SizesRoute.use(express.json());

// READ ALL
SizesRoute.get("/", async (req, res) => {
  try {
    const getSizessResult = await SizesController.showSizes();

    return res.status(StatusCodes.OK).json({
      message: `${getSizessResult.length} Size/s successfully retrieved.`,
      data: getSizessResult || null,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "FAILED TO RETRIEVE SIZES. Database connection error.",
    });
  }
});

// READ ONE
SizesRoute.get(
  "/:sizeId",
  [
    param("sizeId")
      .exists()
      .isString()
      .notEmpty()
      .escape()
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
      const sizeIdToGet = matchedData(req)["sizeId"];
      const getOneSizeResult = await SizesController.showOneSize(sizeIdToGet);

      return res.status(StatusCodes.OK).json({
        message: getOneSizeResult
          ? "Successfully retrieved one size"
          : "Size doesn't exist.",
        data: getOneSizeResult || null,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO RETRIEVE ONE SIZE. Database connection error.",
        data: null,
      });
    }
  }
);

// CREATE
// Product sizes - ml, l, gallon, g
SizesRoute.post(
  "/create",
  [
    body("sizeName")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toLowerCase(),
    body("sizeFor")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toUpperCase(),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const newSizeName = `${matchedData(req)["sizeName"]} (${
        matchedData(req)["sizeFor"]
      })`;
      const newSizeFor = matchedData(req)["sizeFor"];

      const newSizeInDatabase = await SizesController.createSize(
        newSizeName,
        newSizeFor
      );

      return res.status(StatusCodes.OK).json({
        message: newSizeInDatabase
          ? "Successfully added one size"
          : "Failed to add one size",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "FAILED TO ADD ONE SIZE. Database connection error.",
      });
    }
  }
);

// UPDATE
SizesRoute.patch(
  "/update/:sizeId",
  [
    param("sizeId")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 24, max: 24 })
      .isHexadecimal(),
    body("sizeName")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toLowerCase(),
    body("sizeFor")
      .exists()
      .isString()
      .notEmpty()
      .escape()
      .trim()
      .toUpperCase(),
  ],
  async (req, res) => {
    // Errors in validation, exit early
    if (!validationResult(req).isEmpty()) {
      console.log(validationResult(req));
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One of the required parameters is missing." });
    }

    try {
      const sizeId = matchedData(req)["sizeId"];
      const newSizeName = `${matchedData(req)["sizeName"]} (${
        matchedData(req)["sizeFor"]
      })`;
      const newSizeFor = matchedData(req)["sizeFor"];

      const updateResult = await SizesController.updateSize(
        sizeId,
        newSizeName,
        newSizeFor
      );

      return res.status(StatusCodes.OK).json({
        message: updateResult
          ? "Successfully updated one size"
          : "Failed to update one size",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "FAILED TO UPDATE SIZE. Database connection error.",
      });
    }
  }
);

// DELETE
SizesRoute.delete(
  "/delete/:sizeId",
  [
    param("sizeId")
      .exists()
      .isString()
      .notEmpty()
      .escape()
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
      const sizeId = matchedData(req)["sizeId"];

      const deleteResult = await SizesController.deleteSize(sizeId);
      return res.status(StatusCodes.OK).json({
        message: deleteResult
          ? "Successfully deleted one size"
          : "Failed to delete one size",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        message: "FAILED TO DELETE SIZE. Database connection error.",
      });
    }
  }
);

export default SizesRoute;
