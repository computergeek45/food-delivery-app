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

  const inputClass = "w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm";
  const labelClass = "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest";

  const sections = [
    { icon: "🖼️", label: "Image", color: "text-blue-400" },
    { icon: "📝", label: "Details", color: "text-green-400" },
    { icon: "💰", label: "Pricing", color: "text-orange-400" },
    { icon: "📄", label: "Description", color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-8 text-white">

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
          Menu Management
        </span>
        <h2 className="text-5xl font-black text-white mb-2 tracking-tight">
          Add New Product
        </h2>
        <p className="text-gray-400 text-base">Create a new menu item for your food delivery platform</p>
      </div>

      <div className="max-w-5xl">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">

          {/* ===== IMAGE SECTION ===== */}
          <div className="mb-10 pb-10 border-b border-white/8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center text-lg">🖼️</div>
              <h3 className="text-lg font-black text-white">Product Image</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Image URL <span className="text-red-500 normal-case">*</span></label>
                <input
                  className={inputClass}
                  placeholder="https://images.unsplash.com/..."
                  value={product.image}
                  onChange={(e) => setProduct({ ...product, image: e.target.value })}
                />
                <p className="text-xs text-gray-600 mt-2">Use Unsplash or any direct image link</p>
              </div>

              <div className="flex items-center justify-center">
                {product.image ? (
                  <div className="relative w-full group">
                    <img
                      src={product.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-2xl border border-white/10 shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Invalid+URL"; }}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow">
                      ✓ Preview
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-white/[0.02] rounded-2xl border border-dashed border-white/15 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block opacity-40">📷</span>
                      <p className="text-xs text-gray-600">Image preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== PRODUCT DETAILS SECTION ===== */}
          <div className="mb-10 pb-10 border-b border-white/8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-green-500/15 border border-green-500/25 rounded-xl flex items-center justify-center text-lg">📝</div>
              <h3 className="text-lg font-black text-white">Product Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Product Name <span className="text-red-500 normal-case">*</span></label>
                <input
                  className={inputClass}
                  placeholder="e.g., Margherita Pizza"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Category <span className="text-red-500 normal-case">*</span></label>
                <select
                  className={inputClass + " bg-[#111]"}
                  style={{ colorScheme: 'dark' }}
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
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

          {/* ===== PRICING SECTION ===== */}
          <div className="mb-10 pb-10 border-b border-white/8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-lg">💰</div>
              <h3 className="text-lg font-black text-white">Pricing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Regular Price (₹) <span className="text-red-500 normal-case">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 font-black text-base pointer-events-none">₹</span>
                  <input
                    type="number"
                    className={inputClass + " pl-9"}
                    placeholder="299"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Offer Price (₹) <span className="text-gray-600 normal-case font-normal">(Optional)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 font-black text-base pointer-events-none">₹</span>
                  <input
                    type="number"
                    className={inputClass + " pl-9"}
                    placeholder="249"
                    value={product.offerPrice}
                    onChange={(e) => setProduct({ ...product, offerPrice: e.target.value })}
                  />
                </div>
                {product.offerPrice && product.price && (
                  <p className="text-xs text-green-400 font-bold mt-2 flex items-center gap-1">
                    <span>💚</span>
                    {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% discount applied
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ===== DESCRIPTION SECTION ===== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-purple-500/15 border border-purple-500/25 rounded-xl flex items-center justify-center text-lg">📄</div>
              <h3 className="text-lg font-black text-white">Description</h3>
            </div>

            <textarea
              className={inputClass + " min-h-[120px] resize-none"}
              placeholder="Describe your product in detail... ingredients, taste, special features, etc."
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
            <p className="text-xs text-gray-600 mt-2">{product.description.length} characters</p>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex gap-4 pt-6 border-t border-white/8">
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-base rounded-xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>➕</span> Add Product
            </button>

            <button
              onClick={() => setProduct({ name: "", category: "", description: "", price: "", offerPrice: "", image: "" })}
              className="px-8 py-4 bg-white/5 border border-white/15 text-gray-400 font-bold rounded-xl hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <span>🔄</span> Reset
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: "💡", label: "Pro Tip", text: "Use high-quality images for better engagement", color: "border-blue-500/20 bg-blue-500/5", labelColor: "text-blue-400", textColor: "text-gray-500" },
            { icon: "✨", label: "Best Practice", text: "Write detailed descriptions to boost sales", color: "border-green-500/20 bg-green-500/5", labelColor: "text-green-400", textColor: "text-gray-500" },
            { icon: "🎯", label: "Recommended", text: "Set competitive prices for better conversion", color: "border-orange-500/20 bg-orange-500/5", labelColor: "text-orange-400", textColor: "text-gray-500" },
          ].map((tip, i) => (
            <div key={i} className={`border rounded-2xl p-4 flex items-start gap-3 ${tip.color}`}>
              <span className="text-xl shrink-0">{tip.icon}</span>
              <div>
                <p className={`font-bold text-sm mb-0.5 ${tip.labelColor}`}>{tip.label}</p>
                <p className={`text-xs leading-relaxed ${tip.textColor}`}>{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;