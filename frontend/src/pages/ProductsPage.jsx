import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import Loader from "../components/Loader";
import Footer from "../components/homecomponents/Footer";
import bannerVideo from "../video/video.mp4";

const ProductsSection = () => {
  const { productsContent, loadingProducts, loadPageContent } =
    useContext(ContentContext);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderMessage, setShowOrderMessage] = useState(false);
  const [orderMessageProduct, setOrderMessageProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadPageContent("products");
  }, []);

  const pageData = productsContent?.productsPage;
  const categories = pageData?.categories || [];
  const products = pageData?.products || [];

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return list;
  }, [products, activeCategory, searchQuery]);

  // Add product to localStorage orders
  const handleAddToOrders = (product) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, product];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setOrderMessageProduct(product);
    setShowOrderMessage(true);

    setTimeout(() => {
      setShowOrderMessage(false);
      setOrderMessageProduct(null);
    }, 2000);
  };

  if (loadingProducts) return <Loader />;

  if (!productsContent || !pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Error loading products page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lime-100 relative">
      {/* Hero Banner */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={bannerVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            PRODUCTS PAGE
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pl-12 focus:border-lime-500 focus:ring-lime-200 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-lime-200 cursor-pointer transform hover:-translate-y-1"
              >
                <div
                  className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.status === "Available Now"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {product.size && (
                        <p className="text-sm text-gray-600 mt-1">{product.size}</p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-lime-600">
                        GHS{product.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    {product.delivery}
                  </div>

                  <button
                    onClick={() => handleAddToOrders(product)}
                    className="w-full bg-lime-50 hover:bg-lime-100 text-lime-500 font-semibold py-2.5 px-4 rounded-xl transition-colors duration-300 border border-lime-200 group-hover:border-lime-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No products found
            </h3>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-96 md:h-full min-h-96">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-l-2xl"
                />
              </div>

              <div className="p-8">
                <span className="inline-block bg-lime-100 text-lime-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h2>
                <div className="text-2xl font-bold text-lime-500 mb-6">
                  GHS{selectedProduct.price}
                </div>

                <div className="space-y-4 mb-8">
                  {selectedProduct.size && (
                    <div>
                      <div className="font-medium text-gray-900">Size</div>
                      <div className="text-gray-600">{selectedProduct.size}</div>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">Delivery</div>
                    <div className="text-gray-600">{selectedProduct.delivery}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleAddToOrders(selectedProduct)}
                    className="flex-1 bg-lime-500 hover:bg-lime-400 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-colors duration-300"
                  >
                    Add to Orders
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Added Message */}
      {showOrderMessage && orderMessageProduct && (
        <div className="fixed bottom-8 right-8 bg-lime-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn z-50">
          {orderMessageProduct.name} added to orders!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsSection;
