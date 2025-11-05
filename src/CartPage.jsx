import React, { useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import HomeButton from "./HomeButton";

function CartPage({ cart, setCart, setItems }) {
  const [customerName, setCustomerName] = useState("");

  const handleGenerateReceipt = () => {
    if (!customerName.trim()) return alert("Please enter a customer name!");
    if (cart.length === 0) return alert("Cart is empty!");

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newTransaction = {
      id: "TXN" + Date.now(),
      customer: customerName.trim(),
      date: new Date().toLocaleString(),
      items: cart,
      total: totalAmount,
    };

    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem(
      "transactions",
      JSON.stringify([newTransaction, ...existing])
    );

    setCart([]);
    setCustomerName("");
    alert("✅ Transaction saved!");
  };

  return (
    <BackgroundWrapper>
      <HomeButton>
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border border-gray-500 bg-[#2b2b2b] text-gray-100 px-3 py-2 rounded w-1/2"
        />
        <button
          onClick={handleGenerateReceipt}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Receipt
        </button>
      </div>
      {/* ... rest of your cart content ... */}
    </div>
    </HomeButton>
    </BackgroundWrapper>
  );
}

export default CartPage;
