import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import TopButton from "./components/TopButton";
import ChatAssistant from "./components/ChatAssistant";
import { CartProvider } from './context/cartContext'; // ADD THIS IMPORT

/* ✅ Load HOME normally (fastest) */
import Home from "./pages/HomePage";

/* ✅ Lazy-load all other pages */
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AboutPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const SupplyPage = lazy(() => import("./pages/SupplyPage"));

function App() {
  return (
    <>
    <CartProvider>
      <Navbar />
      <ChatAssistant />

      {/* ✅ Suspense shows Loader ONLY when lazy pages load */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/event" element={<SupplyPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Suspense>
      

      <TopButton />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
      />
      </CartProvider>
    </>
  );
}

export default App;
