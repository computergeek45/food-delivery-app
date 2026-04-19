import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onValueClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* LEFT: LOGO */}
        <div className="relative w-48 h-16">
          <Link to="/">
            <img
              src="./flavorush.png"
              alt="Flavorush Logo"
              className="absolute top-1/2 left-[-50] -translate-y-1/2 min-w-[400px] h-auto object-contain"
            />
          </Link>
        </div>

        {/* RIGHT: NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/90">

          {/* Admin Button */}
          <Link
            to="/admin/login"
            className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-xs tracking-widest uppercase"
          >
            Admin
          </Link>

          <Link
            to="/"
            className="text-white/70 hover:text-orange-400 transition-colors duration-200 tracking-wide"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="text-white/70 hover:text-orange-400 transition-colors duration-200 tracking-wide"
          >
            Food
          </Link>

          {/* Cart - only when logged in */}
          {user && (
            <Link
              to="/cart"
              className="text-white/70 hover:text-orange-400 transition-colors duration-200 tracking-wide"
            >
              Cart
            </Link>
          )}

          <a
            href="/contact"
            className="text-white/70 hover:text-orange-400 transition-colors duration-200 tracking-wide"
          >
            Contact Us
          </a>

          {/* AUTH AREA */}
          {!user ? (
            <Link to="/login">
              <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-200 text-sm tracking-wide">
                Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-circle avatar border-none bg-transparent p-0 hover:scale-110 transition-transform duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white relative overflow-hidden border-2 border-orange-400/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 opacity-60 absolute"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl w-44 text-white text-sm"
              >
                <li>
                  <Link to="/cart" className="hover:bg-orange-500/10 hover:text-orange-400 rounded-xl transition-colors duration-150">
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className="hover:bg-orange-500/10 hover:text-orange-400 rounded-xl transition-colors duration-150">
                    My Orders
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors duration-150 w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;