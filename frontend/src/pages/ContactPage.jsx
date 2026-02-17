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
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section with Food Image */}
      <div className="relative h-80 bg-gradient-to-r from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=400&fit=crop" 
            alt="Delicious food bowls" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-wide" style={{fontFamily: 'Brush Script MT, cursive'}}>
            Contact Us
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Main Content */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">HAVE ANY QUESTIONS</h2>
              <p className="text-slate-600 text-lg">
                Want to know about any of our ingredients or suppliers? Or maybe you just want to say Aloha? Send us a message below and we'll get right back to you.
              </p>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <h3 className="text-green-800 font-semibold text-lg">Thank you for reaching out!</h3>
                    <p className="text-green-700">Your request has been sent. Our team will contact you soon. Kindly keep checking your email.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter a valid email address" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Name" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message" 
                  rows="6"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button 
                  type="submit"
                  className="px-12 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 uppercase tracking-wide"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Hours and Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* We Are Open */}
          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">WE ARE OPEN</h2>
            <p className="text-center text-slate-700 mb-6">
              We bring you the flavor of the ocean, but are located in the heart of downtown.<br/>
              <span className="font-semibold">Delivery within 25 km in any direction.</span>
            </p>
            <div className="space-y-2 text-center text-slate-700">
              <p>Mon - Wed 9:00 am - 5:00 pm</p>
              <p>Thu - Fri 9:00 am - 8:30 pm</p>
              <p>Saturday 9:00 am - 10:00 pm</p>
              <p className="font-semibold">Sunday Closed</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">CONTACTS</h2>
            
            {/* Food Image */}
            <div className="mb-6 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop" 
                alt="Healthy food bowls" 
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>

            <div className="space-y-4 text-slate-700">
              <p className="text-center">
                Use our contact form for all information requests or contact us directly using the contact information below.
              </p>
              <p className="text-center font-semibold">
                Feel free to get in touch with us via email or phone
              </p>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold">Headquarters:</span>
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Email:</span>
                  <span>support@mumbai.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-10 shadow-2xl mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-4">SIGN UP FOR THE NEWSLETTER</h3>
            <p className="text-slate-300 mb-6">
              Want to be the first to read our news? Subscribe to the newsletter to keep abreast of all events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Enter a valid email address" 
                className="flex-1 max-w-md px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition uppercase">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
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