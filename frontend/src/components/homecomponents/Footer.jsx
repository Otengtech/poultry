import React from "react";
import {
  Mail,
  ArrowRight,
  Facebook,
  Youtube,
  Instagram,
  Shield,
  Truck,
  CheckCircle,
  Phone,
  MapPin,
  Package,
  MessageCircle // New icon for WhatsApp
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* New Contact & Location Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 mb-12 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-gray-800">
            
            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-lime-900/30 rounded-xl">
                <MapPin className="w-6 h-6 text-lime-400" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Our Location</h3>
                <p className="text-gray-300 mb-1">Adenta, Accra - Ghana</p>
                <p className="text-gray-400 text-sm mb-1">Postal Code: GD-0280-880</p>
                <p className="text-gray-400 text-sm">Pick-up Location: Adenta</p>
                <div className="mt-2 inline-flex items-center text-lime-400 text-sm">
                  <Package className="w-4 h-4 mr-1" />
                  <span>Delivery options available</span>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-lime-900/30 rounded-xl">
                <Phone className="w-6 h-6 text-lime-400" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <a 
                  href="tel:+233244384928" 
                  className="block text-gray-300 hover:text-lime-400 transition-colors mb-1"
                >
                  024 438 4928
                </a>
                <a 
                  href="tel:+2330597113385" 
                  className="block text-gray-300 hover:text-lime-400 transition-colors mb-1"
                >
                  059 711 3385
                </a>
                <a 
                  href="https://wa.me/233244384928" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-300 hover:text-lime-400 transition-colors text-sm mt-3"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp: 024 438 4928
                </a>
              </div>
            </div>

            {/* Email & Business */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-lime-900/30 rounded-xl">
                <Mail className="w-6 h-6 text-lime-400" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email & Business</h3>
                <a 
                  href="mailto:nayasuccessaxis@gmail.com" 
                  className="block text-gray-300 hover:text-lime-400 transition-colors mb-1"
                >
                  nayasuccessaxis@gmail.com
                </a>
                <p className="text-gray-300 mb-1">Naya Success Axis Farms</p>
                <p className="text-gray-400 text-sm">
                  An Agribusiness that started as a backyard poultry farm in 2018.
                </p>
              </div>
            </div>
          </div>

          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand */}
            <div className="lg:col-span-2">
  {/* Enhanced Brand Section */}
  <div className="relative mb-6">
    <h2 className="text-4xl font-bold mb-3">
      Naya Axis <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">Foods</span>
    </h2>
    
    {/* Tagline */}
    <p className="text-gray-300 text-lg mb-4 max-w-md">
      Poultry Products Since 2018
    </p>
    
    {/* Description with subtle animation */}
    <div className="relative group">
      <p className="text-gray-400 mb-6 max-w-md transition-all duration-300 group-hover:text-gray-300">
        Providing farm-fresh poultry products with unmatched quality, hygiene, and customer service.
        From our farms to your table with care and excellence.
      </p>
      <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-green-600 group-hover:w-24 transition-all duration-500"></div>
    </div>
  </div>
  
  {/* Additional Trust Indicator */}
  <div className="flex items-center mt-4 p-3 bg-gradient-to-r from-gray-900/50 to-black/30 rounded-lg border border-gray-800">
    <div className="flex items-center mr-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
    <div>
      <p className="text-sm text-gray-300">Rated 4.8/5 by 500+ Customers</p>
    </div>
  </div>
</div>

            {/* Links Columns */}
            {[
              {
                title: "Company",
                links: ['About', 'Team', 'Contact', 'Review', 'Blog', 'Order']
              },
              {
                title: "Social Media",
                links: [
                  { name: 'Facebook', url: 'https://www.facebook.com/NayaSuccessAxis/', icon: Facebook },
                  { name: 'Instagram', url: 'https://www.instagram.com/nayasuccessaxisfarms/', icon: Instagram },
                  { name: 'YouTube', url: 'https://youtu.be/huUjY541_jo?si=4b3kuwjj77b7Ttl6', icon: Youtube },
                  { name: 'WhatsApp', url: 'https://wa.me/233244384928', icon: MessageCircle }
                ]
              },
              {
                title: "Support",
                links: ['FAQ', 'Privacy', 'Products', 'Review', 'Quality']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.title === "Social Media" ? (
                    // Social Media Links
                    column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-lime-400 transition-colors flex items-center group"
                        >
                          <link.icon className="w-4 h-4 mr-2" />
                          {link.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    // Regular Links
                    column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          to={`/${link.toLowerCase()}`} 
                          className="text-gray-400 hover:text-lime-400 transition-colors flex items-center group"
                        >
                          <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Naya Axis Foods. All rights reserved.
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a 
                  href="https://www.facebook.com/NayaSuccessAxis/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1877F2] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" strokeWidth={2} />
                </a>
                <a 
                  href="https://www.instagram.com/nayasuccessaxisfarms/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E4405F] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" strokeWidth={2} />
                </a>
                <a 
                  href="https://youtu.be/huUjY541_jo?si=4b3kuwjj77b7Ttl6" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF0000] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" strokeWidth={2} />
                </a>
                <a 
                  href="https://wa.me/233244384928" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#25D366] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;