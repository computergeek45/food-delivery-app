import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    offerPrice: "",
    image: "",
  });

  const handleSubmit = async () => {
    if (!product.name || !product.category || !product.price) {
      alert("Fill required fields");
      return;
    }

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    alert("Product added ✅");

    setProduct({
      name: "",
      category: "",
      description: "",
      price: "",
      offerPrice: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-gray-900 mb-3 flex items-center gap-4">
          <span className="text-blue-600"></span>
          Add New Product
        </h2>
        <p className="text-gray-600 text-lg">
          Create a new menu item for your food delivery platform
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 mt-4 rounded-full"></div>
      </div>

      <div className="max-w-5xl">
        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          
          {/* Image Preview Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🖼️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Product Image</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 text-gray-800"
                  placeholder="https://images.unsplash.com/..."
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-2">Use Unsplash or any image link</p>
              </div>
              
              {/* Image Preview */}
              <div className="flex items-center justify-center">
                {product.image ? (
                  <div className="relative group">
                    <img 
                      src={product.image} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-xl border-4 border-blue-200 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Preview
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl mb-2 block">📷</span>
                      <p className="text-sm text-gray-500">Image preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Product Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all duration-300 text-gray-800"
                  placeholder="e.g., Margherita Pizza"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all duration-300 text-gray-800 bg-white"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Pizza">🍕 Pizza</option>
                  <option value="Burger">🍔 Burger</option>
                  <option value="Biryani">🍛 Biryani</option>
                  <option value="Pasta">🍝 Pasta</option>
                  <option value="Dessert">🍰 Dessert</option>
                  <option value="Drinks">🥤 Drinks</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Pricing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Regular Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Regular Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    className="w-full pl-10 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                    placeholder="299"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Offer Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Offer Price (₹) <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    className="w-full pl-10 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 text-gray-800"
                    placeholder="249"
                    value={product.offerPrice}
                    onChange={(e) =>
                      setProduct({ ...product, offerPrice: e.target.value })
                    }
                  />
                </div>
                {product.offerPrice && product.price && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    💚 {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% discount
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Description</h3>
            </div>

            <textarea
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-800 min-h-[120px]"
              placeholder="Describe your product in detail... ingredients, taste, special features, etc."
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-2">{product.description.length} characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-black text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="text-2xl"></span>
              <span>Add Product</span>
            </button>
            
            <button 
              onClick={() => setProduct({
                name: "",
                category: "",
                description: "",
                price: "",
                offerPrice: "",
                image: "",
              })}
              className="px-8 py-4 bg-blue-500 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-red-500 hover:text-red-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-xl"></span>
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-blue-900 text-sm">Pro Tip</p>
              <p className="text-xs text-blue-700">Use high-quality images for better engagement</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-bold text-green-900 text-sm">Best Practice</p>
              <p className="text-xs text-green-700">Write detailed descriptions to boost sales</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-bold text-orange-900 text-sm">Recommended</p>
              <p className="text-xs text-orange-700">Set competitive prices for better conversion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;