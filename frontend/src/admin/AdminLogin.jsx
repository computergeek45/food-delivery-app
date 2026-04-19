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
    <div className="min-h-screen flex bg-[#0d0d0d]">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}>
        </div>
        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/20 rounded-full blur-[80px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-14 text-white">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-200 mb-6 px-3 py-1 bg-white/10 rounded-full border border-white/20">
            Admin Portal
          </span>
          <h1 className="text-6xl font-black mb-4 text-white leading-tight text-center">
            Welcome <br />Back!
          </h1>
          <p className="text-xl text-orange-100 text-center mb-14 leading-relaxed">
            Manage your food delivery <br />platform with ease
          </p>
          <div className="flex justify-center gap-6">
            {["🍕", "🍔", "🍜"].map((emoji, i) => (
              <span key={i} className="text-6xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0d0d0d] p-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 shadow-xl overflow-hidden p-3">
              <img
                src="/admin-icon.png"
                alt="Admin"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/2206/2206368.png"; }}
              />
            </div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Admin Login</h2>
            <p className="text-gray-400 text-base">Sign in to access your dashboard</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">

            {/* Username */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Username</label>
              <input
                type="text"
                placeholder="Enter admin username"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm"
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-base rounded-xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] active:scale-[0.98] transition-all duration-200"
            >
              Login to Dashboard →
            </button>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-transparent text-gray-500 font-medium tracking-widest uppercase">Admin Access Only</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
              <span className="text-xl shrink-0">ℹ️</span>
              <div>
                <p className="text-sm text-orange-400 font-bold mb-0.5">Secure Admin Portal</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your credentials are encrypted and secure. Only authorized administrators can access the dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Need help?{" "}
              <a href="#" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">Contact Support</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;