import React, { useEffect, useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import HomeButton from "./HomeButton";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [expanded, setExpanded] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  // Filtering transactions by name or ID
  const filteredTransactions = [...(transactions || [])]
  .reverse()
  .filter((t) => {
    const customer = t?.customer || "";
    const id = String(t?.id || "");
    return (
      customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm)
    );
  });


  return (
    <BackgroundWrapper>
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center pt-20">
        🧾 Transaction History
      </h1>

      {/* 🔍 Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Customer Name or Transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-400">No transactions found.</p>
      ) : (
        <div className="bg-white backdrop-blur-md border border-white/10 rounded-xl shadow-lg mx-4 
                overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="min-w-full text-left text-zinc-900">
            <thead className="bg-white/5 text-blue-600">
              <tr>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, idx) => (
                <React.Fragment key={t.id}>
                  <tr
                    className={`cursor-pointer hover:bg-white/10 transition-all ${
                      expanded === idx ? "bg-zinc-500" : ""
                    }`}
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                  >
                    <td className="px-4 py-3 text-sm">{t.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-700">
                      {t.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {t.date}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ₹{Number(t.total).toFixed(2)}
                    </td>
                  </tr>

                  {expanded === idx && (
                    <tr>
                      <td colSpan="4" className="bg-zinc-700 px-6 py-4">
                        <div className="text-zinc-200 text-sm space-y-1">
                          {t.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between border-b border-white pb-1"
                            >
                              <span>
                                {item.name} ({item.unit}) × {item.quantity}
                              </span>
                              <span>
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="text-right font-semibold text-blue-400 mt-2">
                            Total: ₹{Number(t.total).toFixed(2)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to clear all transaction history?"
                )
              ) {
                localStorage.removeItem("transactions");
                setTransactions([]);
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition-all"
          >
            🧹 Clear All Transactions
          </button>
        </div>
      )}

      <HomeButton />
    </BackgroundWrapper>
  );
}

export default TransactionHistory;
