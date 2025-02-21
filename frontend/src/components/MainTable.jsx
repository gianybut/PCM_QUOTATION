import { useEffect, useId, useState } from "react";
import Dropdown from "./DropdownMenu";
import useAddSize from "../hooks/addSize";
import useAddProductName from "../hooks/addProductName";
import TableRow from "./TableRow.jsx";
import axios from "axios";

const MainTable = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [rows, setRows] = useState([{ id: crypto.randomUUID(), total: 0 }]);

  useEffect(() => {
    // Retrieve products
    axios
      .get(`${BACKEND_SERVER_URL}/products`)
      .then((productsRetrieveResult) => {
        const sortedProducts = productsRetrieveResult.data["data"].sort(
          (a, b) => a["productType"].localeCompare(b["productType"])
        );
        setProducts(sortedProducts);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
    // Retrieve sizes
    axios
      .get(`${BACKEND_SERVER_URL}/sizes`)
      .then((sizesRetrieveResult) => {
        const sortedSizes = sizesRetrieveResult.data["data"].sort((a, b) =>
          a["sizeName"].localeCompare(b["sizeName"])
        );
        setSizes(sortedSizes);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
  }, []);

  const addRow = () => {
    setRows((prev) => [...prev, { id: crypto.randomUUID(), total: 0 }]);
  };

  const deleteRow = (rowId) => {
    setRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const updateTotal = (rowId, newTotal) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, total: newTotal } : row))
    );
  };

  const grandTotal = rows.reduce((sum, row) => sum + (row.total || 0), 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Quantity</th>
            <th className="border p-2 text-center">Units</th>
            <th className="border p-2 text-center">Description</th>
            <th className="border p-2 text-center">Price per Unit</th>
            <th className="border p-2 text-center">Total</th>
            <th className="border p-2 text-center non-printable">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((currentRow) => (
            <TableRow
              key={currentRow.id}
              rowId={currentRow.id}
              rowDeleteHandler={deleteRow}
              updateRowValue={updateTotal}
              sizes={sizes}
              products={products}
            />
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full non-printable"
        >
          Add Row
        </button>
      </div>
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Grand Total: ₱{grandTotal}</p>
      </div>
    </div>
  );
};

export default MainTable;
