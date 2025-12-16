import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ReviewPage from "./pages/ReviewPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import TeamPage from "./pages/TeamPage";
import OrdersPage from "./pages/OrdersPage";
import PrivacyPage from "./pages/PrivacyPage";
import QualityPage from "./pages/QualityPage";
import Loader from "./components/Loader";
import TopButton from "./components/TopButton";
import ChatAssistant from "./components/ChatAssistant";

function App() {

  return (
    <>
      <Navbar />
      <ChatAssistant />
        {/* <Loader /> */}
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
      <TopButton />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
}

export default App;
