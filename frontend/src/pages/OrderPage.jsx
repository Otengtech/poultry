import React, { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
import BannerImage from "../assets/order.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/orders`);

      // Assuming backend returns data in different formats
      // Try different possible response structures
      let ordersData = [];

      if (Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // If response has { data: [] } structure
        ordersData = response.data.data;
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        // If response has { orders: [] } structure
        ordersData = response.data.orders;
      } else {
        console.error("Unexpected API response structure:", response.data);
        toast.error("Unexpected data format from server");
      }

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateTotalAmount = (items = []) =>
  items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  // Get count of active orders (not delivered or cancelled)
  const getActiveOrdersCount = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return 0;

    return orders.filter((order) => {
      const status = (order?.status || "").toLowerCase();
      return !["delivered", "cancelled"].includes(status);
    }).length;
  };

  // Get most recent order date
  const getRecentOrderDate = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return "N/A";

    try {
      // Sort orders by date (newest first)
      const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a?.createdAt || a?.orderDate || 0);
        const dateB = new Date(b?.createdAt || b?.orderDate || 0);
        return dateB - dateA;
      });

      const recentOrder = sortedOrders[0];
      const orderDate = recentOrder?.createdAt || recentOrder?.orderDate;

      if (orderDate) {
        return new Date(orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
      return "N/A";
    } catch {
      return "N/A";
    }
  };

  // Get status color based on order status
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format status text
  const getOrderStatusText = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleCancelOrder = async (orderNumber, orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // First, update locally for immediate feedback
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: "cancelled" }
            : order
        )
      );

      // Send DELETE request to API
      const response = await axios.delete(
        `${API_URL}/orders/${orderId || orderNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully");

        // Also update localStorage if you're storing there
        const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedLocalOrders = localOrders.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: "cancelled" }
            : order
        );
        localStorage.setItem("orders", JSON.stringify(updatedLocalOrders));
      } else {
        throw new Error(response.data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel order error:", error);

      // Revert local change if API call fails
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: status } // revert to original status
            : order
        )
      );

      toast.error(error.message || "Failed to cancel order. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Safe extraction of customer info (handles both userInfo and customerInfo)
  const getCustomerInfo = (order) => {
    return order?.userInfo || order?.customerInfo || {};
  };

  // Safe extraction of items
  const getOrderItems = (order) => {
    return Array.isArray(order?.items) ? order.items : [];
  };

  // Safe extraction of order number
  const getOrderNumber = (order, index) => {
    return order?.orderNumber || order?.orderId || `ORDER-${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 z-0">
          <img
            src={BannerImage}
            alt="Orders Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Orders
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Track and manage all your placed orders
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-medium">
                  {orders?.length || 0}{" "}
                  {orders?.length === 1 ? "Order" : "Orders"}
                </span>
              </div>
              <Link
                to="/cart"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>View Cart</span>
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

      {/* Orders Section */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : !orders || orders.length === 0 ? (
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Orders Found
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                You haven't placed any orders yet. Start shopping!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Browse Products
                </Link>
                <Link
                  to="/cart"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {orders.length}
                  </p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Active Orders</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {getActiveOrdersCount()}
                  </p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Recent Order</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {getRecentOrderDate()}
                  </p>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {orders.map((order, index) => {
                // Safe extraction of order data using helper functions
                const customerInfo = getCustomerInfo(order);
                const orderItems = getOrderItems(order);
                const totalAmount = calculateTotalAmount(orderItems);
                const orderDate = order.createdAt || order.orderDate;
                const orderNumber = getOrderNumber(order, index);
                const status = order.status || "pending";

                return (
                  <div
                    key={order._id || index}
                    className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Order Header - Compact */}
                    <div className="p-4 border-b border-gray-100 bg-lime-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              {/* <span className="text-lg font-bold text-gray-800">
                                #{orderNumber.split("-").pop() || orderNumber}
                              </span> */}
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                                  status
                                )}`}
                              >
                                {getOrderStatusText(status)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {orderDate
                                ? formatDate(orderDate)
                                : "Date not available"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-lime-600">
                            GHS {Number(totalAmount).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              handleCancelOrder(orderNumber, order._id)
                            }
                            disabled={
                              status === "cancelled" || status === "delivered"
                            }
                            className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full transition-colors duration-200"
                          >
                            {status === "cancelled"
                              ? "Cancelled"
                              : "Cancel Order"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Main Content - Compact Grid */}
                    <div className="p-4 md:mx-8">
                      {/* Customer & Delivery Info - Side by side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Customer Info */}
                        <div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <h4 className="text-sm font-semibold text-gray-700">
                              Customer
                            </h4>
                          </div>
                          <div className="ml-6 space-y-1">
                            <p className="text-sm text-gray-800 font-semibold">
                              Name: <span className="text-gray-500 font-medium">{customerInfo.name || "Not specified"}</span>
                            </p>
                            <p className="text-sm text-gray-800 font-semibold">
                              Phone: <span className="text-gray-500 font-medium">{customerInfo.phone || "Not specified"}</span>
                            </p>
                            {customerInfo.email && (
                              <p className="text-sm text-gray-800 font-semibold truncate">
                                Email: <span className="text-gray-500 font-medium">{customerInfo.email}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <h4 className="text-sm font-semibold text-gray-700">
                              Delivery
                            </h4>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  customerInfo.deliveryType === "delivery"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {customerInfo.deliveryType === "delivery"
                                  ? "Delivery"
                                  : "Pickup"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {customerInfo.paymentMethod
                                  ? customerInfo.paymentMethod.replace("_", " ")
                                  : "Cash"}
                              </span>
                            </div>
                            {customerInfo.deliveryType === "delivery" &&
                              customerInfo.address && (
                                <p className="text-sm text-gray-800 font-semibold line-clamp-2">
                                  Customer's Address: <span className="text-gray-500 font-medium">{customerInfo.address}</span>
                                </p>
                              )}
                          </div>
                        </div>
                        </div>

                        {/* Order Items - Horizontal Scroll */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                          <h4 className="text-sm font-semibold text-gray-700">
                            Items ({orderItems.length}) • Total Qty:{" "}
                            {orderItems.reduce(
                              (sum, item) => sum + (item.quantity || 0),
                              0
                            )}
                          </h4>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin cursor-pointer scrollbar-track-gray-100">
                          {orderItems.map((item, idx) => {
                            const imageSrc =
                              Array.isArray(item.images) &&
                              item.images.length > 0
                                ? item.images[0]
                                : "https://via.placeholder.com/200x150?text=Product";

                            return (
                              <div
                                key={idx}
                                className="flex-shrink-0 w-48 border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                              >
                                {/* Image with overlay */}
                                <div className="relative h-32 overflow-hidden bg-gray-100">
                                  <img
                                    src={imageSrc}
                                    alt={item.name || "Product"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        "https://via.placeholder.com/200x150?text=Product";
                                    }}
                                  />

                                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {item.category || "Product"}
                                  </div>

                                  <div className="absolute top-2 right-2 bg-lime-600 text-white text-xs px-2 py-1 rounded font-bold">
                                    {item.quantity || 0}×
                                  </div>
                                </div>

                                {/* Item Details */}
                                <div className="p-3">
                                  <p className="text-sm font-medium text-gray-800 truncate mb-1">
                                    {item.name || "Unnamed Product"}
                                  </p>

                                  <div className="flex justify-between items-center">
                                    <div className="text-xs text-gray-600">
                                      GHS {item.price || 0} each
                                    </div>

                                    <div className="text-sm font-bold text-lime-600">
                                      GHS{" "}
                                      {Number(
                                        (item.quantity || 0) * (item.price || 0)
                                      ).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
