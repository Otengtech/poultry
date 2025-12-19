import React, { useState, useMemo, useEffect } from "react";
import Footer from "../components/homecomponents/Footer";
import bannerVideo from "../video/v2.mp4";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from '../context/cartContext';


const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderMessage, setShowOrderMessage] = useState(false);
  const [orderMessageProduct, setOrderMessageProduct] = useState(null);
  const [products, setProducts] = useState([]);
    const { updateCart } = useCart(); // CHANGE THIS LINE


  const productCategories = [
    { id: "all", name: "All" },
    { id: "eggs", name: "Eggs" },
    { id: "meat", name: "Meat" },
    { id: "layer", name: "Layer" },
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
      toast.info(`Increased ${product.name} quantity in cart`);
    } else {
      // Add new product to cart with quantity 1
      const productWithQuantity = {
        ...product,
        quantity: 1,
        totalPrice: parseFloat(product.price)
      };

      const updatedCart = [...existingCart, productWithQuantity];
      updateCart(updatedCart); // CHANGE THIS LINE
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
    <div className="min-h-screen relative">
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
        <div className="mb-8">
  {/* Category Filter Buttons */}
  <div className="flex justify-center gap-2 mb-6 flex-wrap">
    {productCategories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => setActiveCategory(cat.id)}
        className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
          activeCategory === cat.id
            ? "bg-lime-500 text-white shadow-lg shadow-lime-500/25"
            : "bg-white text-gray-700 border border-gray-200 hover:border-lime-300 hover:bg-lime-50"
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>

  {/* Search Input */}
  <div className="relative max-w-2xl mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full blur opacity-30"></div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search products by name, category, or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white/95 backdrop-blur-sm border-2 border-lime-400/50 rounded-full py-3.5 px-6 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 focus:outline-none placeholder:text-gray-500 shadow-sm"
      />
    </div>
  </div>
</div>

        {/* Products Grid */}
        {filteredProducts.length ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredProducts.map((product) => (
      <div
        key={product._id}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-lime-200 hover:scale-[1.02]"
        onClick={() => setSelectedProduct(product)}
      >
        {/* Product Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badge */}
          <span className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
            product.status === 'In Stock' 
              ? 'bg-green-500 text-white' 
              : product.status === 'Limited'
              ? 'bg-amber-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {product.status}
          </span>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <span className="text-white font-semibold text-sm bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
              Quick View
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-lime-700 transition-colors">
                {product.name}
              </h3>
              {product.size && (
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Size: {product.size}
                </p>
              )}
            </div>
            
            {/* Category Tag */}
            {product.category && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
            )}
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-2xl font-bold text-lime-600">
                GHS {product.price}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  GHS {product.originalPrice}
                </div>
              )}
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < (product.rating || 4)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount || '12'})
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="mt-5 w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center group/btn"
          >
            <svg 
              className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
      <svg 
        className="w-16 h-16 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
    <p className="text-gray-500 text-center max-w-md mb-8">
      We couldn't find any products matching your search. Try adjusting your filters or browse our full collection.
    </p>
    <button
      onClick={() => {
        setSearchQuery('');
        setSelectedCategory('All');
      }}
      className="px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 text-white font-semibold rounded-full hover:from-lime-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
    >
      View All Products
    </button>
  </div>
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