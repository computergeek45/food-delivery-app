import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import PaymentModal from "../components/PaymentModal";

const Checkout = () => {
  const { cart, subtotal } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const isAddressValid = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return (
      address.name.trim() &&
      phoneRegex.test(address.phone) &&
      address.street.trim() &&
      address.city &&
      address.pincode.trim().length === 6
    );
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Add something in cart first, your cart seems empty 🛒");
      return;
    }
    if (!isAddressValid()) {
      alert("Please fill all address details correctly");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (paymentMethod === "cod") {
      placeOrderToBackend("pending");
      alert("Order placed successfully 🎉");
    } else {
      setShowPayment(true);
    }
  };

  const placeOrderToBackend = async (paymentStatus) => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        address,
        payment: {
          method: paymentMethod,
          status: paymentStatus,
          transactionId: paymentMethod === "cod" ? null : "TXN" + Date.now(),
        },
        totalAmount: total,
      };
      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error("Order save failed", err);
    }
  };

  const inputClass = "w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm";
  const labelClass = "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest";

  const paymentOptions = [
    { id: "cod", emoji: "💵", label: "Cash on Delivery", sub: "Pay when you receive" },
    { id: "gpay", emoji: "📱", label: "Google Pay", sub: "UPI payment" },
    { id: "card", emoji: "💳", label: "Credit / Debit Card", sub: "Visa, Mastercard, etc." },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      {/* ===== HERO HEADER ===== */}
      <div className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0d0d0d]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-green-500 mb-4 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
            Almost There
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight flex items-center gap-4">
            Checkout
            <span className="text-5xl">✅</span>
          </h1>
          <p className="text-gray-400 mt-2 text-base">Complete your order — we're almost there!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: ADDRESS + PAYMENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Address */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 md:p-9">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Step 1
            </span>
            <h2 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
              <span>📍</span> Delivery Address
            </h2>
            <p className="text-gray-500 text-sm mb-7">Where should we deliver your order?</p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500 normal-case">*</span></label>
                <input
                  className={inputClass}
                  placeholder="Enter your full name"
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
              </div>
             <div>
              <label className={labelClass}>Phone Number <span className="text-red-500 normal-case">*</span></label>
               <div className="flex items-center bg-white/5 border border-white/10 rounded-xl focus-within:border-orange-500/60 focus-within:bg-white/8 transition-all duration-200 overflow-hidden">
                <span className="px-4 py-3.5 text-sm font-bold text-orange-400 border-r border-white/10 bg-white/5 shrink-0">
                 +91
                </span>
               <input
                className="flex-1 px-4 py-3.5 bg-transparent focus:outline-none text-white placeholder-gray-600 text-sm"
                placeholder="10-digit mobile number"
                maxLength="10"
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
               />
              </div>
              </div>
              <div>
                <label className={labelClass}>Street Address <span className="text-red-500 normal-case">*</span></label>
                <input
                  className={inputClass}
                  placeholder="House no., Building name, Area"
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>City <span className="text-black-normal-case">*</span></label>
                  <select
                    className={inputClass + "bg-[#111] [&>option]:bg-[#1a1a1a] [&>option]:text-white"}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Pincode <span className="text-red-500 normal-case">*</span></label>
                  <input
                    className={inputClass}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {isAddressValid() && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <p className="text-green-400 font-semibold text-sm">Address details verified!</p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 md:p-9">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Step 2
            </span>
            <h2 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
              <span>💳</span> Payment Method
            </h2>
            <p className="text-gray-500 text-sm mb-7">Choose your preferred payment option</p>

            <div className="space-y-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === opt.id
                      ? "border-orange-500/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-orange-500/25 hover:bg-white/5"
                  } ${!isAddressValid() ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4 accent-orange-500"
                    disabled={!isAddressValid()}
                    onChange={() => setPaymentMethod(opt.id)}
                  />
                  <span className="text-2xl">{opt.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.sub}</p>
                  </div>
                  {paymentMethod === opt.id && (
                    <span className="text-orange-400 text-lg">✓</span>
                  )}
                </label>
              ))}
            </div>

            {!isAddressValid() && (
              <div className="mt-5 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3">
                <span className="text-yellow-400 text-xl">⚠️</span>
                <p className="text-yellow-400 text-sm font-medium">Please complete the delivery address first</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 sticky top-28">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <span className="text-orange-400">📋</span> Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-2.5 mb-6 max-h-56 overflow-y-auto pr-1 scrollbar-hide">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-start p-3 bg-white/5 border border-white/8 rounded-xl">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-white text-xs leading-snug">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-orange-400 text-sm shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-white/10 mb-5"></div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <span className="flex items-center gap-2"><span>🍽️</span> Item Total</span>
                <span className="font-semibold text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <span className="flex items-center gap-2"><span>🚚</span> Delivery Fee</span>
                <span className="font-semibold text-white">₹{deliveryFee}</span>
              </div>
              <div className="border-t border-dashed border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-black text-orange-400">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-base rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              disabled={!isAddressValid() || !paymentMethod}
            >
              {!isAddressValid() ? "Complete Address" : !paymentMethod ? "Select Payment" : "Place Order 🎉"}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "⚡", label: "Fast" },
                  { icon: "✅", label: "Safe" },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center bg-white/5 rounded-xl py-3 border border-white/8">
                    <span className="text-xl mb-1">{b.icon}</span>
                    <span className="font-medium text-gray-400">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          method={paymentMethod}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            placeOrderToBackend("success");
            setShowPayment(false);
            alert("Payment successful & order placed 🎉");
          }}
        />
      )}
    </div>
  );
};

export default Checkout;