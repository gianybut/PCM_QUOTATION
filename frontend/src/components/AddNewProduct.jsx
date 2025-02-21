import React, { useState } from "react";
import ProductModal from "./ProductModal";

const AddNewProduct = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded non-printable"
      >
        Add New Product
      </button>

      {showModal && (
        <div className="">
          <div className="p-4 rounded shadow-md">
            <ProductModal onClose={setShowModal} />
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
  );
};

export default AddNewProduct;
