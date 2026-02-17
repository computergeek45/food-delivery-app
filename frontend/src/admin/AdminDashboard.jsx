import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import DashboardHome from "./DashboardHome";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutAdmin = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // Check if admin is on dashboard root
  const isDashboardHome = location.pathname === "/admin/dashboard";

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-r border-gray-700">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </p>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/admin/dashboard')
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/dashboard/add-product"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/admin/dashboard/add-product')
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">➕</span>
                <span>Add Products</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/dashboard/allproducts"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/admin/dashboard/allproducts')
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">🍕</span>
                <span>Product List</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/dashboard/orders"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/admin/dashboard/orders')
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">📦</span>
                <span>Orders</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Stats Section */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-orange-300 font-semibold mb-2">Quick Stats</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Today's Orders</span>
                <span className="text-sm font-bold text-white bg-orange-500 px-2 py-0.5 rounded-full">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Active Products</span>
                <span className="text-sm font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-8">
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border-2 border-red-500 text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <span className="text-lg"></span>
            <span>Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Food Delivery Admin
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">System Online</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {isDashboardHome ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
};

export default AdminDashboard;