import axios from "axios";
import React, { useState } from "react";

const ProductSizeModal = ({ onClose, changeModalSignal }) => {
  const [productSize, setProductSize] = useState("");
  const [sizeForType, setSizeForType] = useState("PERFUME");

  const addSize = async (newSizeName, newSizeForType) => {
    await axios
      .post("http://localhost:6942/sizes/create", {
        sizeName: newSizeName,
        sizeFor: newSizeForType,
      })
      .then((result) => {
        if (result) alert("ADDED NEW SIZE");
        else alert("Size already exists.");
      })
      .catch((error) => {
        alert("FAILED TO ADD NEW SIZE, REFRESH PAGE");
        window.location.reload();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sizeToAdd = productSize.trim();
    const newSizeForType = sizeForType.trim();
    if (sizeToAdd === "" || newSizeForType === "") {
      alert("Please enter requirements.");
      return;
    }
    await addSize(sizeToAdd, newSizeForType);
    onClose(); // Close modal or go back
    window.location.reload();
  };

  const handleClose = () => {
    if (onClose) {
      onClose(false); // If onClose function is provided, execute it
    } else {
      window.location.href = "./App.jsx"; // Otherwise, go back to the previous page
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-112 p-6">
        <div className="flex align-text-bottom justify-between mb-6 py-3">
          <h3 className="text-xl font-bold">Create New Size</h3>
          <a
            className="underline text-blue-400 my-auto hover:cursor-pointer"
            onClick={changeModalSignal}
          >
            Create Product instead?
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Size</label>
            <input
              type="text"
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              placeholder="Enter Size"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Size for what Product Type
            </label>
            <select
              value={sizeForType}
              onChange={(e) => {
                setSizeForType(e.target.value);
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="PERFUME">PERFUME</option>
              <option value="CAR DIFFUSER">CAR DIFFUSER</option>
              <option value="ALCOHOL">ALCOHOL</option>
              <option value="DISH WASHER">DISH WASHER</option>
              <option value="COLOGNE">COLOGNE</option>
              <option value="FABRIC CONDITIONER">FABRIC CONDITIONER</option>
              <option value="HAND SOAP">HAND SOAP</option>
              <option value="MISCELLANEOUS">MISCELLANEOUS</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Create Size
            </button>

            <button
              type="button"
              onClick={handleClose} // Use handleClose instead of onClose directly
              className="flex-1 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSizeModal;
