import React, { useId, useState } from "react";
import axios from "axios";

const DeleteProductModal = ({ onClose, products }) => {
  const BACKEND_URL = "http://localhost:6942";

  const deleteProduct = async (productId) => {
    await axios
      .delete(`${BACKEND_URL}/products/delete/${productId}`)
      .then((result) => {
        alert("REMOVED PRODUCT SUCCESSFULLY.");
      })
      .catch((error) => {
        alert("ERROR IN DELETING PRODUCT");
      });
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg w-[75%] p-6 overflow-y-scroll max-h-[75%]">
        <h3 className="text-xl font-bold mb-4 text-center">Delete a Product</h3>

        <div className="">
          {products.map((product) => {
            console.log(product);
            return (
              <div
                key={product["_id"]}
                className="border py-2 px-4 flex justify-between"
              >
                <span>{product["productName"]}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(product["_id"])}
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

export default DeleteProductModal;
