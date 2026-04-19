import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import DashboardHome from "./DashboardHome";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutAdmin = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const isDashboardHome = location.pathname === "/admin/dashboard";
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/admin/dashboard/add-product", icon: "➕", label: "Add Products" },
    { to: "/admin/dashboard/allproducts", icon: "🍕", label: "Product List" },
    { to: "/admin/dashboard/orders", icon: "📦", label: "Orders" },
  ];

  return (
    <div className="min-h-screen flex bg-[#0d0d0d]">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-[#111] border-r border-white/8 flex flex-col shrink-0">

        {/* Logo / Brand */}
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <span className="text-xl">👨‍💼</span>
            </div>
            <div>
              <h2 className="text-base font-black text-white">Admin Panel</h2>
              <p className="text-xs text-gray-500">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-3 px-3">
            Main Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive(item.to)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="px-4 mb-4">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
            <p className="text-xs text-orange-400 font-bold mb-3 uppercase tracking-widest">Quick Stats</p>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Today's Orders</span>
                <span className="text-xs font-black text-white bg-orange-500 px-2.5 py-0.5 rounded-lg">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Active Products</span>
                <span className="text-xs font-black text-white bg-green-500 px-2.5 py-0.5 rounded-lg">45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 pb-4">
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/25 text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 text-sm"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-5 border-t border-white/5 pt-4">
          <p className="text-xs text-gray-600 text-center mb-2">© 2025 Food Delivery Admin</p>
          <div className="flex justify-center items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">System Online</span>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-y-auto bg-[#0d0d0d]">
        {isDashboardHome ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
};

export default AdminDashboard;