import { useState } from "react";
import Dropdown from "./DropdownMenu";
import useAddSize from "../hooks/addSize";
import useAddProductName from "../hooks/addProductName";
import MOCK_DATA from "../MOCK_DATA.json"; // Import JSON data

const MainTable = ({ extractedProductNames, extractedSizes }) => {
  // // Extract product names and sizes from JSON
  // const extractedProductNames = MOCK_DATA.map((item) => ({
  //   label: item.productName,
  // }));

  // const extractedSizes = MOCK_DATA.flatMap((item) =>
  //   Object.entries(item.productSizes).map(([size, price]) => ({
  //     label: size,
  //     value: price,
  //   }))
  // );

  // Use extracted data
  const [options, addSize] = useAddSize(extractedSizes);
  const [productNames, addProductName] = useAddProductName(
    extractedProductNames
  );

  const [rows, setRows] = useState([
    {
      id: 1,
      quantity: 1,
      unit: null,
      description: null,
      pricePerUnit: 0,
      total: 0,
    },
  ]);

  // Handle selecting a size
  const handleSelectSize = (sizes) => {
    sizes.forEach(() => {});
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
    setRows([
      ...rows,
      {
        id: newId,
        quantity: 1,
        unit: null,
        description: null,
        pricePerUnit: 0,
        total: 0,
      },
    ]);
  };

  // Remove a row
  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
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
            <th className="border p-2 text-left non-printable">Actions</th>
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
                  onChange={(e) =>
                    updateRow(row.id, "quantity", parseInt(e.target.value) || 0)
                  }
                  className="w-20 p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <Dropdown
                  label="Select Size"
                  options={options}
                  onSelect={(selectedOption) =>
                    handleSelectSize(row.id, selectedOption)
                  }
                  valueKey="value"
                  labelKey="label"
                />
              </td>
              <td className="border p-2">
                <Dropdown
                  label="Select Product"
                  options={productNames}
                  onSelect={(selectedProduct) =>
                    handleSelectProduct(row.id, selectedProduct)
                  }
                />
              </td>
              <td className="border p-2">
                ₱
                <input type="number" className="text-center" />
              </td>
              <td className="border p-2">₱{row.total}</td>
              <td className="border p-2 non-printable">
                <button
                  onClick={() => removeRow(row.id)}
                  className="px-2 py-1 text-sm text-red-600 hover:text-red-800 non-printable"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div cl ssName="mt-4">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 non-printable"
        >
          Add Row
        </button>
      </div>

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Grand Total: ₱{rows.reduce((sum, row) => sum + row.total, 0)}
        </p>
      </div>
    </div>
  );
};

export default MainTable;
