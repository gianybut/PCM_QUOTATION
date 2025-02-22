import Header from "./components/Header.jsx";
import ModeOfPayment from "./components/PaymentDropdown.jsx";
import UserForm from "./components/UserForm.jsx";
import BottomText from "./components/BottomText.jsx";
import Signature from "./components/Signature.jsx";
import SigName from "./components/SigName.jsx";
import PrintBtn from "./components/PrintBtn.jsx";
import MainTable from "./components/MainTable.jsx";
import ProductModal from "./components/ProductModal.jsx";
import AddNewProduct from "./components/AddNewProduct.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewSize from "./components/AddNewSize.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import DeleteSize from "./components/DeleteSize.jsx";

const App = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";

  // open modal sample
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    document.title = "PCM Quotation System";
  }, []);

  useEffect(() => {
    // Retrieve products
    axios
      .get(`${BACKEND_SERVER_URL}/products`)
      .then((productsRetrieveResult) => {
        const sortedProducts = productsRetrieveResult.data["data"].sort(
          (a, b) => a["productType"].localeCompare(b["productType"])
        );
        setProducts(sortedProducts);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
    // Retrieve sizes
    axios
      .get(`${BACKEND_SERVER_URL}/sizes`)
      .then((sizesRetrieveResult) => {
        const sortedSizes = sizesRetrieveResult.data["data"].sort((a, b) =>
          a["sizeName"].localeCompare(b["sizeName"])
        );
        setSizes(sortedSizes);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
  }, []);

  return (
    <div className="app-container container-xl px-4">
      <Header />

      <div className="">
        <UserForm />
      </div>

      <div className="flex justify-center gap-16 items-center mx-auto my-4">
        <AddNewProduct />
        <AddNewSize />
        <DeleteProduct products={products} />
        <DeleteSize sizes={sizes} />
        <PrintBtn />
      </div>

      <div className="flex flex-row items-center">
        <MainTable products={products} sizes={sizes} />
      </div>

      <ModeOfPayment />
      <BottomText />
      <Signature />
      <SigName />
    </div>
  );
};

export default App;
