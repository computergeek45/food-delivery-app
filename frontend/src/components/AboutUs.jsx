const AboutUs = () => {
  return (
    <section className="bg-[#111111] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="w-full h-72 md:h-96 overflow-hidden rounded-3xl shadow-2xl group relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent z-10 rounded-3xl pointer-events-none"></div>
            <img
              src="./aboutus.png"
              alt="About Us"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-7">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                Our Story
              </span>
              <h2 className="text-5xl md:text-6xl font-black mb-3 text-white tracking-tight leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Us</span>
              </h2>
              <p className="text-base text-orange-400 font-semibold italic flex items-center gap-2 mt-3">
                <span>✨</span> Crafted with passion, Served with love <span>✨</span>
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-orange-500/50">
              <p className="text-gray-400 leading-relaxed text-base">
                At our core, we believe great food brings people together.
                Our journey started with a simple idea — to make delicious, high-quality meals easily accessible to everyone.
                From carefully selecting fresh ingredients to preparing every dish with attention and care, we focus on taste, quality, and consistency.
                Whether you're craving comfort food or exploring new flavors, we're here to serve meals that feel familiar, satisfying, and made just for you.
                Your happiness is our biggest ingredient, and every order is prepared with the same passion we'd serve to our own family.
              </p>
            </div>

            {/* Stats */}
            <div className="pt-4 flex gap-8">
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "50+", label: "Delicious Dishes" },
                { value: "100%", label: "Fresh Ingredients" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <p className="text-3xl font-black text-orange-400 group-hover:scale-110 transition-transform duration-200 inline-block">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;