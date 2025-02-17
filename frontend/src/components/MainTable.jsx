import React, { useState } from "react";
import Dropdown from "./DropdownMenu";
import useAddSize from "../hooks/addSize";
import useAddProductName from "../hooks/addProductName";

const MainTable = () => {
  // Sizes and prices
  const [options, addSize] = useAddSize([
    { label: "1 Liter", value: 100 },
    { label: "500ml", value: 50 },
    { label: "250ml", value: 25 },
  ]);

  // Product names
  const [productNames, addProductName] = useAddProductName([
    { label: "Product A" },
    { label: "Product B" },
    { label: "Product C" },
  ]);

  const [newProductName, setNewProductName] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Table rows state
  const [rows, setRows] = useState([
    { id: 1, quantity: 1, unit: null, description: null, pricePerUnit: 0, total: 0 },
  ]);

  // Handle selecting a size
  const handleSelectSize = (rowId, selectedOption) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            unit: selectedOption, // Store the selected unit
            pricePerUnit: selectedOption.value, // Update price per unit
            total: row.quantity * selectedOption.value, // Recalculate total
          };
        }
        return row;
      })
    );
  };

  // Handle selecting a product
  const handleSelectProduct = (rowId, selectedProduct) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, description: selectedProduct.label } : row
      )
    );
  };

  // Handle quantity change
  const updateRow = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };
          if (field === "quantity") {
            updatedRow.total = value * row.pricePerUnit;
          }
          return updatedRow;
        }
        return row;
      })
    );
  };

  // Add a new row
  const addRow = () => {
    const newId = Math.max(...rows.map((row) => row.id)) + 1;
    setRows([...rows, { id: newId, quantity: 1, unit: null, description: null, pricePerUnit: 0, total: 0 }]);
  };

  // Remove a row
  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Add new product name
  const handleAddProductName = () => {
    if (addProductName(newProductName)) {
      setNewProductName("");
    }
  };

  // Add new size and price
  const handleAddSize = () => {
    if (addSize(newSize, newPrice)) {
      setNewSize("");
      setNewPrice("");
    }
  };

  // Add new product and size
  const addNewProduct = () => {
    handleAddSize();
    handleAddProductName();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Units</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Price per Unit</th>
            <th className="border p-2 text-left">Total</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border p-2">
                <input
                  type="number"
                  min="1"
                  value={row.quantity}
                  onChange={(e) => updateRow(row.id, "quantity", parseInt(e.target.value) || 0)}
                  className="w-20 p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <Dropdown
                  label="Select Size"
                  options={options}
                  onSelect={(selectedOption) => handleSelectSize(row.id, selectedOption)}
                  valueKey="value"
                  labelKey="label"
                />
              </td>
              <td className="border p-2">
                <Dropdown
                  label="Select Product"
                  options={productNames}
                  onSelect={(selectedProduct) => handleSelectProduct(row.id, selectedProduct)}
                />
              </td>
              <td className="border p-2">${row.pricePerUnit}</td>
              <td className="border p-2">${row.total}</td>
              <td className="border p-2">
                <button
                  onClick={() => removeRow(row.id)}
                  className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Row
        </button>
      </div>

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Grand Total: ${rows.reduce((sum, row) => sum + row.total, 0)}
        </p>
      </div>

      {/* Input fields for new size and price */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">New Size:</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-48"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">New Price:</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-48"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">New Product Name:</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-48"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <button
        onClick={addNewProduct}
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md"
      >
        Add New Product
      </button>
    </div>
  );
};

export default MainTable;