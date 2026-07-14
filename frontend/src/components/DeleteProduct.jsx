import { useState } from "react";
import DeleteProductModal from "./DeleteProductModal.jsx";
import DeleteSizeModal from "./DeleteSizeModal.jsx";

const DeleteProduct = ({ products, sizes, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState("Product");

  return (
    <>
      <div className="">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white p-2 rounded non-printable"
        >
          Delete a Product/Size
        </button>

        {showModal && (
          <div className="">
            <div className="p-4 rounded shadow-md">
              {currentModal == "Product" ? (
                <DeleteProductModal
                  onClose={setShowModal}
                  products={products}
                  changeModalSignal={() => {
                    setCurrentModal("Size");
                  }}
                  onProductDeleted={onRefresh}
                />
              ) : (
                <DeleteSizeModal
                  onClose={setShowModal}
                  sizes={sizes}
                  changeModalSignal={() => {
                    setCurrentModal("Product");
                  }}
                  onSizeDeleted={onRefresh}
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
    </>
  );
};

export default DeleteProduct;
