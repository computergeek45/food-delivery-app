import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/cart");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-focus items-center justify-center p-12">
        <div className="text-center text-white">
          <img 
            src="/login.png" 
            alt="Login" 
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
          <h1 className="text-4xl font-bold mt-8 mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90">Login to access your account</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-200">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white transition-colors"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              <button className="btn btn-primary w-full text-lg h-12">
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;