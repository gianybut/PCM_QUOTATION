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

  // Connect to the backend keepalive stream to prevent automatic shutdown.
  // The connection is held open indefinitely to support idle background runs,
  // and closes instantly when the browser tab/window is closed.
  useEffect(() => {
    const eventSource = new EventSource(`${BACKEND_SERVER_URL}/keepalive`);

    eventSource.onerror = () => {
      console.warn("Keepalive stream disconnected. Browser will attempt to reconnect...");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    document.title = "PCM Quotation System";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = iconUrl;
    }
  }, []);

  // Poll database status. Transition from fast polling (3s) during startup retries
  // to slow polling (15s) in steady-state to avoid redundant network traffic.
  useEffect(() => {
    let timer = null;
    let retries = 0;
    const maxRetries = 40;
    let isInitialFetchDone = false;
    let isConnectedPreviously = null;

    const checkStatus = () => {
      api
        .get("/db-status")
        .then((response) => {
          const isConnected = response.data.connected;
          setDbConnected(isConnected);

          if (isConnected) {
            // Trigger fetch only if connectivity just changed to true, or on initial load
            if (isConnectedPreviously !== true) {
              fetchProductsAndSizes().catch(() => {});
            }
            if (!startupAlertShown.current) {
              startupAlertShown.current = true;
              alert("Connected to cloud database successfully.");
            }
            isConnectedPreviously = true;
            timer = setTimeout(checkStatus, 15000);
          } else {
            if (isConnectedPreviously === true) {
              console.log("Database connection lost. Falling back to local data.");
            }
            isConnectedPreviously = false;

            retries++;
            if (retries < maxRetries) {
              timer = setTimeout(checkStatus, 3000);
            } else {
              if (!isInitialFetchDone) {
                isInitialFetchDone = true;
                fetchProductsAndSizes().catch(() => {});
              }
              timer = setTimeout(checkStatus, 15000);
            }
          }
        })
        .catch(() => {
          isConnectedPreviously = false;
          retries++;
          if (retries < maxRetries) {
            timer = setTimeout(checkStatus, 3000);
          } else {
            if (!isInitialFetchDone) {
              isInitialFetchDone = true;
              fetchProductsAndSizes().catch(() => {});
            }
            timer = setTimeout(checkStatus, 15000);
          }
        });
    };

    timer = setTimeout(checkStatus, 2000);

    return () => clearTimeout(timer);
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
