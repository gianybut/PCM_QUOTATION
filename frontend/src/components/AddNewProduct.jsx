import React, { useState } from "react";
import ProductModal from "./ProductModal";
import ProductSizeModal from "./ProductSizeModal.jsx";

const AddNewProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState("Product");

  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded non-printable"
      >
        Add New Product/Size
      </button>

      {showModal && (
        <div className="">
          <div className="p-4 rounded shadow-md">
            {currentModal == "Product" ? (
              <ProductModal
                onClose={setShowModal}
                changeModalSignal={() => {
                  setCurrentModal("Size");
                }}
              />
            ) : (
              <ProductSizeModal
                onClose={setShowModal}
                changeModalSignal={() => {
                  setCurrentModal("Product");
                }}
              />
            )}

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
