import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import TopButton from "./components/TopButton";
import ChatAssistant from "./components/ChatAssistant";
import { CartProvider } from "./context/cartContext";
import { HelmetProvider } from "react-helmet-async";

// Import all pages directly
import Home from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ReviewPage from "./pages/ReviewPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import CartPage from "./pages/CartPage";
import PrivacyPage from "./pages/PrivacyPage";
import SupplyPage from "./pages/SupplyPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import OrderPage from "./pages/OrderPage";
import NotFound from "./pages/NotFound";
import FestivalBanner from "./components/homecomponents/FestivalComponent";

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ChatAssistant />
          {/* <FestivalBanner /> */}
          <Routes>
            {/* Regular page routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<AllOrdersPage />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/event" element={<SupplyPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          <TopButton />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            pauseOnHover
            theme="dark"
          />
        </div>
        
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
