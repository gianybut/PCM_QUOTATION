import Header from "./components/Header.jsx";
import ModeOfPayment from "./components/PaymentDropdown.jsx";
import UserForm from "./components/UserForm.jsx";
import BottomText from "./components/BottomText.jsx";
import Signature from "./components/Signature.jsx";
import SigName from "./components/SigName.jsx";
import PrintBtn from "./components/PrintBtn.jsx";
import MainTable from "./components/MainTable.jsx";
import AddNewProductBtn from "./components/AddNewProductBtn.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./components/DeleteProduct.jsx";
import DeleteSize from "./components/DeleteSize.jsx";
import iconUrl from "./img/pcm_logo.jpg"

const App = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";

  // open modal sample
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  // Send a heartbeat to the backend every 3 seconds to keep servers alive.
  // If the browser tab is closed, the heartbeats stop and servers will auto-exit.
  useEffect(() => {
    const sendHeartbeat = () => {
      axios.post(`${BACKEND_SERVER_URL}/heartbeat`).catch(() => {});
    };
    sendHeartbeat(); // send immediately
    const interval = setInterval(sendHeartbeat, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "PCM Quotation System";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = iconUrl;
    }
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
        alert("ERROR OCCURED! REFRESHING PAGE.");
        window.location.reload();
      });
    // Retrieve sizes
    axios
      .get(`${BACKEND_SERVER_URL}/sizes`)
      .then((sizesRetrieveResult) => {
        const sortedSizes = sizesRetrieveResult.data["data"].sort((a, b) =>
          a["sizeFor"].localeCompare(b["sizeFor"])
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
            <AddNewProductBtn />
            <DeleteProduct products={products} sizes={sizes} />
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
