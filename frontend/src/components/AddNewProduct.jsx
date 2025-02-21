import React, { useState } from "react";
import ProductModal from "./ProductModal";

const AddNewProduct = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-48 h-24 p-2">
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-blue-500 text-white p-2 rounded non-printable"
      >
        Add New Product
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 rounded shadow-md">
            <ProductModal />
            <button 
              onClick={() => setShowModal(false)} 
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