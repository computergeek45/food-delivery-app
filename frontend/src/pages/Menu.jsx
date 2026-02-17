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
    <>
       <Navbar />

     {/* HERO HEADER - With Background Image & Pattern */}
      <div className="relative bg-cover bg-center py-12 pt-24 md:pt-28"
       style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200')" }}
      >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-red-600/85 to-orange-700/90"></div>
  
      {/* Optional dot pattern overlay */}
       <div className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      </div>
  
      <div className="relative z-10 max-w-7xl mx-auto px-6">
       <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-2xl">
        Explore Our Menu
       </h1>
        <p className="text-lg text-orange-50 max-w-2xl drop-shadow-lg">
         Discover delicious dishes from various cuisines, freshly prepared just for you
        </p>
       <div className="w-24 h-1 bg-white mt-4 rounded-full shadow-lg"></div>
      </div>
       </div>
              
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* CATEGORY FILTER */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            Filter by Category
          </h3>
          <div className="flex gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-600 font-medium">
            <span className="text-orange-600 font-bold text-xl">{filteredProducts.length}</span> dishes found
          </p>
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 transition-colors"
            >
              ✕ Clear filter
            </button>
          )}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-orange-600 font-bold text-sm">⭐ 4.5</span>
                </div>
              </figure>

              <div className="p-5">
                <h2 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <span className="font-bold text-xl text-gray-900">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                    onClick={() => addToCart(product)}
                  >
                    <span>Add</span>
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-6">Try selecting a different category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
            >
              View All Dishes
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default Menu;