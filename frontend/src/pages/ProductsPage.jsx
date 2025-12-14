import React, { useState, useMemo } from "react";
import Footer from "../components/homecomponents/Footer";
import bannerVideo from "../video/video.mp4";

/* ================= PRODUCTS PAGE DATA (INLINE JSON) ================= */
const productsPageData = {
  banner1: "../../assets/banner1.jpg",
  categories: [
    { id: "all", name: "All Products", count: 12 },
    { id: "eggs", name: "Fresh Eggs", count: 4 },
    { id: "birds", name: "Layers", count: 5 },
    { id: "meat", name: "Chicken Meats", count: 3 },
  ],
  products: [
    {
      id: 1,
      name: "Eggs",
      category: "eggs",
      price: 60,
      status: "Available Now",
      size: "Full Crate",
      image: "../../assets/egg.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 2,
      name: "Layers",
      category: "birds",
      size: "Huge sizes",
      price: 90,
      status: "Available Now",
      image: "../../assets/blog3.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 3,
      name: "Chicken Breast",
      category: "meat",
      price: 150,
      status: "Available Now",
      size: "2kg",
      image: "../../assets/breast.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 4,
      name: "Chicken Wings",
      category: "meat",
      price: 150,
      status: "Available Now",
      size: "2kg",
      image: "../../assets/wing.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 5,
      name: "Chicken Thighs",
      category: "meat",
      price: 150,
      status: "Available Now",
      size: "2kg",
      image: "../../assets/tighs.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 6,
      name: "Chicken Neck, Feet and Back",
      category: "meat",
      price: 100,
      status: "Available Now",
      image: "../../assets/feet.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 7,
      name: "Full Chicken",
      category: "meat",
      price: 180,
      status: "Available Now",
      image: "../../assets/fullchicken.jpg",
      delivery: "Delivery options available",
    },
    {
      id: 8,
      name: "Chicken Drumsticks",
      category: "meat",
      price: 150,
      status: "Available Now",
      size: "2kg",
      image: "../../assets/drumsticks.jpg",
      delivery: "Delivery options available",
    },
  ],
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderMessage, setShowOrderMessage] = useState(false);
  const [orderMessageProduct, setOrderMessageProduct] = useState(null);

  const { products, categories } = productsPageData;

  /* ================= FILTER LOGIC ================= */
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

  /* ================= ADD TO ORDERS ================= */
  const handleAddToOrders = (product) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, product])
    );

    setOrderMessageProduct(product);
    setShowOrderMessage(true);

    setTimeout(() => {
      setShowOrderMessage(false);
      setOrderMessageProduct(null);
    }, 2000);
  };

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
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-lime-500 outline-none"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer"
              >
                <div
                  className="relative h-56"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {product.status}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  {product.size && (
                    <p className="text-sm text-gray-600">{product.size}</p>
                  )}
                  <div className="text-xl font-bold text-lime-600 mt-2">
                    GHS {product.price}
                  </div>

                  <button
                    onClick={() => handleAddToOrders(product)}
                    className="mt-4 w-full bg-lime-100 text-lime-600 py-2 rounded-xl font-semibold hover:bg-lime-200"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">
            No products found
          </p>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover rounded-l-2xl"
              />
              <div className="p-8">
                <h2 className="text-3xl font-bold">
                  {selectedProduct.name}
                </h2>
                <p className="text-xl text-lime-600 font-bold mt-2">
                  GHS {selectedProduct.price}
                </p>

                <button
                  onClick={() => handleAddToOrders(selectedProduct)}
                  className="mt-6 w-full bg-lime-500 text-white py-3 rounded-xl font-semibold hover:bg-lime-400"
                >
                  Add to Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Message */}
      {showOrderMessage && orderMessageProduct && (
        <div className="fixed bottom-8 right-8 bg-lime-500 text-white px-6 py-3 rounded-xl shadow-lg">
          {orderMessageProduct.name} added to orders!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsSection;
