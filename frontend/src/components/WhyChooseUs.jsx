const WhyChooseUs = () => {
  return (
    <section className="bg-[#0d0d0d] py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-white/[0.03] rounded-3xl border border-white/10 overflow-hidden p-10 md:p-14">

          {/* Subtle glow accent */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative z-10">

            {/* LEFT IMAGE */}
            <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl group relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-2xl"></div>
              <img
                src="./whytochoose.png"
                alt="Delicious Food"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                Our Promise
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-10 text-white tracking-tight leading-tight">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Us?</span>
              </h2>

              <ul className="space-y-5">
                {[
                  { icon: "🍃", text: "Fresh and high-quality ingredients" },
                  { icon: "🚀", text: "Fast and reliable delivery" },
                  { icon: "🍽️", text: "Wide variety of dishes" },
                  { icon: "💰", text: "Affordable prices" },
                  { icon: "📱", text: "Easy ordering experience" },
                  { icon: "⭐", text: "Trusted by thousands of customers" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 group/item cursor-default"
                  >
                    <span className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-xl group-hover/item:bg-orange-500/10 group-hover/item:border-orange-500/30 transition-all duration-200 shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-gray-300 text-base font-medium group-hover/item:text-orange-400 group-hover/item:translate-x-1 transition-all duration-200 inline-block">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;