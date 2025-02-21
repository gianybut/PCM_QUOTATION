import React, { useState } from "react";
import MOCK_DATA from "../MOCK_DATA.json";
import axios from "axios";

const ProductModal = ({ onClose }) => {
  const [products, setProducts] = useState(MOCK_DATA);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("perfume");
  const [sizes, setSizes] = useState([{ size: "", unit: "ml", price: "" }]);

  const generateProductId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const addProduct = async (newProductName, newProductType) => {
    const addProductResult = await axios.post(
      "http://localhost:6942/products/create",
      { productName: newProductName, productType: newProductType }
    );

    if (addProductResult) {
      alert("ADDED NEW PRODUCT");
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName: productName,
      productType: productType,
    };
    await addProduct(productName, productType);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setProductName("");
    setProductType("perfume");
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
              onClick={handleSubmit}
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={(e) => onClose(false)}
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
