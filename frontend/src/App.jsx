import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import TopButton from "./components/TopButton";
import ChatAssistant from "./components/ChatAssistant";

/* ✅ Load HOME normally (fastest) */
import Home from "./pages/HomePage";

/* ✅ Lazy-load all other pages */
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AboutPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const QualityPage = lazy(() => import("./pages/QualityPage"));

function App() {
  return (
    <>
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
          <Route path="/team" element={<TeamPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/quality" element={<QualityPage />} />
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
    </>
  );
}

export default App;
