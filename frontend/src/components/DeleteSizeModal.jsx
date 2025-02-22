import React, { useId, useState } from "react";
import axios from "axios";

const DeleteSizeModal = ({ onClose, sizes }) => {
  const BACKEND_URL = "http://localhost:6942";

  const deleteSize = async (sizeId) => {
    await axios
      .delete(`${BACKEND_URL}/sizes/delete/${sizeId}`)
      .then((result) => {
        alert("REMOVED SIZE SUCCESSFULLY.");
      })
      .catch((error) => {
        alert("ERROR IN DELETING SIZE");
      });
  };

  const handleDelete = async (sizeId) => {
    await deleteSize(sizeId);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg w-[75%] p-6 overflow-y-scroll max-h-[75%]">
        <h3 className="text-xl font-bold mb-4 text-center">Delete a Size</h3>

        <div className="">
          {sizes.map((size) => {
            console.log(size);
            return (
              <div
                key={size["_id"]}
                className="border py-2 px-4 flex justify-between"
              >
                <span>{size["sizeName"]}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(size["_id"])}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => onClose(false)}
        className=" mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteSizeModal;
