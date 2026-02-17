const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-base-200 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-10 border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT IMAGE */}
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-lg group">
              <img 
                src="./whytochoose.png" 
                alt="Delicious Food" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-800 relative inline-block">
                Why Choose Us?
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500 rounded-full"></span>
              </h2>

              <ul className="space-y-4">
                {[
                  { icon: "🍃", text: "Fresh and high-quality ingredients" },
                  { icon: "🚀", text: "Fast and reliable delivery" },
                  { icon: "🍽️", text: "Wide variety of dishes" },
                  { icon: "💰", text: "Affordable prices" },
                  { icon: "📱", text: "Easy ordering experience" },
                  { icon: "⭐", text: "Trusted by thousands of customers" }
                ].map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-3 text-gray-700 text-lg group/item hover:translate-x-2 transition-transform duration-200"
                  >
                    <span className="text-2xl group-hover/item:scale-125 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="group-hover/item:text-orange-600 transition-colors duration-200">
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