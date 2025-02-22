import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu.jsx";

const TableRow = ({
  rowId,
  rowDeleteHandler,
  updateRowValue,
  sizes,
  products,
}) => {
  const [rowQuantity, setRowQuantity] = useState(1);
  const [rowProductValue, setRowProductValue] = useState(0);
  const total = rowQuantity * rowProductValue;

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseFloat(e.target.value) || 1);
    setRowQuantity(newQuantity);
    updateRowValue(rowId, newQuantity * rowProductValue);
  };

  const handleProductValueChange = (e) => {
    const newValue = Math.max(0, parseFloat(e.target.value) || 0);
    setRowProductValue(newValue);
    updateRowValue(rowId, rowQuantity * newValue);
  };

  return (
    <tr className="">
      <td className="border p-2">
        <input
          type="number"
          min="1"
          step="1"
          value={parseInt(rowQuantity)}
          onChange={handleQuantityChange}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          className="w-20 p-1 border rounded"
        />
      </td>
      <td className="border p-2 text-center">
        <DropdownMenu label="Select Size" options={sizes} labelKey="sizeName" />
      </td>
      <td className="border p-2 text-center">
        <DropdownMenu
          label="Select Product"
          options={products}
          labelKey="productName"
        />
      </td>
      <td className="border p-1 text-center whitespace-nowrap">
        <span className="print:ml-4">₱</span>
        <input
          type="number"
          min="0"
          step="any"
          value={parseFloat(rowProductValue)}
          onChange={handleProductValueChange}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          className="text-center w-auto"
        />
      </td>
      <td className="border p-2 text-center">₱{total}</td>
      <td className="border p-2 non-printable">
        <button
          onClick={() => rowDeleteHandler(rowId)}
          className="px-2 py-1 text-sm text-red-600 hover:text-red-800 non-printable"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
