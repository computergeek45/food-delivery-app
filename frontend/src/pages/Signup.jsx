import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary to-secondary-focus items-center justify-center p-12">
        <div className="text-center text-white">
          <img 
            src="/signup.jpg" 
            alt="Signup" 
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
          <h1 className="text-4xl font-bold mt-8 mb-4">Join Us Today!</h1>
          <p className="text-lg opacity-90">Create your account and get started</p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-200">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Sign up to get started with your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white transition-colors"
                  placeholder="John Doe"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white transition-colors"
                  placeholder="you@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  placeholder="Create a strong password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-start">
                <input type="checkbox" className="checkbox checkbox-sm mt-1 mr-2" required />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button className="btn btn-primary w-full text-lg h-12">
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
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

export default Signup;