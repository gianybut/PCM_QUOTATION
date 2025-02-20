import React, { useState } from "react";
import MOCK_DATA from "../MOCK_DATA.json";

const ProductModal = ({ onClose }) => {
  const [products, setProducts] = useState(MOCK_DATA);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("perfume");
  const [sizes, setSizes] = useState([{ size: "", unit: "ml", price: "" }]);

  const generateProductId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleAddSizeUnit = (e) => {
    e.preventDefault();
    setSizes([...sizes, { size: "", unit: "ml", price: "" }]);
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = sizes.map((size, i) => {
      if (i === index) {
        return { ...size, [field]: value };
      }
      return size;
    });
    setSizes(newSizes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create productSizes object from sizes array
    const productSizes = {};
    sizes.forEach(({ size, unit, price }) => {
      productSizes[`${size}${unit}`] = Number(price);
    });

    const newProduct = {
      productId: generateProductId(),
      productName,
      productType,
      productSizes,
    };

    // Add new product to the existing products array
    setProducts([...products, newProduct]);

    // Log the updated products array to see the changes
    console.log("Updated Products:", [...products, newProduct]);

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setProductName("");
    setProductType("perfume");
    setSizes([{ size: "", unit: "ml", price: "" }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-xl font-bold mb-4">Create New Product</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Product Type</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="perfume">PERFUME</option>
              <option value="carDiffuser">CAR DIFFUSER</option>
              <option value="alcohol">ALCOHOL</option>
              <option value="dishWasher">DISH WASHER</option>
              <option value="cologne">COLOGNE</option>
              <option value="fabCon">FABRIC CONDITIONER</option>
              <option value="handSoap">HAND SOAP</option>
              <option value="miscellaneous">MISCELLANEOUS</option>
            </select>
          </div>


          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
