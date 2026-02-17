import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import "./index.css";

/* User Pages */
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

/* Admin Pages */
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AllProducts from "./admin/AllProducts";
import AdminOrders from "./admin/AdminOrders";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN DASHBOARD (NESTED ROUTES) */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            >
              <Route path="add-product" element={<AddProduct />} />
              <Route path="allproducts" element={<AllProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
