import { useState } from "react";

const PaymentDropdown = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  return (
    <div className="flex items-center space-x-3 justify-baseline m-2 p-24">
      <label className="font-semibold text-gray-700">Mode of Payment</label>
      <select
        className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Gcash">Gcash</option>
      </select>
    </div>
  );
};

export default PaymentDropdown;
