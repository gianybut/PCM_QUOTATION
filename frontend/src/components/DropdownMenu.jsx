import React, { useState } from "react";

const DropdownMenu = ({
  label = "Select",
  options = [],
  onSelect,
  defaultValue,
  valueKey = "value",
  labelKey = "label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const getDisplayText = (option) => {
    if (!option) return label;
    if (typeof option === "object") {
      return option[labelKey];
    }
    return option;
  };

  return (
    <div className="inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
      >
        {getDisplayText(selected)}
      </button>

      {isOpen && Array.isArray(options) && options.length > 0 && (
        <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 focus:outline-none"
              >
                <span>{getDisplayText(option)}</span>
                {option[valueKey] && (
                  <span className="float-right text-gray-500">
                    ₱{option[valueKey]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
