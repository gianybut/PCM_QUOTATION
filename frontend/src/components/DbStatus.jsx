import { useState, useEffect } from "react";
import axios from "axios";

const DbStatus = () => {
  const BACKEND_SERVER_URL = "http://localhost:6942";
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      axios
        .get(`${BACKEND_SERVER_URL}/db-status`)
        .then((res) => setConnected(res.data.connected))
        .catch(() => setConnected(false));
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-2 right-2 non-printable flex items-center gap-1 text-xs bg-white/80 px-2 py-1 rounded shadow-sm z-50">
      <span
        className={`inline-block w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
      />
      <span className="text-gray-600">
        DB: {connected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default DbStatus;
