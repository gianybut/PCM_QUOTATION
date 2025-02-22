import React, { useState } from "react";
import DeleteSizeModal from "./DeleteSizeModal.jsx";

const DeleteSize = ({ sizes }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white p-2 rounded non-printable"
        >
          Delete a Size
        </button>

        {showModal && (
          <div className="">
            <div className="p-4 rounded shadow-md">
              <DeleteSizeModal onClose={setShowModal} sizes={sizes} />
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

export default DeleteSize;
