// Helper functions for order management
export const generateOrderId = () => {
  return 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const generateOrderNumber = () => {
  return 'ORDER#' + Math.floor(100000 + Math.random() * 900000);
};

export const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'DEV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

export const canDeleteOrder = (order) => {
  // Check for test mode
  const searchParams = new URLSearchParams(window.location.search);
  const isTestMode = searchParams.get('test') === 'true' || 
                    localStorage.getItem('allowOrderDeletion') === 'true';
  
  if (isTestMode) return true;
  
  // Check if deletion is explicitly allowed
  if (order.deletionAllowed) return true;
  
  // Check if 30 minutes have passed
  const deletionTime = new Date(order.deletionAllowedAt || 0);
  const currentTime = new Date();
  return currentTime >= deletionTime;
};

export const getTimeUntilDeletion = (order) => {
  if (!order.deletionAllowedAt) return "Unknown";

  const deletionTime = new Date(order.deletionAllowedAt);
  const currentTime = new Date();
  const diffMs = deletionTime - currentTime;

  if (diffMs <= 0) return "Can be deleted now";

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
};


export const formatCurrency = (amount) => {
  return `GHS ${parseFloat(amount || 0).toFixed(2)}`;
};

export const getOrdersByDevice = () => {
  const deviceId = getDeviceId();
  const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
  return allOrders.filter(order => order.deviceId === deviceId);
};

export const getStatusColor = (status) => {
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

export const formatDate = (dateString) => {
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

export const formatShortDate = (dateString) => {
  if (!dateString) return "Date not available";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid date";
  }
};

export const formatTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};