import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* Components */
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import MenuCategoryCard from "../components/MenuCategoryCard";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutUs from "../components/AboutUs";
import LatestReviews from "../components/LatestReviews";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  const searchRef = useRef(null);

  const handleValueClick = () => {
    searchRef.current?.focus();
  };

  /* Fetch products */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-white font-sans">

      {/* ================= NAVBAR & HERO ================= */}
      <Navbar onValueClick={handleValueClick} />
      <Hero searchRef={searchRef} />

      {/* ============ TOP DISHES NEAR YOU ============ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Trending Now
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tight leading-tight">
            Top Dishes <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Near You 🍕
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mt-4">
            Discover the most popular dishes loved by customers in your area
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link to="/menu">
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300 shadow-lg text-base tracking-wide">
              View All Dishes →
            </button>
          </Link>
        </div>
      </section>

      {/* ============ EXPLORE OUR MENU ============ */}
      <section className="bg-[#111111] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-3 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Our Categories
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tight">
              Explore Our Menu
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From comfort classics to exotic cuisines — find your perfect meal
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MenuCategoryCard
              title="Pizza"
              description="Hot, cheesy pizzas made with fresh ingredients."
              image="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca"
            />
            <MenuCategoryCard
              title="Burgers"
              description="Juicy burgers with crispy fries and sauces."
              image="https://images.unsplash.com/photo-1550547660-d9450f859349"
            />
            <MenuCategoryCard
              title="Indian"
              description="Authentic Indian meals full of flavor."
              image="https://images.unsplash.com/photo-1601050690597-df0568f70950"
            />
            <MenuCategoryCard
              title="Desserts"
              description="Sweet treats to end your meal perfectly."
              image="https://images.unsplash.com/photo-1601979031925-424e53b6caaa"
            />
            <MenuCategoryCard
              title="Drinks"
              description="Refreshing drinks to complement your food."
              image="https://images.unsplash.com/photo-1544145945-f90425340c7e"
            />
            <MenuCategoryCard
              title="Healthy"
              description="Light and healthy options for every day."
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            />
          </div>

          {/* Stats Bar */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white/5 backdrop-blur px-10 py-5 rounded-2xl border border-white/10">
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400">100+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Menu Items</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400">50+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Cuisines</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400">24/7</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <WhyChooseUs />

      {/* ============ ABOUT US ============ */}
      <AboutUs />

      {/* ============ LATEST REVIEWS ============ */}
      <LatestReviews />

      {/* ============ CTA SECTION ============ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] py-28 border-t border-white/5">
        {/* Glow blobs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-5 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Get Started
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight tracking-tight">
            Ready to Order Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Favorite Food?
            </span>
          </h2>
          <p className="text-xl mb-10 text-gray-400 max-w-xl mx-auto">
            Join thousands of happy customers and get your meal delivered in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.35)] transition-all duration-300 shadow-xl text-base tracking-wide">
                Order Now 🚀
              </button>
            </Link>
            <Link to="/menu">
              <button className="px-10 py-4 bg-white/5 border border-white/15 text-white font-bold rounded-2xl hover:bg-white/10 hover:scale-105 transition-all duration-300 text-base tracking-wide">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />

    </div>
  );
};

export default Home;