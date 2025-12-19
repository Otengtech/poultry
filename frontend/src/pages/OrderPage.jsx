import React, { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
import BannerImage from "../assets/order.jpg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams(); // Get orderId from URL
  const navigate = useNavigate();

  // Get order from localStorage
  const getOrderFromLocalStorage = (id) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
      
      // Try to find by orderNumber first, then by id
      let foundOrder = allOrders.find(order => order.orderNumber === id);
      
      if (!foundOrder) {
        foundOrder = allOrders.find(order => order.id === id);
      }
      
      return foundOrder || null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadOrder = () => {
      setLoading(true);
      
      if (!orderId) {
        // If no orderId in URL, try to get the most recent order
        const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
        if (allOrders.length > 0) {
          setOrder(allOrders[0]); // Most recent order
        } else {
          toast.error("No orders found");
        }
        setLoading(false);
        return;
      }
      
      // Find the specific order
      const foundOrder = getOrderFromLocalStorage(orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error("Order not found");
      }
      
      setLoading(false);
    };
    
    loadOrder();
  }, [orderId]);

  const calculateTotalAmount = (items = []) =>
    items.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );

  const handleCancelOrder = () => {
    if (!order) return;
    
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      // Update order status locally
      const updatedOrder = { ...order, status: "cancelled" };
      setOrder(updatedOrder);
      
      // Update localStorage
      const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
      const updatedOrders = allOrders.map(o => 
        o.orderNumber === order.orderNumber || o.id === order.id 
          ? updatedOrder 
          : o
      );
      
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
      
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  // Format date
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

  // Get status color
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-indigo-100 text-indigo-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format status text
  const getOrderStatusText = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get order items safely
  const getOrderItems = () => {
    return Array.isArray(order?.items) ? order.items : [];
  };

  // Get customer info safely
  const getCustomerInfo = () => {
    return order?.customerInfo || order?.userInfo || {};
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
              Your Order
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Order confirmed! Thank you for your purchase.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Continue Shopping</span>
              </Link>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Receipt</span>
              </button>
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

      {/* Order Details Section */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading your order...</span>
          </div>
        ) : !order ? (
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
                No Order Found
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
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
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order Confirmed!</h3>
                  <p className="text-gray-600">
                    Your order <span className="font-bold">#{order.orderNumber}</span> has been placed successfully on {formatDate(order.createdAt)}.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h2>
                    <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {getOrderStatusText(order.status)}
                    </span>
                    <span className="text-2xl font-bold text-lime-600">
                      GHS {calculateTotalAmount(getOrderItems()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Customer Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{getCustomerInfo().name || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{getCustomerInfo().phone || "Not specified"}</p>
                      </div>
                      {getCustomerInfo().email && (
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium truncate">{getCustomerInfo().email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Delivery Type</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          getCustomerInfo().deliveryType === "delivery" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {getCustomerInfo().deliveryType === "delivery" ? "Delivery" : "Pickup"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">
                          {getCustomerInfo().paymentMethod 
                            ? getCustomerInfo().paymentMethod.replace("_", " ")
                            : "Cash on Delivery"
                          }
                        </p>
                      </div>
                      {getCustomerInfo().deliveryType === "delivery" && getCustomerInfo().address && (
                        <div>
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="font-medium">{getCustomerInfo().address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Items ({getOrderItems().length})
                  </h3>
                  
                  <div className="space-y-4">
                    {getOrderItems().map((item, index) => {
                      const imageSrc = item.image || item.images?.[0] || "https://via.placeholder.com/100x100?text=Product";
                      
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={imageSrc}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/100x100?text=Product";
                              }}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name || "Unnamed Product"}</h4>
                            <p className="text-sm text-gray-500">{item.category || "Product"}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-gray-800">GHS {item.price || 0} each</p>
                            <p className="text-lg font-bold text-lime-600">
                              GHS {((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Total */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-3 max-w-md ml-auto">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">GHS {calculateTotalAmount(getOrderItems()).toFixed(2)}</span>
                      </div>
                      {order.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span className="font-medium">GHS {order.deliveryFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                        <span className="text-2xl font-bold text-lime-600">
                          GHS {(
                            calculateTotalAmount(getOrderItems()) + 
                            (order.deliveryFee || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleCancelOrder}
                    disabled={order.status === "cancelled" || order.status === "delivered"}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {order.status === "cancelled" ? "Order Cancelled" : "Cancel Order"}
                  </button>
                  
                  <Link
                    to="/products"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+233000000000" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call: +233 000 000 000
                </a>
                <a href="mailto:support@example.com" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email: support@example.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;