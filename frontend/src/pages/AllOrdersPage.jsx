import { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
import BannerImage from "../assets/order.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  getOrdersByDevice, 
  getStatusColor, 
  formatShortDate, 
  formatTime,
  canDeleteOrder,
  getTimeUntilDeletion
} from "../utils/orderUtils";

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadOrders();
    
    // Refresh orders every 5 seconds to update deletion timer
    const interval = setInterval(() => {
      loadOrders();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    try {
      const deviceOrders = getOrdersByDevice();
      // Sort by date (newest first)
      const sortedOrders = deviceOrders.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    if (!canDeleteOrder(order)) {
      toast.error(`This order cannot be deleted yet. ${getTimeUntilDeletion(order)}`);
      return;
    }

    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
      const updatedOrders = allOrders.filter(order => order.id !== orderId);
      
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
      loadOrders(); // Reload orders
      
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filterStatus.toLowerCase());

  const activeOrders = orders.filter(o => !["delivered", "cancelled"].includes(o.status?.toLowerCase())).length;
  const totalItems = orders.reduce((sum, order) => 
    sum + (order.items?.reduce((itemSum, item) => itemSum + (parseInt(item.quantity) || 1), 0) || 0), 0
  );

  return (
    <>
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
              View and manage all your orders in one place
            </p>
            <div className="flex flex-wrap gap-4">
              <Link aria-label="View products"
                to="/products"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Continue Shopping</span>
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </div>

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
            <span className="ml-4 text-lg text-gray-600">Loading your orders...</span>
          </div>
        ) : orders.length === 0 ? (
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
                No Orders Yet
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
          <>
            {/* Stats and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
                  <p className="text-gray-600">
                    {orders.length} total order{orders.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                {/* <div className="text-center">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-800">
                    GHS {totalSpent.toFixed(2)}
                  </p>
                </div> */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">Active Orders</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeOrders}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Items Ordered</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalItems}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">First Order</p>
                  <p className="text-lg font-medium text-gray-800">
                    {orders.length > 0 ? formatShortDate(orders[orders.length - 1].createdAt) : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Order Header */}
                  <div className={`p-5 border-b ${getStatusColor(order.status)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">
                          {formatShortDate(order.createdAt)} • {formatTime(order.createdAt)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        getStatusColor(order.status).replace('100', '200').replace('800', '900')
                      }`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-5">
                    <div className="space-y-3 mb-4">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            {item.image || item.images?.[0] ? (
                              <img
                                src={item.image || item.images?.[0]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "https://via.placeholder.com/100x100?text=Product";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items?.length > 2 && (
                        <p className="text-sm text-gray-500 text-center">
                          + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-2 border-t border-gray-100 pt-4">
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Items Total</span>
                        <span className="font-medium">
                          GHS {order.items?.reduce((sum, item) => 
                            sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1), 0
                          ).toFixed(2)}
                        </span>
                      </div> */}
                      {order.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee</span>
                          {/* <span className="font-medium">GHS {parseFloat(order.deliveryFee || 0).toFixed(2)}</span> */}
                        </div>
                      )}
                      {/* <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-800">Total</span>
                        <span className="text-lg font-bold text-lime-600">
                          GHS {calculateOrderTotal(order).toFixed(2)}
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-0 flex gap-2">
                    <Link
                      to={`/order/${order.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      View Details
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={!canDeleteOrder(order)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        canDeleteOrder(order)
                          ? 'bg-red-100 hover:bg-red-200 text-red-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      title={canDeleteOrder(order) ? "Delete order" : `Orders can only be deleted after 24 hours. ${getTimeUntilDeletion(order)}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Deletion Timer */}
                  {!canDeleteOrder(order) && (
                    <div className="px-5 pb-3">
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded text-center">
                        Can be deleted in: {getTimeUntilDeletion(order)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-4">No orders match the selected filter</p>
                <button
                  onClick={() => setFilterStatus("all")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all orders
                </button>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-sm text-gray-600">
                Your orders are stored locally on this device only. They cannot be accessed from other devices for privacy and security reasons.
                Orders can only be deleted or cancelled after 30 minutes to prevent accidental removal and after delivery you can then delete it permanently.
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
    </>
  );
};

export default AllOrdersPage;