import axios from "axios";
import React, { useState } from "react";

const ProductSizeModal = ({ onClose }) => {
  const [productSize, setProductSize] = useState("");

  const addSize = async (newSizeName) => {
    const addSizeResult = await axios.post(
      "http://localhost:6942/sizes/create",
      { sizeName: newSizeName }
    );

    if (addSizeResult) {
      alert("ADDED NEW SIZE");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sizeToAdd = productSize.trim();
    if (sizeToAdd === "") {
      alert("Please enter a valid product size.");
      return;
    }

    addSize(sizeToAdd);
    handleClose(); // Close modal or go back
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
      <div className="bg-white rounded-lg w-80 p-6">
        <h3 className="text-lg font-bold mb-4">Enter Product Size</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={productSize}
            onChange={(e) => setProductSize(e.target.value)}
            placeholder="Enter product size"
            className="w-full p-2 border rounded-md"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
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
