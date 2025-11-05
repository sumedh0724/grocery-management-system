import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "./HomeButton";
import BackgroundWrapper from "./BackgroundWrapper";

function AddItemPage({ items, setItems }) {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
    unit: "pcs",
    expiry: "",
  });
  const [message, setMessage] = useState("");

  const unitOptions = ["pcs", "kg", "litre", "g", "ml", "packet"];

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.price || !newItem.quantity) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    const formattedItem = {
      name: newItem.name.trim(),
      price: parseFloat(newItem.price),
      quantity: parseFloat(newItem.quantity),
      expiry: newItem.expiry || null,
      unit: newItem.unit || "pcs",
    };

    const exists = items.find(
      (i) =>
        i.name === formattedItem.name &&
        i.price === formattedItem.price &&
        i.expiry === formattedItem.expiry &&
        i.unit === formattedItem.unit
    );

    if (exists) {
      setItems((prev) =>
        prev.map((i) =>
          i.name === formattedItem.name &&
          i.price === formattedItem.price &&
          i.expiry === formattedItem.expiry &&
          i.unit === formattedItem.unit
            ? { ...i, quantity: i.quantity + formattedItem.quantity }
            : i
        )
      );
      setMessage("✅ Existing item updated.");
    } else {
      setItems((prev) => [...prev, formattedItem]);
      setMessage("✅ New item added successfully!");
    }

    // Reset input fields
    setNewItem({ name: "", price: "", quantity: "", unit: "pcs", expiry: "" });
  };

  return (
    <BackgroundWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className=" bg-zinc-300 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          ➕ Add New Item
        </h1>

        {message && (
          <div className="text-center text-green-700 mb-4 font-medium">{message}</div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border px-3 py-2 rounded text-zinc-900"
          />

          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border px-3 py-2 rounded text-zinc-900"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="border px-3 py-2 rounded text-zinc-900"
          />

          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="border px-3 py-2 rounded text-zinc-900"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Add Expiry Date:
            </label>
            <input
              type="date"
              value={newItem.expiry || ""}
              onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
              className="border px-2 py-1 rounded text-sm w-40 text-zinc-400"
            />
          </div>

          <button
            onClick={handleAddNewItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Item
          </button>

          <Link
            to="/stock"
            className="text-blue-600 text-center mt-2 hover:underline"
          >
            ← Back to Stock
          </Link>
        </div>
      </div>
      <HomeButton/>
    </div>
    </BackgroundWrapper>
  );
}

export default AddItemPage;
