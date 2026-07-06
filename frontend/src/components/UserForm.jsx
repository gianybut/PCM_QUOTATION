import { useState } from "react";

const EditableText = ({ value, onChange, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start">
      {!isEditing ? (
        <>
          <p className={className}>{value}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-2 non-printable"
          >
            Edit
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-2 w-full non-printable">
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserForm = () => {
  const [greeting, setGreeting] = useState("Dear Customer,");
  const [intro, setIntro] = useState(
    "In the name of goodwill! We are pleased to quote you on your requirements for"
  );

  return (
    <div className="flex flex-col space-y-3 px-5">
      {/* Name Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="name" className="w-24 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="border-b-1 p-2 w-150 focus:ring-2 focus:ring-blue-500 user-input text-start!"
        />
      </div>

      {/* Address Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="address" className="w-24 font-semibold">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="border-b-1 p-2 w-150 focus:ring-2 focus:ring-blue-500 user-input text-start!"
        />
      </div>

      {/* Date Field */}
      <div className="flex items-center space-x-3">
        <label htmlFor="date" className="w-24 font-semibold">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="p-2 w-48 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Editable Text Fields */}
      <div className="space-y-3 mt-12">
        <EditableText
          value={greeting}
          onChange={setGreeting}
          className="font-bold"
        />

        <EditableText
          value={intro}
          onChange={setIntro}
          className="text-justify"
        />
      </div>
    </div>
  );
};

export default UserForm;
