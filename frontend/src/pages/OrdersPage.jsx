import React, { useEffect, useState } from "react";
import Footer from "../components/homecomponents/Footer";
// Import your banner image - update the path as needed
import BannerImage from "../assets/order.jpg";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, idx) => idx !== index);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 z-0">
          <img
            src={BannerImage}
            alt="Order Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your Orders
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Track and manage all your purchases in one place
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-medium">
                {orders.length} {orders.length === 1 ? 'Item' : 'Items'} Ordered
              </span>
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
        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center transform hover:scale-[1.02] transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Orders Yet
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Start shopping to see your orders here
              </p>
              <Link to="/products" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                View Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <div className="text-center p-4 border-x border-gray-100">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-lime-600">
                    GHS{orders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-gray-500">Delivery Types</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {[...new Set(orders.map(order => order.delivery))].join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={order.image}
                      alt={order.name}
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
                      {order.name}
                    </h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{order.category}</span>
                      </div>
                      
                      {order.size && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Size: {order.size}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v5h3V7zM7 7H4v5h3V7z" />
                        </svg>
                        <span className="text-sm">{order.delivery}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-500 text-sm">Price</span>
                        <p className="text-2xl font-bold text-lime-600">GHS{order.price}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteOrder(idx)}
                        className="group flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h3>
                  <p className="text-gray-600">
                    You have {orders.length} items in your order history
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/products" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;