import { useState } from "react";

const PaymentDropdown = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  return (
    <div className="space-x-3 justify-baseline m-1">
      <label className="font-semibold text-gray-700">Mode of Payment</label>
      <select
        className="border-b-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium mode-payment"
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
