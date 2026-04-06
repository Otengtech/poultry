// utils/orderStorage.js

export const saveOrder = (orderData) => {
  try {
    // Create order with all necessary fields
    const order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    // Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    
    // Add new order to beginning
    const updatedOrders = [order, ...existingOrders];
    
    // Save to localStorage
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    
    // Save current order ID for quick access
    localStorage.setItem('lastOrderId', order.orderNumber);
    
    return order;
  } catch (error) {
    console.error("Error saving order:", error);
    return null;
  }
};

export const getOrder = (orderId) => {
  try {
    const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    
    // Try different ID fields
    return allOrders.find(order => 
      order.orderNumber === orderId || 
      order.id === orderId
    ) || null;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

export const getAllOrders = () => {
  try {
    return JSON.parse(localStorage.getItem('userOrders')) || [];
  } catch (error) {
    console.error("Error getting orders:", error);
    return [];
  }
};

export const updateOrderStatus = (orderId, newStatus) => {
  try {
    const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const updatedOrders = allOrders.map(order => {
      if (order.orderNumber === orderId || order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error("Error updating order:", error);
    return false;
  }
};