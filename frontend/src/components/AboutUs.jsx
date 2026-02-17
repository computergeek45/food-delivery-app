const AboutUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-xl group">
            <img 
             src="./aboutus.png" 
             alt="Delicious Food" 
             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
                About Us
              </h2>

              <p className="text-lg md:text-xl text-orange-600 font-medium italic mb-8 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Crafted with passion, Served with love
                <span className="text-2xl">✨</span>
              </p>
            </div>

            <div className="relative pl-6 border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed text-lg">
                At our core, we believe great food brings people together. 
                Our journey started with a simple idea — to make delicious, high-quality meals easily accessible to everyone. 
                From carefully selecting fresh ingredients to preparing every dish with attention and care, we focus on taste, quality, and consistency. 
                Whether you're craving comfort food or exploring new flavors, we're here to serve meals that feel familiar, satisfying, and made just for you. 
                Your happiness is our biggest ingredient, and every order is prepared with the same passion we'd serve to our own family.
              </p>
            </div>

            {/* Optional Stats or CTA */}
            <div className="pt-6 flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">500+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">50+</p>
                <p className="text-sm text-gray-600">Delicious Dishes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">100%</p>
                <p className="text-sm text-gray-600">Fresh Ingredients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;