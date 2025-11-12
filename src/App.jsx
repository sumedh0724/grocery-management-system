import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import StockPage from "./StockPage";
import GenerateBill from "./GenerateBill";
import TransactionHistory from "./TransactionHistory";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SplashScreen from "./splashscreen"; 
import AddItemPage from "./AddItemPage";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  //  Load inventory & cart from localStorage once
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("items");
      const savedCart = localStorage.getItem("cart");
      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (err) {
      console.error("Error loading localStorage:", err);
    } finally {
      setLoaded(true);
    }
  }, []);

  //  Save whenever items or cart change 
  useEffect(() => {
    if (loaded) localStorage.setItem("items", JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, loaded]);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!loaded) {
    return (
      <div className="text-center mt-40 text-gray-400">
        Loading your inventory...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <StockPage items={items} setItems={setItems} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/additem"
          element={
            <ProtectedRoute>
              <AddItemPage items={items} setItems={setItems} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate-bill"
          element={
            <ProtectedRoute>
              <GenerateBill items={items} setItems={setItems} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
