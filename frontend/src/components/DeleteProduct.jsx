import React, { useState } from "react";
import DeleteProductModal from "./DeleteProductModal.jsx";

const DeleteProduct = ({ products }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white p-2 rounded non-printable"
        >
          Delete a Product
        </button>

        {showModal && (
          <div className="">
            <div className="p-4 rounded shadow-md">
              <DeleteProductModal onClose={setShowModal} products={products} />
              <button
                onClick={(e) => setShowModal(false)}
                className="mt-4 bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteProduct;
