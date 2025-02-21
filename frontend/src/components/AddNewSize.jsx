import React, { useState } from "react";
import ProductSizeModal from "./ProductSizeModal";

const AddNewSize = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-48 h-24 p-4">
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-blue-500 text-white p-2 rounded non-printable"
      >
        Add New Size
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 rounded shadow-md">
            <ProductSizeModal />
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

export default AddNewSize;