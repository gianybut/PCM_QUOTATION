import React, { useState } from "react";

const TableRow = ({ rowId }) => {
  const [rowQuantity, setRowQuantity] = useState(1);
  return (
    <>
      <tr key={rowId}>
        <td className="border p-2">
          <input
            type="number"
            min="1"
            value={rowQuantity}
            onChange={(e) => {
              setRowQuantity(parseInt(e.target.value) || 1);
            }}
            className="w-20 p-1 border rounded"
          />
        </td>
        <td className="border p-2">
          y
          {/* <Dropdown
          label="Select Size"
          options={options}
          onSelect={(selectedOption) =>
            handleSelectSize(row.id, selectedOption)
          }
          valueKey="value"
          labelKey="label"
        /> */}
        </td>
        <td className="border p-2">
          y
          {/* <Dropdown
          label="Select Product"
          options={productNames}
          onSelect={(selectedProduct) =>
            handleSelectProduct(row.id, selectedProduct)
          }
        /> */}
        </td>
        <td className="border p-2">
          ₱
          <input type="number" className="text-center" />
        </td>
        <td className="border p-2">₱{/*row.total*/}</td>
        <td className="border p-2 non-printable">
          <button
            onClick={() => {
              // removeRow(row.id)
            }}
            className="px-2 py-1 text-sm text-red-600 hover:text-red-800 non-printable"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
