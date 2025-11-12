import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeButton from "./HomeButton";
import BackgroundWrapper from "./BackgroundWrapper";

function StockPage({ items, setItems }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [today] = useState(new Date().toISOString().split('T')[0]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '', unit: 'pcs', expiry: '' });
  const [message, setMessage] = useState('');
  const [sortOption, setSortOption] = useState('name');

  const unitOptions = ['pcs', 'kg', 'litre', 'g', 'ml', 'packet'];

  const sortItems = (list) => {
    const sorted = [...list];
    if (sortOption === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === 'stock') sorted.sort((a, b) => b.quantity - a.quantity);
    else if (sortOption === 'expiry') {
      sorted.sort((a, b) => {
        if (!a.expiry) return 1;
        if (!b.expiry) return -1;
        return a.expiry.localeCompare(b.expiry);
      });
    }
    return sorted;
  };

  const filteredItems = sortItems(
    items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity > 0
    )
  );

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.price || !newItem.quantity) {
      setMessage('❌ Please fill in all item details.');
      return;
    }

    const formattedItem = {
      name: newItem.name.trim(),
      price: parseFloat(newItem.price),
      quantity: parseFloat(newItem.quantity),
      expiry: newItem.expiry || null,
      unit: newItem.unit || 'pcs',
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
      setMessage('✅ Existing item updated.');
    } else {
      setItems((prev) => [...prev, formattedItem]);
      setMessage('✅ New item added.');
    }

    setNewItem({ name: '', price: '', quantity: '', unit: 'pcs', expiry: '' });
  };

  const handleDeleteExpired = (name) => {
    const updated = items.filter(
      (item) => !(item.name === name && item.expiry && item.expiry < today)
    );
    const deletedCount = items.length - updated.length;

    if (deletedCount > 0) {
      setItems(updated);
      setMessage(`🗑️ Deleted ${deletedCount} expired batch(es) for ${name}.`);
    } else {
      setMessage(`✅ No expired batches found for ${name}.`);
    }
  };

  const handleDeleteBatch = (name, price, expiry) => {
    setItems((prev) =>
      prev.filter((item) => !(item.name === name && item.price === price && item.expiry === expiry))
    );
    setMessage(`🗑️ Deleted batch of ${name}${expiry ? ` (Exp: ${expiry})` : ''}.`);
  };

  // Low stock
  const isLowStock = (item) => {
    if (['kg', 'litre', 'g', 'ml'].includes(item.unit)) return item.quantity < 1;
    return item.quantity < 5;
  };

  // Expiring projects
  const isExpiringSoon = (expiry) => {
    if (!expiry) return false;
    const todayDate = new Date();
    const expiryDate = new Date(expiry);
    const diffDays = Math.ceil((expiryDate - todayDate) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  return (
    <BackgroundWrapper>
      <div className="max-w-5xl mx-auto p-6 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Inventory</h1>
          <Link to="/additem" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            ➕ Add Item
          </Link>
        </div>

        {message && <p className="text-center text-green-500 mb-4">{message}</p>}

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/2"
          />
          <div className="flex items-center gap-7">
            <label className="font-medium text-gray-200">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-3 py-1 rounded text-zinc-900"
            >
              <option value="name">Name</option>
              <option value="stock">Stock</option>
              <option value="expiry">Expiry</option>
            </select>

            <button
              onClick={() => {
                localStorage.removeItem("items");
                alert("🧹 Inventory cleared!");
                window.location.reload();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Clear Inventory
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-400 italic mt-10">
            🗃️ No matching items found.
          </div>
        ) : (
          Array.from(new Set(filteredItems.map((i) => i.name))).map((name, idx) => {
            const batches = filteredItems.filter((i) => i.name === name);
            return (
              <div key={idx} className="border rounded p-4 mb-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-blue-700">{name}</h2>
                  <button
                    onClick={() => handleDeleteExpired(name)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete Expired
                  </button>
                </div>

                {batches.map((item, bIdx) => {
                  const isExpired = item.expiry && item.expiry < today;
                  const lowStock = isLowStock(item);
                  const expSoon = isExpiringSoon(item.expiry);

                  return (
                    <div
                      key={bIdx}
                      className={`flex items-center justify-between border p-3 rounded mb-2 ${
                        isExpired
                          ? "bg-red-100"
                          : lowStock
                          ? "bg-yellow-100"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {expSoon && <span className="w-3 h-3 bg-red-600 rounded-full"></span>}
                        <div>
                          <p className="font-semibold text-zinc-700">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} | Qty: {item.quantity} {item.unit} | Exp:{" "}
                            {item.expiry || "—"}
                            {isExpired && (
                              <span className="text-red-600 font-semibold ml-2">
                                (Expired)
                              </span>
                            )}
                            {lowStock && !isExpired && (
                              <span className="text-yellow-600 font-semibold ml-2">
                                (Low Stock)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteBatch(item.name, item.price, item.expiry)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete Batch
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}

        <HomeButton />
      </div>
    </BackgroundWrapper>
  );
}

export default StockPage;
