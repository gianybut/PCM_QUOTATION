import React, { useId, useState } from "react";
import axios from "axios";

const DeleteProductModal = ({ onClose, products }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg w-[75%] p-6 overflow-y-scroll max-h-[75%]">
        <h3 className="text-xl font-bold mb-4 text-center">Delete a Product</h3>

        <div className="">
          {products.map((product) => {
            console.log(product);
            return <div key={product["_id"]}>{product["productName"]}</div>;
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => onClose(false)}
        className="flex-1 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteProductModal;
