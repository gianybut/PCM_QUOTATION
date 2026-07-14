import Header from "./components/Header.jsx";
import ModeOfPayment from "./components/PaymentDropdown.jsx";
import UserForm from "./components/UserForm.jsx";
import BottomText from "./components/BottomText.jsx";
import Signature from "./components/Signature.jsx";
import SigName from "./components/SigName.jsx";
import PrintBtn from "./components/PrintBtn.jsx";
import MainTable from "./components/MainTable.jsx";
import AddNewProductBtn from "./components/AddNewProductBtn.jsx";
import { useEffect, useState, useRef } from "react";
import api, { BACKEND_SERVER_URL } from "./config.js";
import DeleteProduct from "./components/DeleteProduct.jsx";
import DbStatus from "./components/DbStatus.jsx";
import iconUrl from "./img/pcm_logo.jpg"

const App = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [dbConnected, setDbConnected] = useState(false);
  const startupAlertShown = useRef(false);

  const fetchProductsAndSizes = () => {
    return Promise.all([
      api.get("/products"),
      api.get("/sizes"),
    ])
      .then(([productsResponse, sizesResponse]) => {
        const sortedProducts = productsResponse.data["data"].sort(
          (a, b) => a["productType"].localeCompare(b["productType"])
        );
        setProducts(sortedProducts);
        const sortedSizes = sizesResponse.data["data"].sort((a, b) =>
          a["sizeFor"].localeCompare(b["sizeFor"])
        );
        setSizes(sortedSizes);
      });
  };

  // Send heartbeats every 3s to keep the backend alive.
  // On tab close, send shutdown beacon via sendBeacon.
  useEffect(() => {
    const sendHeartbeat = () => {
      api.post("/heartbeat").catch(() => {});
    };
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 3000);

    const onBeforeUnload = () => {
      navigator.sendBeacon(`${BACKEND_SERVER_URL}/shutdown`, "");
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    document.title = "PCM Quotation System";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = iconUrl;
    }
  }, []);

  useEffect(() => {
    let dbRetries = 0;
    const dbMaxRetries = 40;

    const fetchDataWithRetry = (dataRetries = 0) => {
      fetchProductsAndSizes().catch(() => {
        if (dataRetries < 15) {
          setTimeout(() => fetchDataWithRetry(dataRetries + 1), 1000);
        }
      });
    };

    const waitForDb = () => {
      api
        .get("/db-status")
        .then((response) => {
          const isConnected = response.data.connected;
          setDbConnected(isConnected);
          if (isConnected) {
            if (!startupAlertShown.current) {
              startupAlertShown.current = true;
              alert("Connected to cloud database successfully.");
            }
            fetchProductsAndSizes();
          } else {
            dbRetries++;
            if (dbRetries < dbMaxRetries) {
              setTimeout(waitForDb, 3000);
            } else {
              fetchProductsAndSizes();
            }
          }
        })
        .catch(() => {
          dbRetries++;
          if (dbRetries < dbMaxRetries) {
            setTimeout(waitForDb, 3000);
          } else {
            fetchProductsAndSizes();
          }
        });
    };

    setTimeout(waitForDb, 2000);
  }, []);

  const prevConnected = useRef(null);
  useEffect(() => {
    const checkAndRefetch = () => {
      api
        .get("/db-status")
        .then((res) => {
          const isConnected = res.data.connected;
          setDbConnected(isConnected);
          if (isConnected && prevConnected.current === false) {
            fetchProductsAndSizes();
          }
          prevConnected.current = isConnected;
        })
        .catch(() => {});
    };
    const interval = setInterval(checkAndRefetch, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container container-xl px-4">
      <Header />

      <div className="">
        <UserForm />
      </div>

      <div className="flex justify-center gap-16 items-center mx-auto my-4">
            <AddNewProductBtn onRefresh={fetchProductsAndSizes} />
            <DeleteProduct products={products} sizes={sizes} onRefresh={fetchProductsAndSizes} />
            <PrintBtn />
      </div>

      <div className="flex flex-row items-center">
        <MainTable products={products} sizes={sizes} />
      </div>

      <ModeOfPayment />
      <BottomText />
      <Signature />
      <SigName />
      <DbStatus connected={dbConnected} />
    </div>
  );
};

export default App;
