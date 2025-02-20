import React, { useState } from "react";

const TableBody = ({ TableRow }) => {
  const [rows, setRows] = useState(["whatThe", "eyy"]);

  const addRow = () => {
    setRows([...rows, crypto.randomUUID()]);
  };

  return (
    <>
      <tbody>
        {rows.map((rowId) => (
          <TableRow key={rowId} />
        ))}
      </tbody>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 non-printable"
        >
          Add Row
        </button>
      </div>
    </>
  );
};

export default TableBody;
