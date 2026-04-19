import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden h-80">
        <div className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=400&fit=crop')" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-[#0d0d0d]"></div>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/20 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            Get In Touch
          </span>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Us</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30 pb-20">

        {/* ===== CONTACT FORM CARD ===== */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden mb-10">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Have Any Questions?</h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
                Want to know about any of our ingredients or suppliers? Or maybe you just want to say Aloha? Send us a message below.
              </p>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-8 p-5 bg-green-500/10 border border-green-500/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h3 className="text-green-400 font-bold text-base">Thank you for reaching out!</h3>
                    <p className="text-green-500/80 text-sm">Your message has been sent. Our team will contact you soon.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter a valid email address"
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message..."
                  rows="6"
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all duration-200 text-white placeholder-gray-600 resize-none text-sm"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-200 text-sm tracking-widest uppercase"
                >
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ===== HOURS & CONTACTS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* We Are Open */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-orange-500/20 transition-colors duration-300">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Hours
            </span>
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">We Are Open</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Located in the heart of downtown.<br />
              <span className="text-orange-400 font-semibold">Delivery within 25 km in any direction.</span>
            </p>
            <div className="space-y-3">
              {[
                { day: "Mon – Wed", time: "9:00 am – 5:00 pm" },
                { day: "Thu – Fri", time: "9:00 am – 8:30 pm" },
                { day: "Saturday", time: "9:00 am – 10:00 pm" },
                { day: "Sunday", time: "Closed", closed: true },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-gray-300 text-sm font-medium">{row.day}</span>
                  <span className={`text-sm font-bold ${row.closed ? "text-red-400" : "text-orange-400"}`}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-orange-500/20 transition-colors duration-300">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Reach Us
            </span>
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Contacts</h2>

            <div className="mb-6 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop"
                alt="Healthy food bowls"
                className="w-40 h-40 rounded-2xl object-cover border border-white/10 shadow-xl"
              />
            </div>

            <p className="text-gray-400 text-sm text-center mb-5 leading-relaxed">
              Feel free to get in touch with us via email or phone
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300 text-sm"><span className="text-white font-semibold">HQ:</span> Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300 text-sm"><span className="text-white font-semibold">Email:</span> support@mumbai.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== NEWSLETTER ===== */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-3xl p-10 mb-10">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="relative max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Stay Updated
            </span>
            <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Sign Up for the Newsletter</h3>
            <p className="text-gray-400 text-sm mb-7 leading-relaxed">
              Want to be the first to read our news? Subscribe to keep up with all events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/60 transition-all duration-200 text-white placeholder-gray-600 text-sm"
              />
              <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-200 text-sm tracking-wide uppercase">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-96">
            <iframe
              title="Mumbai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709253!3d19.082177516691103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;