import { useContext } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useContext(CartContext);
  const deliveryFee = 50;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      {/* ===== HERO HEADER ===== */}
      <div className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0d0d0d]"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Your Order
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight flex items-center gap-4">
            My Cart
            <span className="text-5xl">🛒</span>
          </h1>
          <p className="text-gray-400 mt-2 text-base">
            {cart.length > 0 ? `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {cart.length === 0 ? (
          <div className="text-center py-28 bg-white/[0.03] border border-white/10 rounded-3xl">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-black text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-500 text-base mb-8">Looks like you haven't added anything yet</p>
            <Link
              to="/menu"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-200"
            >
              Browse Menu →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: ITEM LIST */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <span className="text-orange-400">📋</span>
                  Order Items
                  <span className="ml-1 text-sm font-bold text-gray-500 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                    {cart.length}
                  </span>
                </h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="group flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/[0.03] border border-white/8 hover:border-orange-500/25 p-5 rounded-2xl transition-all duration-300 gap-4"
                    >
                      {/* Left: Image + Info */}
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="relative shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg shadow">
                            ★ 4.5
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-base text-white mb-1 group-hover:text-orange-400 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-orange-400 font-black text-lg mb-3">₹{item.price}</p>

                          {/* Quantity Control */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">Qty:</span>
                            <div className="flex items-center border border-white/15 rounded-xl overflow-hidden">
                              <button
                                className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 hover:text-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-colors text-sm"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className="px-4 py-1.5 bg-orange-500/20 text-orange-400 font-black text-sm min-w-[40px] text-center border-x border-white/10">
                                {item.quantity}
                              </span>
                              <button
                                className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 hover:text-orange-400 text-white font-bold transition-colors text-sm"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Total + Remove */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">Total</p>
                          <p className="font-black text-2xl text-white">₹{item.price * item.quantity}</p>
                        </div>
                        <button
                          className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1.5"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <span>🗑️</span>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: BILLING */}
            <div className="lg:col-span-1">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 sticky top-28">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <span className="text-orange-400">🧾</span>
                  Bill Details
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span className="flex items-center gap-2"><span>🍽️</span> Item Total</span>
                    <span className="font-semibold text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span className="flex items-center gap-2"><span>🚚</span> Delivery Fee</span>
                    <span className="font-semibold text-white">₹{deliveryFee}</span>
                  </div>
                  <div className="border-t border-dashed border-white/10 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-white">Grand Total</span>
                      <span className="text-3xl font-black text-orange-400">₹{subtotal + deliveryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6">
                  <p className="text-green-400 text-xs font-semibold flex items-center gap-2">
                    <span>🎉</span> You're saving ₹0 on this order
                  </p>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-base rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-200"
                >
                  Proceed to Checkout →
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs text-gray-500">
                    <div className="flex flex-col items-center bg-white/5 rounded-xl py-3 border border-white/8">
                      <img
                        src="/secure-payment.png"
                        alt="Secure"
                        className="w-8 h-8 mb-1.5 object-contain opacity-70"
                        onError={(e) => { e.target.style.display='none' }}
                      />
                      <span className="font-medium text-gray-400">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 rounded-xl py-3 border border-white/8">
                      <img
                        src="/fast-delivery.png"
                        alt="Fast"
                        className="w-8 h-8 mb-1.5 object-contain opacity-70"
                        onError={(e) => { e.target.style.display='none' }}
                      />
                      <span className="font-medium text-gray-400">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;