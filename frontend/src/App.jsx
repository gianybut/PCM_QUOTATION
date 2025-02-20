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

const App = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    document.title = "PCM Quotation System";
    // Retrieve products
    axios
      .get(`${BACKEND_SERVER_URL}/products`)
      .then((productsRetrieveResult) => {
        setProducts(productsRetrieveResult.data["data"]);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
    // Retrieve sizes
    axios
      .get(`${BACKEND_SERVER_URL}/sizes`)
      .then((sizesRetrieveResult) => {
        setSizes(sizesRetrieveResult.data["data"]);
      })
      .catch((error) => {
        alert("ERROR OCCURED! REFRESH PAGE.");
      });
  }, []);

  return (
    <div className="app-container">
      <Header />
      <UserForm />

      <div className="flex flex-col justify-center items-center">
        <AddNewProduct />
      </div>

      <MainTable />
      <ModeOfPayment />
      <BottomText />
      <Signature />
      <SigName />
    </div>
  );
};

export default App;
