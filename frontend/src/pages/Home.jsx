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
    <div className="bg-gradient-to-b from-gray-50 to-white text-base-content">

      {/* ================= NAVBAR & HERO ================= */}
      <Navbar onValueClick={handleValueClick} />
      <Hero searchRef={searchRef} />

      {/* ============ TOP DISHES NEAR YOU ============ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            Top Dishes Near You <span className="inline-block animate-bounce">🍕</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover the most popular dishes loved by customers in your area
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to = "/menu">
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Dishes
          </button>
          </Link>
        </div>
      </section>

      {/* ============ EXPLORE OUR MENU ============ */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              Explore Our Menu
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From comfort classics to exotic cuisines - find your perfect meal
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {/* Decorative Elements */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 bg-white px-8 py-4 rounded-full shadow-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">100+</p>
                <p className="text-sm text-gray-600">Menu Items</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">50+</p>
                <p className="text-sm text-gray-600">Cuisines</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">24/7</p>
                <p className="text-sm text-gray-600">Available</p>
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
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Order Your Favorite Food?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of happy customers and get your meal delivered in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/menu">
            <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
              Order Now
             </button>
            </Link>
            <Link to="/menu">
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-300">
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