import React, { useState, useMemo, useEffect } from "react";
import Footer from "../components/homecomponents/Footer";
import bannerVideo from "../video/video.mp4";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderMessage, setShowOrderMessage] = useState(false);
  const [orderMessageProduct, setOrderMessageProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const productCategories = [
    { id: "all", name: "All" },
    { id: "eggs", name: "Eggs" },
    { id: "meat", name: "Meat" },
    { id: "chicks", name: "Chicks" },
  ];

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-product`);
        setProducts(res.data.data);
      } catch (err) {
        console.log("Error fetching products: ", err);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

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

  /* ================= ADD TO CART ================= */
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      // Product already exists - update quantity
      const updatedCart = [...existingCart];
      updatedCart[existingProductIndex].quantity += 1;
      updatedCart[existingProductIndex].totalPrice = 
        updatedCart[existingProductIndex].quantity * parseFloat(product.price);
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.info(`Increased ${product.name} quantity in cart`);
    } else {
      // Add new product to cart with quantity 1
      const productWithQuantity = {
        ...product,
        quantity: 1,
        totalPrice: parseFloat(product.price)
      };

      const updatedCart = [...existingCart, productWithQuantity];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(`${product.name} added to cart!`);
    }

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
        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeCategory === cat.id
                  ? "bg-lime-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-transparent rounded-2xl shadow-xl mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-2 border-lime-500 rounded-xl py-3 px-4 focus:border-lime-500 outline-none"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
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
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-lime-100 text-lime-600 py-2 rounded-xl font-semibold hover:bg-lime-200"
                  >
                    Add to Cart
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-2xl max-w-3xl w-full relative shadow-2xl overflow-hidden max-h-[95vh]">
            
            {/* Top Close Icon */}
            <button
              className="absolute top-3 right-3 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center text-gray-700 text-lg font-bold shadow"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* Product Image */}
              <div className="w-full h-56 md:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover md:rounded-l-2xl"
                />
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-xl text-lime-600 font-bold mt-2">
                    GHS {selectedProduct.price}
                  </p>

                  {selectedProduct.size && (
                    <p className="text-gray-600 mt-2">
                      Size: {selectedProduct.size}
                    </p>
                  )}

                  <p className="text-gray-700 mt-4">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full bg-lime-500 text-white py-3 rounded-xl font-semibold hover:bg-lime-400 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Message */}
      {showOrderMessage && orderMessageProduct && (
        <div className="fixed bottom-8 right-8 bg-lime-500 text-white px-6 py-3 rounded-xl shadow-lg">
          {orderMessageProduct.name} added to cart!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsSection;