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

  const calculateDeliveryDate = (orderDate) => {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate.setHours(deliveryDate.getHours() + 2);
    deliveryDate.setMinutes(deliveryDate.getMinutes() + 4);
    return deliveryDate;
  };

  const handleTrackOrder = (order) => setTrackingOrder(order);
  const closeTracking = () => setTrackingOrder(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-40 gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-400 font-medium text-base">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0d0d0d]"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Order History
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight flex items-center gap-4">
            My Orders <span className="text-5xl">📦</span>
          </h1>
          <p className="text-gray-400 mt-2 text-base">
            {orders.length > 0 ? `You have ${orders.length} order${orders.length > 1 ? 's' : ''}` : 'Track and manage your orders'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-28 bg-white/[0.03] border border-white/10 rounded-3xl">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-3xl font-black text-white mb-3">No orders yet</h2>
            <p className="text-gray-500 text-base mb-8">Start exploring our menu and place your first order!</p>
            <a href="/menu" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-200">
              Browse Menu →
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order._id} className="group bg-white/[0.03] border border-white/10 hover:border-orange-500/25 rounded-3xl p-7 md:p-8 transition-all duration-300">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-dashed border-white/10">
                  <div>
                    <p className="font-bold text-base text-white mb-1 flex items-center gap-2">
                      <span className="text-orange-400">🆔</span>
                      Order <span className="text-orange-400">#{order._id.slice(-8)}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span>📅</span>
                      {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl font-bold text-xs border ${
                    order.orderStatus === 'delivered'
                      ? 'bg-green-500/10 text-green-400 border-green-500/25'
                      : order.orderStatus === 'pending'
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                  }`}>
                    {order.orderStatus === 'delivered' ? '✅ Delivered' :
                     order.orderStatus === 'pending' ? '⏳ Pending' :
                     '🚚 ' + order.orderStatus}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="text-orange-400">🍽️</span> Order Items
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/8 rounded-xl">
                        <span className="text-gray-300 text-sm font-medium">
                          {item.name} <span className="text-orange-400 font-bold">× {item.quantity}</span>
                        </span>
                        <span className="font-bold text-white text-sm">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-dashed border-white/10 pt-5 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-white">Total Amount</span>
                    <span className="text-3xl font-black text-orange-400">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-xl">💳</span>
                    <div>
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="font-bold text-white text-xs">
                        {order.payment.method === 'cod' ? '💵 Cash on Delivery' :
                         order.payment.method === 'gpay' ? '📱 Google Pay' : '💳 Card'}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${
                    order.payment.status === 'success'
                      ? 'bg-green-500/10 border-green-500/20'
                      : order.payment.status === 'pending'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-red-500/10 border-red-500/20'
                  }`}>
                    <span className="text-lg">
                      {order.payment.status === 'success' ? '✅' : order.payment.status === 'pending' ? '⏳' : '❌'}
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className={`font-bold text-xs ${
                        order.payment.status === 'success' ? 'text-green-400' :
                        order.payment.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-5 border-t border-white/5">
                  <button
                    onClick={() => handleTrackOrder(order)}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-200 text-sm"
                  >
                    Track Order 🚚
                  </button>
                  <Link to="/contact">
                    <button className="px-6 py-2.5 bg-white/5 border border-white/15 text-gray-300 font-bold rounded-xl hover:border-orange-500/30 hover:text-orange-400 hover:bg-white/8 transition-all duration-200 text-sm">
                      Get Help
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== TRACKING MODAL ===== */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-3xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <span className="text-3xl">🚚</span> Track Order
                  </h2>
                  <p className="text-orange-100 text-sm mt-1">Order #{trackingOrder._id.slice(-8)}</p>
                </div>
                <button onClick={closeTracking} className="text-white hover:bg-white/20 rounded-xl p-2 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-7">

              {/* Delivery ETA */}
              <div className="mb-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl animate-bounce">📦</div>
                  <div>
                    <h3 className="text-lg font-black text-white">Order is on the way!</h3>
                    <p className="text-green-400 text-sm">Your delicious food is being delivered</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Expected Delivery</p>
                  <p className="text-2xl font-black text-orange-400">
                    {calculateDeliveryDate(trackingOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="text-base font-black text-white mb-5 uppercase tracking-widest text-xs text-gray-400">Order Status</h3>
                <div className="space-y-0">
                  {[
                    { label: "Order Placed", sub: new Date(trackingOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), done: true, icon: "✓" },
                    { label: "Order Confirmed", sub: "Your order has been confirmed", done: true, icon: "✓" },
                    { label: "Out for Delivery", sub: "Your order is on its way", active: true, icon: "🚚" },
                    { label: "Delivered", sub: "Expected soon", pending: true, icon: "📍" },
                  ].map((step, i, arr) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                          step.done ? 'bg-green-500 text-white' :
                          step.active ? 'bg-orange-500 text-white animate-pulse' :
                          'bg-white/10 text-gray-500'
                        }`}>
                          {step.icon}
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.done ? 'bg-green-500/50' : step.active ? 'bg-orange-500/30' : 'bg-white/10'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pt-2 pb-8">
                        <h4 className={`font-bold text-sm ${step.done ? 'text-white' : step.active ? 'text-orange-400' : 'text-gray-500'}`}>
                          {step.label}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <h3 className="font-black text-white text-sm mb-4 uppercase tracking-widest text-xs text-gray-400">Order Details</h3>
                <div className="space-y-2">
                  {trackingOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.name} × {item.quantity}</span>
                      <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3 mt-2">
                    <div className="flex justify-between font-black">
                      <span className="text-white">Total</span>
                      <span className="text-orange-400">₹{trackingOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={closeTracking}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-base rounded-xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all duration-200"
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