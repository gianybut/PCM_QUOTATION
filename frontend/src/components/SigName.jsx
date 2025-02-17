import { useState } from 'react';

const SigName = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('GLEICEL D. TAGLE');
  const [lastName, setLastName] = useState('ADMIN HEAD');
  const [tempFirst, setTempFirst] = useState(firstName);
  const [tempLast, setTempLast] = useState(lastName);

  const handleSave = () => {
    setFirstName(tempFirst);
    setLastName(tempLast);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempFirst(firstName);
    setTempLast(lastName);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sig-name">
      {!isEditing ? (
        <div className="flex items-start">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{firstName}</span>
            <br/>
            <span className="text-sm font-medium">{lastName}</span>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="ml-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded non-printable"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4 non-printable">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={tempFirst}
              onChange={(e) => setTempFirst(e.target.value)}
              placeholder="Full Name"
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <input
              type="text"
              value={tempLast}
              onChange={(e) => setTempLast(e.target.value)}
              placeholder="Position"
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SigName;