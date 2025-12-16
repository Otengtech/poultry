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

      const response = await axios.get(`${API_URL}/get-order`);

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
      toast.error(
        error.response?.data?.message || "Failed to load orders"
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate total amount safely
  const calculateTotalOrdersAmount = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return 0;
    
    return orders.reduce((total, order) => {
      const amount = order?.totalAmount || 0;
      return total + (typeof amount === 'number' ? amount : parseFloat(amount) || 0);
    }, 0);
  };

  // Get count of active orders (not delivered or cancelled)
  const getActiveOrdersCount = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return 0;
    
    return orders.filter(order => {
      const status = (order?.status || '').toLowerCase();
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
        return new Date(orderDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
                  {orders?.length || 0} {orders?.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>
              <Link 
                to="/cart"
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-50" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 0V120H0Z" fill="currentColor"/>
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
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Orders Found
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                You haven't placed any orders yet. Start shopping!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  Browse Products
                </Link>
                <Link to="/cart" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
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
                  <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-lime-600">
                    GHS {calculateTotalOrdersAmount().toFixed(2)}
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
                const totalAmount = order.totalAmount || 0;
                const orderDate = order.createdAt || order.orderDate;
                const orderNumber = getOrderNumber(order, index);
                const status = order.status || "pending";
                
                return (
                  <div
                    key={order._id || index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-gray-800">
                              Order #{orderNumber}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                              {getOrderStatusText(status)}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">
                            {orderDate ? (
                              `Placed on ${formatDate(orderDate)}`
                            ) : (
                              "Order date not available"
                            )}
                          </p>
                        </div>
                        
                        <div className="mt-3 md:mt-0">
                          <span className="text-2xl font-bold text-lime-600">
                            GHS {Number(totalAmount).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Customer Details</h4>
                          <p className="text-gray-600">{customerInfo.name || "Not specified"}</p>
                          <p className="text-gray-600">{customerInfo.phone || "Not specified"}</p>
                          {customerInfo.email && (
                            <p className="text-gray-600">{customerInfo.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Delivery Info</h4>
                          <p className="text-gray-600">
                            {customerInfo.deliveryType === 'delivery' 
                              ? `Delivery to: ${customerInfo.address || "Address not specified"}` 
                              : 'Pickup from Farm'}
                          </p>
                          <p className="text-gray-600">
                            Payment: {(customerInfo.paymentMethod || "cash").replace('_', ' ')}
                          </p>
                          {customerInfo.deliveryDate && (
                            <p className="text-gray-600">
                              Preferred: {new Date(customerInfo.deliveryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Order Summary</h4>
                          <p className="text-gray-600">
                            {orderItems.length} item{orderItems.length !== 1 ? 's' : ''}
                          </p>
                          <p className="text-gray-600">
                            Total quantity: {orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                          </p>
                          {order.notes && (
                            <p className="text-gray-600 text-sm mt-2">
                              <span className="font-medium">Notes:</span> {order.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      {orderItems.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-700 mb-3">Order Items</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orderItems.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name || "Product"}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800">{item.name || "Unnamed Product"}</p>
                                  <p className="text-sm text-gray-600">
                                    Qty: {item.quantity || 0} × GHS {item.price || 0}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Total: GHS {Number((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                                  </p>
                                  {item.category && (
                                    <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                      {item.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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