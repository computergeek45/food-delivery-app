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

  /* ---------------- VALIDATION ---------------- */

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

  /* ---------------- PLACE ORDER ---------------- */

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
        transactionId:
          paymentMethod === "cod"
            ? null
            : "TXN" + Date.now(),
      },

      totalAmount: total,
    };

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  } catch (err) {
    console.error("Order save failed", err);
  }
 };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-12 pt-24 md:pt-28 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg flex items-center gap-3">
            <span className="text-6xl">✅</span>
            Checkout
          </h1>
          <p className="text-green-50 mt-2 text-lg">
            Complete your order - we're almost there!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: ADDRESS FORM */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-3">
              <span className="text-orange-600">📍</span>
              Delivery Address
            </h2>
            <p className="text-gray-500 mb-6">Where should we deliver your order?</p>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                  placeholder="House no., Building name, Area"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800 bg-white"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                    placeholder="6-digit pincode"
                    maxLength="6"
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Address Validation Status */}
            {isAddressValid() && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-green-700 font-semibold">Address details verified!</p>
              </div>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-3">
              <span className="text-orange-600">💳</span>
              Payment Method
            </h2>
            <p className="text-gray-500 mb-6">Choose your preferred payment option</p>

            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === "cod" 
                  ? "border-orange-500 bg-orange-50" 
                  : "border-gray-200 hover:border-orange-300 bg-white"
              } ${!isAddressValid() ? "opacity-50 cursor-not-allowed" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  disabled={!isAddressValid()}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">💵</span>
                  <div>
                    <p className="font-semibold text-gray-800">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === "gpay" 
                  ? "border-orange-500 bg-orange-50" 
                  : "border-gray-200 hover:border-orange-300 bg-white"
              } ${!isAddressValid() ? "opacity-50 cursor-not-allowed" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  disabled={!isAddressValid()}
                  onChange={() => setPaymentMethod("gpay")}
                />
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="font-semibold text-gray-800">Google Pay</p>
                    <p className="text-sm text-gray-500">UPI payment</p>
                  </div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === "card" 
                  ? "border-orange-500 bg-orange-50" 
                  : "border-gray-200 hover:border-orange-300 bg-white"
              } ${!isAddressValid() ? "opacity-50 cursor-not-allowed" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  disabled={!isAddressValid()}
                  onChange={() => setPaymentMethod("card")}
                />
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">💳</span>
                  <div>
                    <p className="font-semibold text-gray-800">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                  </div>
                </div>
              </label>
            </div>

            {!isAddressValid() && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-yellow-800 text-sm font-medium">Please complete the delivery address first</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY - Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="text-orange-600">📋</span>
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-4"></div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-700">
                <span className="flex items-center gap-2">
                  <span>🍽️</span>
                  Item Total
                </span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-700">
                <span className="flex items-center gap-2">
                  <span>🚚</span>
                  Delivery Fee
                </span>
                <span className="font-semibold">₹{deliveryFee}</span>
              </div>
              
              <div className="border-t-2 border-dashed border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold text-orange-600">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!isAddressValid() || !paymentMethod}
            >
              {!isAddressValid() ? "Complete Address" : !paymentMethod ? "Select Payment" : "Place Order 🎉"}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">🔒</span>
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">⚡</span>
                  <span className="font-medium">Fast</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">✅</span>
                  <span className="font-medium">Safe</span>
                </div>
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