import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ContentContext } from "./context/ContentContext";

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
import Loader from "./components/Loader";
import TopButton from "./components/TopButton";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { loading } = useContext(ContentContext);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
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
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      )}
      <TopButton />
    </>
  );
}

export default App;
