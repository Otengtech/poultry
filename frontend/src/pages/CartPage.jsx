import React, { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
import BannerImage from "../assets/order.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryType: "pickup",
    paymentMethod: "cash",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index);
    updateLocalStorage(updatedCart);
    toast.success("Item removed from cart");
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updatedCart[index].totalPrice =
      updatedCart[index].quantity * parseFloat(updatedCart[index].price);
    updateLocalStorage(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].totalPrice =
        updatedCart[index].quantity * parseFloat(updatedCart[index].price);
      updateLocalStorage(updatedCart);
    } else {
      toast.info("Minimum quantity is 1. Click remove to delete item.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    // Validate required fields
    if (!userInfo.name || !userInfo.phone) {
      toast.error("Please fill in name and phoone fields");
      return;
    }

    if (!userInfo.address){
      toast.error("Please fill in address field");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // If delivery type is 'delivery', address is required
    if (userInfo.deliveryType === "delivery" && !userInfo.address.trim()) {
      toast.error("Please provide delivery address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare items with existing Cloudinary URLs
      const formattedItems = cartItems.map((item, index) => ({
        productId: item._id || `PROD${(index + 1).toString().padStart(3, "0")}`,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        totalPrice: parseFloat(item.totalPrice) || (parseFloat(item.price) * item.quantity),
        image: item.image, // Already a Cloudinary URL
        category: item.category || "General",
      }));

      // Prepare order data matching the API schema
      const orderData = {
        customerInfo: {
          name: userInfo.name.trim(),
          phone: userInfo.phone.trim(),
          email: userInfo.email?.trim() || "",
          address: userInfo.address?.trim() || "",
          deliveryType: userInfo.deliveryType,
          paymentMethod: userInfo.paymentMethod,
        },
        items: formattedItems,
      };

      console.log("Sending order data:", orderData); // For debugging

      // Send to your API
      const API_URL = import.meta.env.VITE_API_URL;
      
      try {
        const response = await axios.post(`${API_URL}/order`, orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          // Save order to localStorage for backup
          const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
          localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, orderData])
          );

          // Clear cart
          localStorage.removeItem("cart");
          setCartItems([]);

          // Show success message
          toast.success(
            `Order placed successfully! Order #${orderData.orderNumber}`
          );

          // Reset form and close modal
          setShowCheckoutModal(false);
          setUserInfo({
            name: "",
            phone: "",
            email: "",
            address: "",
            deliveryType: "pickup",
            paymentMethod: "cash",
          });

          // Redirect to orders page
          navigate("/order");
        } else {
          throw new Error(response.data.message || "Failed to place order");
          console.log(orderData)
        }
      } catch (error) {
        // Check if it's a network error or backend not available
        if (error.code === 'ERR_NETWORK' || !error.response) {
          // Fallback: Save to localStorage if API fails
          toast.warning("Backend not connected. Saving order locally...");
          
          const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
          localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, orderData])
          );

          // Clear cart
          localStorage.removeItem("cart");
          setCartItems([]);

          toast.success(
            `Order saved locally! Order #${orderData.orderNumber}`
          );
          setShowCheckoutModal(false);
          setUserInfo({
            name: "",
            phone: "",
            email: "",
            address: "",
            deliveryType: "pickup",
            paymentMethod: "cash",
          });
          navigate("/order");
        } else if (error.response) {
          // Server responded with error
          const errorMsg = error.response.data?.message || "Server error occurred";
          throw new Error(errorMsg);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.message || "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const total = parseFloat(item.totalPrice) || (parseFloat(item.price) * item.quantity);
      return sum + total;
    }, 0);
  };

  const deliveryOptions = [
    { value: "pickup", label: "Pickup from Farm" },
    { value: "delivery", label: "Home Delivery" },
  ];

  const paymentOptions = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "mobile money", label: "Mobile Money" },
    { value: "card", label: "Credit/Debit Card" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 z-0">
          <img
            src={BannerImage}
            alt="Cart Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your Cart
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Review and manage your items before checkout
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-medium">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  Items
                </span>
              </div>
              {cartItems.length > 0 && (
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>
                    Checkout (GHS {Number(calculateTotal() ?? 0).toFixed(2)})
                  </span>
                </button>
              )}
              <Link
                to="/order"
                className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>View Orders</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-gray-50"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 120L1440 0V120H0Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        {cartItems.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center transform hover:scale-[1.02] transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Your Cart is Empty
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Add some products to your cart to get started
              </p>
              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Shop Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Items in Cart</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Unique Products</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {cartItems.length}
                  </p>
                </div>
                <div className="text-center p-4 border-x border-gray-100">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-lime-600">
                    GHS {Number(calculateTotal() ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Actions</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("cart");
                      setCartItems([]);
                      toast.success("Cart cleared successfully");
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item._id}-${idx}`}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-sm font-semibold px-3 py-1 rounded-full">
                        #{idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {item.name}
                    </h2>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{item.category}</span>
                      </div>

                      {item.size && (
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">Size: {item.size}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-gray-600 text-sm">
                          <span>Price: </span>
                          <span className="font-bold">GHS {item.price}</span>
                        </div>
                        <div className="text-gray-600 text-sm">
                          <span>Total: </span>
                          <span className="font-bold text-lime-600">
                            GHS {item?.totalPrice?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDecrement(idx)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
                          disabled={item.quantity <= 1}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>

                        <span className="text-lg font-bold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrement(idx)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteItem(idx)}
                        className="group flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Cart Summary
                  </h3>
                  <p className="text-gray-600">
                    Total:{" "}
                    <span className="font-bold text-lime-600 text-xl">
                      GHS {Number(calculateTotal() ?? 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items in cart
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Link
                    to="/products"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Order Summary */}
              <div className="mb-6 bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × GHS {item.price}
                      </p>
                    </div>
                    <p className="font-bold">
                      GHS {item?.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-300">
                  <p className="text-lg font-bold">Total Amount</p>
                  <p className="text-2xl font-bold text-lime-600">
                    GHS {Number(calculateTotal() ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Type
                    </label>
                    <select
                      name="deliveryType"
                      value={userInfo.deliveryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    >
                      {deliveryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {userInfo.deliveryType === "delivery" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={userInfo.deliveryType === "delivery"}
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={userInfo.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  >
                    {paymentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing Order...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;