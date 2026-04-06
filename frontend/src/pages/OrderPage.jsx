import React, { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
import BannerImage from "../assets/order.jpg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  getOrdersByDevice, 
  formatDate, 
  canDeleteOrder,
  getTimeUntilDeletion,
} from "../utils/orderUtils";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = () => {
    setLoading(true);
    
    try {
      const deviceOrders = getOrdersByDevice();
      
      if (!orderId && deviceOrders.length > 0) {
        // If no orderId in URL, show the most recent order
        setOrder(deviceOrders[0]);
      } else if (orderId) {
        // Find the specific order
        const foundOrder = deviceOrders.find(order => 
          order.id === orderId || order.orderNumber === orderId
        );
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          toast.error("Order not found on this device");
          navigate('/orders');
        }
      } else {
        toast.error("No orders found");
        navigate('/orders');
      }
    } catch (error) {
      console.error("Error loading order:", error);
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = () => {
    if (!order) return;
    
    if (!canDeleteOrder(order)) {
      toast.error(`This order cannot be deleted yet. ${getTimeUntilDeletion(order)}`);
      return;
    }
    
    if (!window.confirm("Are you sure you want to permanently delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      // Remove from localStorage
      const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
      const updatedOrders = allOrders.filter(o => o.id !== order.id);
      
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
      
      toast.success("Order deleted successfully");
      
      // Navigate back to orders list
      setTimeout(() => {
        navigate('/orders');
      }, 1000);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
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
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Order Details
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {order ? `Order ${order.orderNumber}` : "Loading order details..."}
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
              <Link
                to="/orders"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>All Orders</span>
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

      {/* Order Details Section */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading order details...</span>
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
                Order Not Found
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                This order doesn't exist or you don't have access to it on this device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/orders"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  View All Orders
                </Link>
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Success Message for new orders */}
            {order.status === "pending" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">Order Confirmed!</h3>
                    <p className="text-gray-600">
                      Your order has been placed successfully on {formatDate(order.createdAt)}.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Our service personnel will give you a call for further info.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                    {order.updatedAt !== order.createdAt && (
                      <p className="text-gray-500 text-sm">Last updated: {formatDate(order.updatedAt)}</p>
                    )}
                  </div>
                  {/* <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-lime-600">
                      GHS {getOrderTotal().toFixed(2)}
                    </span>
                  </div> */}
                </div>
              </div>

              <div className="p-6">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{getCustomerInfo().name || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{getCustomerInfo().phone || "Not specified"}</p>
                      </div>
                      {getCustomerInfo().email && (
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium truncate">{getCustomerInfo().email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery & Payment Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Delivery & Payment
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Delivery Type</p>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            getCustomerInfo().deliveryType === "delivery" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {getCustomerInfo().deliveryType === "delivery" ? "Home Delivery" : "Pickup"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="font-medium">
                            {getCustomerInfo().paymentMethod 
                              ? getCustomerInfo().paymentMethod.charAt(0).toUpperCase() + getCustomerInfo().paymentMethod.slice(1)
                              : "Cash on Delivery"
                            }
                          </p>
                        </div>
                      </div>
                      
                      {getCustomerInfo().deliveryType === "delivery" && getCustomerInfo().address && (
                        <div>
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="font-medium">{getCustomerInfo().address}</p>
                        </div>
                      )}
                      
                      {getCustomerInfo().deliveryType === "pickup" && (
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                          <p className="text-sm text-yellow-800">
                            <strong>Pickup Information:</strong> You will be notified when your order is ready for pickup at our farm location.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Items ({getOrderItems().length})
                  </h3>
                  
                  <div className="space-y-4">
                    {getOrderItems().map((item, index) => {
                      const imageSrc = item.image || item.images?.[0] || "https://via.placeholder.com/100x100?text=Product";
                      // const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
                      
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200">
                            <img
                              src={imageSrc}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/100x100?text=Product";
                              }}
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800">{item.name || "Unnamed Product"}</h4>
                            <p className="text-sm text-gray-500">{item.category || "Product"}</p>
                            {item.size && (
                              <p className="text-xs text-gray-500">Size: {item.size}</p>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                            {/* <p className="font-medium text-gray-800">GHS {parseFloat(item.price || 0).toFixed(2)} each</p> */}
                            {/* <p className="text-lg font-bold text-lime-600">
                              GHS {itemTotal.toFixed(2)}
                            </p> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Total */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-3 max-w-md ml-auto">
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Items Subtotal</span>
                        <span className="font-medium">GHS {calculateTotalAmount(getOrderItems()).toFixed(2)}</span>
                      </div> */}
                      {order.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee</span>
                          {/* <span className="font-medium">GHS {parseFloat(order.deliveryFee || 0).toFixed(2)}</span> */}
                        </div>
                      )}
                      {/* <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                        <span className="text-2xl font-bold text-lime-600">
                          GHS {getOrderTotal().toFixed(2)}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-gray-800 mb-2">📋 Order Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Deletion Status</p>
                      <p className={`font-medium ${canDeleteOrder(order) ? 'text-green-600' : 'text-yellow-600'}`}>
                        {canDeleteOrder(order) ? 'Can be deleted' : `Can delete in: ${getTimeUntilDeletion(order)}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex flex-col sm:flex-row gap-4">                      
                      <button
                        onClick={handleDeleteOrder}
                        disabled={!canDeleteOrder(order)}
                        className={`flex-1 py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          canDeleteOrder(order)
                            ? 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title={canDeleteOrder(order) ? "Permanently delete this order" : `Orders can only be deleted after 24 hours. ${getTimeUntilDeletion(order)}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Order
                      </button>
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/products"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Shop More
                      </Link>
                      
                      <Link
                        to="/orders"
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        All Orders
                      </Link>
                    </div>
                  </div>
                </div>
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