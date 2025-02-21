import React, { useState } from "react";

const ProductSizeModal = ({ onClose, onSave }) => {
  const [productSize, setProductSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productSize.trim() === "") {
      alert("Please enter a valid product size.");
      return;
    }
    onSave(productSize);
    onClose();
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
              onClick={onClose}
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