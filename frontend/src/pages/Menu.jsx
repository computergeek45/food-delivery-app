import { useEffect, useState} from "react";
import React, { useContext } from 'react';
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const categories = ["All", "Pizza", "Burger", "Pasta", "Dessert","Drinks","Biryani","Dosa","Butter Chicken", "Paneer","Salad","Cake","Nan","chinese","rolls"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Navbar />

      {/* ===== HERO HEADER ===== */}
      <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200')" }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0d0d0d]"></div>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        ></div>
        {/* Glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Fresh & Delicious
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tight leading-tight">
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Menu
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Discover delicious dishes from various cuisines, freshly prepared just for you
          </p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* CATEGORY FILTER */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500 mb-4">
            Browse by Category
          </p>
          <div className="flex gap-2.5 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-orange-500/40 hover:text-orange-400 hover:bg-white/8"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            Showing{" "}
            <span className="text-orange-400 font-bold text-base">{filteredProducts.length}</span>{" "}
            dishes
            {activeCategory !== "All" && (
              <span className="text-gray-600"> in <span className="text-white font-medium">{activeCategory}</span></span>
            )}
          </p>
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-xs text-gray-500 hover:text-orange-400 font-medium flex items-center gap-1.5 transition-colors border border-white/10 px-3 py-1.5 rounded-lg hover:border-orange-500/30"
            >
              ✕ Clear filter
            </button>
          )}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>

              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600 ease-out"
                />
                {/* Dark gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  <span className="text-orange-400 font-bold text-xs">★ 4.5</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative z-20">
                <h2 className="font-bold text-base mb-1.5 text-white group-hover:text-orange-400 transition-colors leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs text-gray-500 mb-5 line-clamp-2 min-h-[32px] leading-relaxed">
                  {product.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5 uppercase tracking-wider">Price</p>
                    <span className="font-black text-xl text-white">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-200 text-sm flex items-center gap-1.5"
                    onClick={() => addToCart(product)}
                  >
                    Add
                    <span className="text-base leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-28">
            <div className="text-7xl mb-6">🍽️</div>
            <h3 className="text-2xl font-black text-white mb-2">No dishes found</h3>
            <p className="text-gray-500 mb-8 text-sm">Try selecting a different category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-200 text-sm"
            >
              View All Dishes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;