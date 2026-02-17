import { useContext } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useContext(CartContext);
  const deliveryFee = 50;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 pt-24 md:pt-28 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg flex items-center gap-3">
            <span className="text-6xl">🛒</span>
            My Cart
          </h1>
          <p className="text-orange-50 mt-2 text-lg">
            {cart.length > 0 ? `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link 
              to="/menu" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: ITEM LIST */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-orange-600">📋</span>
                  Order Items ({cart.length})
                </h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-5 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 gap-4 group"
                    >
                      {/* Left Section: Image and Info */}
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            ⭐ 4.5
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-orange-600 font-bold text-xl mb-3">₹{item.price}</p>
                          
                          {/* Quantity Toggler */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                            <div className="flex items-center border-2 border-orange-500 rounded-full overflow-hidden shadow-sm">
                              <button
                                className="px-4 py-2 bg-white hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed text-orange-600 font-bold transition-colors"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className="px-5 py-2 bg-orange-500 text-white font-bold min-w-[50px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="px-4 py-2 bg-white hover:bg-orange-50 text-orange-600 font-bold transition-colors"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section: Price Summary & Remove */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Item Total</p>
                          <p className="font-bold text-2xl text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <button
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm"
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

            {/* RIGHT: BILLING SECTION - Sticky */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <img 
                    src="/billing-icon.png" 
                    alt="Bill" 
                    className="w-8 h-8 object-contain"
                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/1052/1052856.png" }} // Fallback if local file fails
                  />
                     Bill Details
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🍽️</span>
                      Item Total
                    </span>
                    <span className="font-semibold text-lg">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🚚</span>
                      Delivery Fee
                    </span>
                    <span className="font-semibold text-lg">₹{deliveryFee}</span>
                  </div>
                  
                  <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Grand Total</span>
                      <span className="text-3xl font-bold text-orange-600">₹{subtotal + deliveryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-green-700 text-sm font-semibold flex items-center gap-2">
                    <span className="text-lg">🎉</span>
                    You're saving ₹0 on this order
                  </p>
                </div>

                <Link 
                  to="/checkout" 
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout →
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs text-gray-600">
                    <div className="flex flex-col items-center">
                      <img 
                            src="/secure-payment.png" 
                            alt="Secure" 
                            className="w-10 h-10 mb-2 object-contain" 
                      />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center">
                     <img 
                            src="/fast-delivery.png" 
                            alt="Fast" 
                            className="w-10 h-10 mb-2 object-contain" 
                     />
                      <span className="font-medium">Fast delivery</span>
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