import React, { useState, useRef, useEffect } from "react";

const DropdownMenu = ({
  label = "Select",
  options = [],
  onSelect,
  defaultValue,
  valueKey = "value",
  labelKey = "label",
  dependencyValue = null,
  dependencyKey = null,
  hasSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || null);
  const dropdownRef = useRef(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filter]);

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
    <div className="inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {getDisplayText(selected)}
      </button>

      {isOpen && Array.isArray(options) && options.length > 0 && (
        <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg overflow-y-scroll max-h-60">
          <div className="py-1">
            {hasSearch ? (
              <div className="sticky top-0 bg-white z-10">
                <input
                  type="search"
                  className="p-1 block w-full text-sm focus:bg-gray-300 border"
                  placeholder="Search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            {options
              .filter((option) => {
                if (dependencyKey) {
                  return dependencyValue === option[dependencyKey];
                }

                return true;
              })
              .filter((option) => {
                if (hasSearch && filter !== "") {
                  return (
                    String(option[labelKey])
                      .toUpperCase()
                      .indexOf(String(filter).toUpperCase()) > -1
                  );
                }

                return true;
              })
              .map((option, index) => (
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
