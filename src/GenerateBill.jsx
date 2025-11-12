import React, { useState } from "react";
import { jsPDF } from "jspdf";
import HomeButton from "./HomeButton";
import BackgroundWrapper from "./BackgroundWrapper";

function GenerateBill({ items, setItems }) {
  const [customer, setCustomer] = useState("");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({}); 
  const [removeQty, setRemoveQty] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  // Filtering stock items for searching
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.quantity > 0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // PDF Generator
  const generatePDF = () => {
  if (!customer || cart.length === 0) {
    alert("❌ Enter customer name and add items before generating bill.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("GROCERY BILL RECEIPT", 60, 15);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Customer: ${customer}`, 14, 30);
  doc.text(`Date: ${today}`, 150, 30);

  // Table Header
  doc.setFont("helvetica", "bold");
  doc.text("Item", 14, 45);
  doc.text("Qty", 80, 45);
  doc.text("Price", 110, 45);
  doc.text("Total", 150, 45);

  doc.setFont("helvetica", "normal");

  let y = 55;
  cart.forEach((item) => {
    doc.text(item.name, 14, y);
    doc.text(String(item.quantity), 85, y);
    doc.text(`Rs. ${item.price.toFixed(2)}`, 110, y);
    doc.text(`Rs. ${(item.price * item.quantity).toFixed(2)}`, 150, y);
    y += 8;
  });

  doc.setLineWidth(0.5);
  doc.line(10, y + 2, 200, y + 2);
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: Rs. ${totalAmount.toFixed(2)}`, 130, y + 12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for shopping with us!", 70, y + 25);
  doc.save(`Bill_${customer}_${today}.pdf`);

  // 💾 Save to Transaction History
  const newTransaction = {
    id: Date.now(),
    customer,
    date: today,
    total: parseFloat(totalAmount.toFixed(2)),
    items: cart.map((i) => ({
      name: i.name,
      unit: i.unit || "", // ✅ Added to match TransactionHistory view
      quantity: i.quantity,
      price: i.price,
    })),
  };

  try {
    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    existing.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(existing));
    console.log("✅ Transaction saved:", newTransaction);
  } catch (e) {
    console.error("❌ Error saving transaction:", e);
  }

  // 🧹 Reset cart & customer
  setCart([]);
  setCustomer("");
  setMessage(`🧾 Bill saved for ${customer}.`);
};


  // Restore stock helper
  const restoreStock = (item, qty) => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === item.name &&
        i.price === item.price &&
        i.expiry === item.expiry
          ? { ...i, quantity: i.quantity + qty }
          : i
      )
    );
  };

  // Partial remove from cart
  const handlePartialRemove = (item, qtyToRemove) => {
    if (qtyToRemove <= 0 || qtyToRemove > item.quantity) {
      alert("⚠️ Invalid quantity to remove!");
      return;
    }

    restoreStock(item, qtyToRemove);

    setCart((prev) =>
      prev
        .map((i) =>
          i.name === item.name &&
          i.price === item.price &&
          i.expiry === item.expiry
            ? { ...i, quantity: i.quantity - qtyToRemove }
            : i
        )
        .filter((i) => i.quantity > 0)
    );

    setMessage(`➖ Removed ${qtyToRemove} ${item.unit} of ${item.name} from bill.`);
  };

  // Removinh item fully
  const handleRemoveAll = (item) => {
    restoreStock(item, item.quantity);
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.name === item.name &&
            i.price === item.price &&
            i.expiry === item.expiry
          )
      )
    );
    setMessage(`🗑️ Removed all of ${item.name} from bill.`);
  };

  // Add item to bill
  const handleAdd = (item, qty) => {
    if (qty <= 0) {
      alert("❌ Quantity must be greater than 0.");
      return;
    }
    if (qty > item.quantity) {
      alert("⚠️ Not enough stock available!");
      return;
    }

    const existing = cart.find(
      (c) =>
        c.name === item.name &&
        c.price === item.price &&
        c.expiry === item.expiry
    );

    if (existing) {
      setCart(
        cart.map((c) =>
          c.name === item.name &&
          c.price === item.price &&
          c.expiry === item.expiry
            ? { ...c, quantity: c.quantity + qty }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: qty }]);
    }

    // REmove stock
    setItems((prev) =>
      prev.map((i) =>
        i.name === item.name &&
        i.price === item.price &&
        i.expiry === item.expiry
          ? { ...i, quantity: i.quantity - qty }
          : i
      )
    );

    setQuantities((prev) => ({ ...prev, [item.name]: 1 })); // reset input
    setMessage(`✅ Added ${qty} ${item.unit} of ${item.name} to bill.`);
  };

  return (
    <BackgroundWrapper>
      <div className="max-w-4xl mx-auto p-6 pt-20 text-gray-100">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          🧾 Generate Bill
        </h1>

        {/* Customer input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="border px-3 py-2 rounded w-full text-gray-900"
          />
        </div>

        {/* Search bar*/}
        <input
          type="text"
          placeholder="Search items from stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-6 text-gray-900"
        />

        {message && (
          <div className="text-center text-green-400 mb-4 font-medium">
            {message}
          </div>
        )}

        {/* Available Stock List */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-400">No matching items found.</p>
        ) : (
          filteredItems.map((item, idx) => {
            const qty = quantities[item.name] || 1;

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-center border border-white/20 p-3 rounded mb-2 bg-white/10"
              >
                <div className="flex-1">
                  <p className="font-semibold text-blue-300">{item.name}</p>
                  <p className="text-sm text-gray-300">
                    Rs. {item.price} | In Stock: {item.quantity} {item.unit} | Exp:{" "}
                    {item.expiry || "—"}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={qty}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [item.name]: Number(e.target.value),
                      }))
                    }
                    className="border border-gray-400 text-gray-900 px-2 py-1 rounded w-20"
                  />
                  <button
                    onClick={() => handleAdd(item, qty)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="mt-8 bg-white/10 border border-white/10 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">
              🛒 Current Bill
            </h2>
            <table className="w-full text-sm text-gray-100">
              <thead className="text-blue-300 border-b border-white/20">
                <tr>
                  <th className="text-left py-2">Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {

                  return (
                    <tr key={idx} className="border-b border-white/10">
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">Rs. {item.price}</td>
                      <td className="text-center">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-center flex justify-center items-center gap-2 py-1">
                        <input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={removeQty}
                          onChange={(e) => setRemoveQty(Number(e.target.value))}
                          className="border border-gray-400 text-gray-900 px-2 py-1 rounded w-16"
                        />
                        <button
                          onClick={() => handlePartialRemove(item, removeQty)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs"
                        >
                          ➖ Partial
                        </button>
                        <button
                          onClick={() => handleRemoveAll(item)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                        >
                          ❌ All
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-right text-lg font-semibold text-blue-400 mt-4">
              Total: Rs. {totalAmount.toFixed(2)}
            </div>
          </div>
        )}

        {/* Generate Bill Button */}
        <div className="text-center mt-8">
          <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg"
          >
            📄 Generate PDF Bill
          </button>
        </div>

        <HomeButton />
      </div>
    </BackgroundWrapper>
  );
}

export default GenerateBill;
