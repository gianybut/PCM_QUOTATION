import mongoose from "mongoose";

import SizesModel from "../Model/SizesModel.js";
import { LocalStore } from "../Model/LocalStore.js";

class SizesController {
  static isDatabaseAvailable() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Retrieves all Sizes entries from the database.
   * @returns {Array<JSON> | null} An array containing JSONs, each JSON entry contains one Size details. Returns null instead if no sizes are found. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async showSizes() {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.listSizes();
    }

    try {
      const sizes = await SizesModel.find({});
      return sizes || null;
    } catch (error) {
      return LocalStore.listSizes();
    }
  }

  /**
   * Retrieves a Size entry from the database.
   * @param {string} sizeId - The sizeId of the size to show in string form,
   * @returns {JSON | null} The JSON entry of the retrieved size. Otherwise returns null if no size has been found. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async showOneSize(sizeId) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.getSize(sizeId);
    }

    try {
      const sizeToFind = await SizesModel.findById(sizeId);
      return sizeToFind || null;
    } catch (error) {
      return LocalStore.getSize(sizeId);
    }
  }

  /**
   * Creates a new size in the database. ENSURE PARAMETERS are sanitized (strings are trimmed or made sure they are string, etc.) first before calling this function.
   * @param {string} newSizeName - The name of the new size.
   * @param {string} newSizeFor - The product type intended for the size.
   * @returns {Boolean} true if operation succeeded in adding new size, otherwise false.
   */
  static async createSize(newSizeName, newSizeFor) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.createSize(newSizeName, newSizeFor);
    }

    const newSize = new SizesModel({
      sizeName: newSizeName,
      sizeFor: newSizeFor,
    });

    try {
      await newSize.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Deletes a Size entry from the database.
   * @param {string} sizeId - The sizeId of the size to be deleted in string form.
   * @returns {Boolean} true if the size is successfully deleted otherwise, returns false. WILL THROW ERROR IF OPERATION HAS FAILED.
   */
  static async deleteSize(sizeId) {
    if (!this.isDatabaseAvailable()) {
      return LocalStore.deleteSize(sizeId);
    }

    try {
      const sizeToDelete = await SizesModel.findByIdAndDelete(sizeId);
      return sizeToDelete ? true : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Updates the Size entry from the database matching the sizeId parameter.
   * @param {string} sizeId - The sizeId of the size to be updated in string form.
   * @param {string} newSizeName - The size's new name, set as null if doesn't need update.
   * @param {string} newSizeFor - The product type intended for the size. set as null if doesn't need update.
   * @returns {Boolean} true if the size is successfully update otherwise, returns false.
   */
  static async updateSize(sizeId, newSizeName = null, newSizeFor = null) {
    const sizeNewDetails = {};
    if (newSizeName) {
      sizeNewDetails["sizeName"] = newSizeName;
    }
    if (newSizeFor) {
      sizeNewDetails["sizeFor"] = newSizeFor;
    }

    if (!this.isDatabaseAvailable()) {
      return LocalStore.updateSize(sizeId, sizeNewDetails);
    }

    try {
      const sizeToUpdate = await SizesModel.findByIdAndUpdate(
        sizeId,
        sizeNewDetails
      );
      return sizeToUpdate ? true : false;
    } catch (error) {
      return false;
    }
  }
}

export default SizesController;
