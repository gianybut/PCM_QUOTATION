import { readFileSync } from "fs";

import mongoose from "mongoose";

const PRODUCTS = JSON.parse(
  readFileSync(new URL("../PRODUCTS.json", import.meta.url), "utf8")
);
const SIZES = JSON.parse(
  readFileSync(new URL("../SIZES.json", import.meta.url), "utf8")
);

const createRecord = (record) => ({
  _id: new mongoose.Types.ObjectId().toString(),
  ...record,
});

const localProducts = PRODUCTS.map(createRecord);
const localSizes = SIZES.map(createRecord);

const clone = (value) => JSON.parse(JSON.stringify(value));

const findRecordIndex = (records, recordId) =>
  records.findIndex((record) => record._id === recordId);

export const LocalStore = {
  listProducts() {
    return clone(localProducts);
  },

  getProduct(productId) {
    const product = localProducts.find((record) => record._id === productId);
    return product ? clone(product) : null;
  },

  createProduct(productName, productType) {
    const existingProduct = localProducts.find(
      (record) => record.productName === productName
    );

    if (existingProduct) {
      return false;
    }

    localProducts.push(
      createRecord({
        productName,
        productType,
      })
    );

    return true;
  },

  updateProduct(productId, productDetails) {
    const productIndex = findRecordIndex(localProducts, productId);

    if (productIndex === -1) {
      return false;
    }

    localProducts[productIndex] = {
      ...localProducts[productIndex],
      ...productDetails,
    };

    return true;
  },

  deleteProduct(productId) {
    const productIndex = findRecordIndex(localProducts, productId);

    if (productIndex === -1) {
      return false;
    }

    localProducts.splice(productIndex, 1);
    return true;
  },

  listSizes() {
    return clone(localSizes);
  },

  getSize(sizeId) {
    const size = localSizes.find((record) => record._id === sizeId);
    return size ? clone(size) : null;
  },

  createSize(sizeName, sizeFor) {
    const existingSize = localSizes.find(
      (record) => record.sizeName === sizeName
    );

    if (existingSize) {
      return false;
    }

    localSizes.push(
      createRecord({
        sizeName,
        sizeFor,
      })
    );

    return true;
  },

  updateSize(sizeId, sizeDetails) {
    const sizeIndex = findRecordIndex(localSizes, sizeId);

    if (sizeIndex === -1) {
      return false;
    }

    localSizes[sizeIndex] = {
      ...localSizes[sizeIndex],
      ...sizeDetails,
    };

    return true;
  },

  deleteSize(sizeId) {
    const sizeIndex = findRecordIndex(localSizes, sizeId);

    if (sizeIndex === -1) {
      return false;
    }

    localSizes.splice(sizeIndex, 1);
    return true;
  },
};