import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onValueClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        {/* LEFT: LOGO */}
        {/* LEFT: LOGO */}
        <div className="relative w-48 h-16"> {/* Define a fixed area for the logo */}
         <Link to="/">
            <img 
              src="./flavorush.png" 
              alt="Flavorush Logo" 
              className="absolute top-1/2 left-[-50] -translate-y-1/2 min-w-[400px] h-auto object-contain"
            />
            </Link>
        </div>

        {/* RIGHT: NAV LINKS */}
        <div className="hidden md:flex items-center gap-10 text-lg font-bold text-white">

            {/* 🔑 ADMIN BUTTON */}
               <Link
                  to="/admin/login"
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
               >
                Admin
               </Link>

          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>

          <Link to="/menu" className="hover:text-primary transition">
            Food
          </Link>

          {/* UPDATE 1: CART VISIBLE ONLY WHEN LOGGED IN */}
          {user && (
            <Link to="/cart" className="hover:text-primary transition">
              Cart
            </Link>
          )}

          <a href="/contact" className="hover:text-primary transition">
            Contact Us
          </a>

          {/* AUTH AREA */}
          {!user ? (
            // NOT LOGGED IN
            <Link
              to="/login"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
            >
              Login
            </Link>
          ) : (
            // LOGGED IN
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-circle avatar border-none">
                {/* UPDATE 2: REPLACED WHITE CIRCLE WITH AVATAR ICON + INITIAL */}
                <div className="w-10 rounded-full bg-primary flex items-center justify-center text-white relative">
                   {/* This SVG creates the "User Person" look inside the circle */}
                   <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-8 h-8 opacity-40 absolute"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40 text-black"
              >
                <li>
                  <Link to="/cart">My Cart</Link>
                </li>
                <li>
                   <Link to="/my-orders">My Orders</Link>
               </li>
                <li>
                  <button onClick={logout}>Logout</button>
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