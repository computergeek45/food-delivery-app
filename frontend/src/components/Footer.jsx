import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP FOOTER LINKS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 pb-12">

          {/* USE CASES */}
          <div className="group">
            <h3 className="font-bold mb-6 text-lg text-orange-400 uppercase tracking-wider">
              Use cases
            </h3>
            <ul className="space-y-3 text-sm">
              {['UI design', 'UX design', 'Wireframing', 'Diagramming', 'Brainstorming', 'Team collaboration'].map((item, i) => (
                <li key={i} className="text-gray-300 hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* EXPLORE */}
          <div className="group">
            <h3 className="font-bold mb-6 text-lg text-orange-400 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {['Design', 'Prototyping', 'Development features', 'Design systems', 'Collaboration features', 'Design process'].map((item, i) => (
                <li key={i} className="text-gray-300 hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="group">
            <h3 className="font-bold mb-6 text-lg text-orange-400 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              {['Blog', 'Best practices', 'Colors', 'Color wheel'].map((item, i) => (
                <li key={i} className="text-gray-300 hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="group">
            <h3 className="font-bold mb-6 text-lg text-orange-400 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              {['Developers', 'Resource library', 'Contact us'].map((item, i) => (
                <li key={i} className="text-gray-300 hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Food Delivery. All rights reserved.
            </p>
            
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Made with <span className="text-red-500 animate-pulse text-lg">❤️</span> by our team
            </p>

            {/* SOCIAL LINKS */}
          {/* SOCIAL LINKS */}
            <div className="flex gap-4">
             {[
               { icon: <SiFacebook />, label: 'Facebook' },
               { icon: <SiX />, label: 'Twitter' },
               { icon: <SiInstagram />, label: 'Instagram' }
               ].map((social, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110 text-white text-lg"
                aria-label={social.label}
              >
               {social.icon}
               </button>
             ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;