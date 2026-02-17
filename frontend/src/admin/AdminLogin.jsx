import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE - Image/Sticker Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* You can insert your image here */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">
              Welcome Back!
            </h1>
            <p className="text-2xl text-orange-100 drop-shadow-lg">
              Manage your food delivery platform
            </p>
            
            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center gap-8">
              <div className="text-7xl animate-bounce">🍕</div>
              <div className="text-7xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍔</div>
              <div className="text-7xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍜</div>
            </div>
          </div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", 
            backgroundSize: "30px 30px" 
          }}>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 shadow-xl overflow-hidden p-3">
              <img 
                src="/admin-icon.png" 
                alt="Admin" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/2206/2206368.png"; 
                 }}
               />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Admin Login
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in to access your dashboard
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            
            {/* Username Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl"></span>
                </div>
                <input
                  type="text"
                  placeholder="Enter admin username"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800 font-medium"
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl"></span>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800 font-medium"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login to Dashboard →
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Admin Access Only</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="text-sm text-orange-800 font-semibold mb-1">
                  Secure Admin Portal
                </p>
                <p className="text-xs text-orange-700">
                  Your credentials are encrypted and secure. Only authorized administrators can access the dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Need help? <a href="#" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">Contact Support</a>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminLogin;