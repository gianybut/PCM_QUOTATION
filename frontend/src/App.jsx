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
import axios from "axios";
import DeleteProduct from "./components/DeleteProduct.jsx";
import DeleteSize from "./components/DeleteSize.jsx";
import DbStatus from "./components/DbStatus.jsx";
import iconUrl from "./img/pcm_logo.jpg"

let startupAlertShown = false;

const App = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";

  // open modal sample
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  // Send a heartbeat to the backend every 3 seconds to keep servers alive.
  // If the browser tab is closed, the heartbeats stop and servers will auto-exit after 90 seconds.
  useEffect(() => {
    const sendHeartbeat = () => {
      axios.post(`${BACKEND_SERVER_URL}/heartbeat`).catch(() => {});
    };
    sendHeartbeat(); // send immediately
    const interval = setInterval(sendHeartbeat, 3000);

    // When tab becomes visible again, immediately re-sync heartbeat
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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

    const fetchData = (dataRetries = 0) => {
      Promise.all([
        axios.get(`${BACKEND_SERVER_URL}/products`),
        axios.get(`${BACKEND_SERVER_URL}/sizes`),
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
        })
        .catch(() => {
          if (dataRetries < 15) {
            setTimeout(() => fetchData(dataRetries + 1), 1000);
          }
        });
    };

    const waitForDb = () => {
      axios
        .get(`${BACKEND_SERVER_URL}/db-status`)
        .then((response) => {
          if (response.data.connected) {
            if (!startupAlertShown) {
              startupAlertShown = true;
              alert("Connected to cloud database successfully.");
            }
            fetchData();
          } else {
            dbRetries++;
            if (dbRetries < dbMaxRetries) {
              setTimeout(waitForDb, 3000);
            } else {
              fetchData();
            }
          }
        })
        .catch(() => {
          dbRetries++;
          if (dbRetries < dbMaxRetries) {
            setTimeout(waitForDb, 3000);
          } else {
            fetchData();
          }
        });
    };

    setTimeout(waitForDb, 2000);
  }, []);

  // Refetch data from cloud when DB reconnects after a disconnect
  const prevConnected = useRef(null);
  useEffect(() => {
    const checkAndRefetch = () => {
      axios
        .get(`${BACKEND_SERVER_URL}/db-status`)
        .then((res) => {
          const isConnected = res.data.connected;
          if (isConnected && prevConnected.current === false) {
            Promise.all([
              axios.get(`${BACKEND_SERVER_URL}/products`),
              axios.get(`${BACKEND_SERVER_URL}/sizes`),
            ])
              .then(([productsRes, sizesRes]) => {
                const sortedProducts = productsRes.data["data"].sort(
                  (a, b) => a["productType"].localeCompare(b["productType"])
                );
                setProducts(sortedProducts);
                const sortedSizes = sizesRes.data["data"].sort((a, b) =>
                  a["sizeFor"].localeCompare(b["sizeFor"])
                );
                setSizes(sortedSizes);
              })
              .catch(() => {});
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
      <DbStatus />
    </div>
  );
};

export default App;
