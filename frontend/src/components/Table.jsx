import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const Table = () => {
  // Sample initial data for dropdowns
  const [units, setUnits] = useState(['pieces', 'kg', 'meters', 'liters']);
  const [descriptions, setDescriptions] = useState(['Item A', 'Item B', 'Item C']);
  
  // State for new custom options
  const [newUnit, setNewUnit] = useState('');
  const [newDescription, setNewDescription] = useState('');
  
  // Sample table data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      quantity: 0,
      unit: '',
      description: '',
      pricePerUnit: 0,
      total: 0
    }
  ]);

  // Handle adding new units
  const handleAddUnit = () => {
    if (newUnit && !units.includes(newUnit)) {
      setUnits([...units, newUnit]);
      setNewUnit('');
    }
  };

  // Handle adding new descriptions
  const handleAddDescription = () => {
    if (newDescription && !descriptions.includes(newDescription)) {
      setDescriptions([...descriptions, newDescription]);
      setNewDescription('');
    }
  };

  // Handle row data changes
  const handleChange = (id, field, value) => {
    setTableData(prevData =>
      prevData.map(row => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };
          // Calculate total when quantity or price changes
          if (field === 'quantity' || field === 'pricePerUnit') {
            updatedRow.total = updatedRow.quantity * updatedRow.pricePerUnit;
          }
          return updatedRow;
        }
        return row;
      })
    );
  };

  // Add new row
  const addRow = () => {
    setTableData([
      ...tableData,
      {
        id: tableData.length + 1,
        quantity: 0,
        unit: '',
        description: '',
        pricePerUnit: 0,
        total: 0
      }
    ]);
  };

  // Delete row
  const deleteRow = (id) => {
    // Prevent deletion if it's the last row
    if (tableData.length === 1) return;
    
    setTableData(prevData => prevData.filter(row => row.id !== id));
  };

  // Format currency
  const formatPeso = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 non-printable">Inventory Table</h2>
        
        {/* Controls Container - Horizontal layout */}
        <div className="flex items-center gap-4 mb-4 non-printable">
          {/* Add Row Button */}
          <button
            onClick={addRow}
            className="bg-amber-300 text-black px-4 py-2 rounded hover:bg-amber-400"
          >
            Add Row
          </button>

          {/* Units Management */}
          <div className="flex items-center gap-2 non-printable">
            <input
              type="text"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="Add new unit"
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleAddUnit}
              className="bg-amber-300 text-black px-2 py-1 rounded hover:bg-amber-400"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Descriptions Management */}
          <div className="flex items-center gap-2 non-printable">
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Add new description"
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleAddDescription}
              className="bg-amber-300 text-black px-2 py-1 rounded hover:bg-amber-400"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

        {/* Table */}
      <div className="overflow-x-auto table-div">
        <table className="border-collapse border-hidden w-full bg-white shadow-md table-auto overflow-hidden rounded-lg">
          <thead>
            <tr className="bg-amber-300 border-hidden">
              <th className="border p-2 border-hidden">Quantity</th>
              <th className="border p-2 border-hidden">Units</th>
              <th className="border p-2 border-hidden">Description</th>
              <th className="border p-2 border-hidden">Price Per Unit</th>
              <th className="border p-2 border-hidden">Total</th>
              <th className="border p-2 border-hidden non-printable">Actions</th>
            </tr>
          </thead>
          <tbody className='bg-slate-100 border-hidden table-auto overflow-hidden rounded-lg'>
            {tableData.map(row => (
              <tr key={row.id}>
                <td className="border p-2 border-hidden">
                  <input
                    type="number"
                    min="0"
                    value={row.quantity}
                    onChange={(e) => handleChange(row.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full p-1 border-b-1 text-center"
                  />
                </td>
                <td className="border p-2 border-hidden">
                  <select
                    value={row.unit}
                    onChange={(e) => handleChange(row.id, 'unit', e.target.value)}
                    className="w-full p-1 border-b-1 font-medium"
                  >
                    <option value="">Select Unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </td>
                <td className="border p-2 border-hidden">
                  <select
                    value={row.description}
                    onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                    className="w-full p-1 border-b-1 font-medium"
                  >
                    <option value="">Select Description</option>
                    {descriptions.map(desc => (
                      <option key={desc} value={desc}>{desc}</option>
                    ))}
                  </select>
                </td>
                <td className="border p-2 border-hidden">
                  <div className="flex items-center">
                    <span className="m-1">₱</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.pricePerUnit}
                      onChange={(e) => handleChange(row.id, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-b-1 text-center"
                    />
                  </div>
                </td>
                <td className="border p-2 border-hidden">
                  {formatPeso(row.total)}
                </td>
                <td className="border p-2 border-hidden">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="text-red-500 hover:text-red-900 p-1 non-printable"
                    disabled={tableData.length === 1}
                    title={tableData.length === 1 ? "Cannot delete last row" : "Delete row"}
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;