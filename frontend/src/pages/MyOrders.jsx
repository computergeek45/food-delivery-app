import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
 }, []);

  // Calculate delivery date (3 days after order + 2 hours 4 minutes)
  const calculateDeliveryDate = (orderDate) => {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Add 3 days
    deliveryDate.setHours(deliveryDate.getHours() + 2); // Add 2 hours
    deliveryDate.setMinutes(deliveryDate.getMinutes() + 4); // Add 4 minutes
    return deliveryDate;
  };

  const handleTrackOrder = (order) => {
    setTrackingOrder(order);
  };

  const closeTracking = () => {
    setTrackingOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-12 pt-24 md:pt-28 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg flex items-center gap-3">
            <span className="text-6xl">📦</span>
            My Orders
          </h1>
          <p className="text-purple-50 mt-2 text-lg">
            {orders.length > 0 ? `You have ${orders.length} order${orders.length > 1 ? 's' : ''}` : 'Track and manage your orders'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-500 text-lg mb-8">Start exploring our menu and place your first order!</p>
            <a 
              href="/menu" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-200"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b-2 border-dashed border-gray-200">
                  <div>
                    <p className="font-bold text-lg text-gray-800 mb-1 flex items-center gap-2">
                      <span className="text-orange-600">🆔</span>
                      Order ID: <span className="text-orange-600">#{order._id.slice(-8)}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span>📅</span>
                      {new Date(order.createdAt).toLocaleString('en-IN', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className={`px-5 py-2 rounded-full font-bold text-sm shadow-md ${
                      order.orderStatus === 'delivered' 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                        : order.orderStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                        : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    }`}>
                      {order.orderStatus === 'delivered' ? '✅ Delivered' : 
                       order.orderStatus === 'pending' ? '⏳ Pending' : 
                       '🚚 ' + order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-orange-600">🍽️</span>
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <span className="font-medium text-gray-800">
                          {item.name} <span className="text-orange-600 font-bold">× {item.quantity}</span>
                        </span>
                        <span className="font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t-2 border-dashed border-gray-300 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total Amount</span>
                    <span className="text-3xl font-bold text-orange-600">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 px-5 py-3 bg-purple-50 border border-purple-200 rounded-xl">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="text-xs text-gray-600">Payment Method</p>
                      <p className="font-bold text-purple-700 text-sm">
                        {order.payment.method === 'cod' ? '💵 Cash on Delivery' :
                         order.payment.method === 'gpay' ? '📱 Google Pay' :
                         '💳 Card'}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-5 py-3 rounded-xl border ${
                    order.payment.status === 'success' 
                      ? 'bg-green-50 border-green-200' 
                      : order.payment.status === 'pending'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <span className="text-2xl">
                      {order.payment.status === 'success' ? '✅' : 
                       order.payment.status === 'pending' ? '⏳' : '❌'}
                    </span>
                    <div>
                      <p className="text-xs text-gray-600">Payment Status</p>
                      <p className={`font-bold text-sm ${
                        order.payment.status === 'success' ? 'text-green-700' :
                        order.payment.status === 'pending' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleTrackOrder(order)}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-md"
                  >
                    Track Order
                  </button>
                 <Link to = "/contact">
                  <button className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-orange-500 hover:text-orange-600 transition-all duration-300">
                    Get Help
                  </button>
                 </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRACKING MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">🚚</span>
                  Track Order
                </h2>
                <button
                  onClick={closeTracking}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-orange-100 mt-2">Order #{trackingOrder._id.slice(-8)}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Delivery Timeline */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl animate-bounce">📦</div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-800">Order is on the way!</h3>
                      <p className="text-green-700">Your delicious food is being delivered</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-green-200">
                    <p className="text-gray-600 mb-2">Expected Delivery:</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {calculateDeliveryDate(trackingOrder.createdAt).toLocaleString('en-IN', { 
                        dateStyle: 'long', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline Steps */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Status</h3>
                
                {/* Step 1 - Order Placed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="w-1 h-16 bg-green-500"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="font-bold text-gray-800">Order Placed</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(trackingOrder.createdAt).toLocaleString('en-IN', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Step 2 - Order Confirmed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="w-1 h-16 bg-orange-500"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="font-bold text-gray-800">Order Confirmed</h4>
                    <p className="text-sm text-gray-500">Your order has been confirmed</p>
                  </div>
                </div>

                {/* Step 3 - Out for Delivery */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold animate-pulse">
                      🚚
                    </div>
                    <div className="w-1 h-16 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="font-bold text-orange-600">Out for Delivery</h4>
                    <p className="text-sm text-gray-500">Your order is on its way</p>
                  </div>
                </div>

                {/* Step 4 - Delivered */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      📍
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-400">Delivered</h4>
                    <p className="text-sm text-gray-400">Expected soon</p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Order Details</h3>
                <div className="space-y-2">
                  {trackingOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-orange-600">₹{trackingOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeTracking}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;