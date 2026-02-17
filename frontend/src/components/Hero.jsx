const Hero = ({ searchRef }) => {
  return (
    <section className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_5px_15px_rgba(255,165,0,0.4)]">
            Order your <span className="text-orange-500">favourite</span> food
         </h1>

        {/* SEARCH BAR */}
        <div className="w-full max-w-2xl mt-8">
         <input
         ref={searchRef}
         type="text"
          placeholder="Search for food, restaurants, dishes..."
         className="input input-bordered w-full text-lg px-6 py-4 text-gray-800 bg-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-orange-500/30 hover:scale-[1.02] placeholder:text-gray-400"
        />
         </div>

      </div>
    </section>
  );
};

export default Hero;