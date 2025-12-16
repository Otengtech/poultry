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
  Package // New icon for Pick-up/Delivery
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
                <a href="tel:+233244384928" className="block text-gray-300 hover:text-lime-400 transition-colors mb-1">
                  024 438 4928
                </a>
                <a href="tel:+2330597113385" className="block text-gray-300 hover:text-lime-400 transition-colors mb-1">
                  059 711 3385
                </a>
                <p className="text-gray-400 text-sm mt-3">Always here to take your order</p>
              </div>
            </div>

            {/* Email & Business */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-lime-900/30 rounded-xl">
                <Mail className="w-6 h-6 text-lime-400" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email & Business</h3>
                <a href="mailto:nayasuccessaxis@gmail.com" className="block text-gray-300 hover:text-lime-400 transition-colors mb-1">
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
              <h2 className="text-3xl font-bold mb-4">
                Naya Axis <span className="text-lime-500">Foods</span>
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Providing poultry products with unmatched quality and service since 2018.
              </p>
              
              {/* Trust Badges - Updated with consistent icon styling */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-5 h-5 text-lime-400 mr-2" strokeWidth={2} />
                  Certified Quality
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Truck className="w-5 h-5 text-lime-400 mr-2" strokeWidth={2} />
                  Fast Delivery
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" strokeWidth={2} />
                  98% Satisfaction
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
                links: ['Facebook', 'Instagram', 'Youtube', 'WhatsApp', 'Twitter']
              },
              {
                title: "Support",
                links: ['FAQ', 'Privacy', 'Products', 'Review', 'Quality']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        to={`/${link.toLowerCase()}`} 
                        className="text-gray-400 hover:text-lime-400 transition-colors flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link}
                      </Link>
                    </li>
                  ))}
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
              
              {/* Social Media */}
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a 
                  href="https://www.facebook.com/NayaSuccessAxis/" 
                  className="text-gray-400 hover:text-[#f4b63c] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" strokeWidth={2} />
                </a>
                <a 
                  href="https://youtu.be/huUjY541_jo?si=4b3kuwjj77b7Ttl6" 
                  className="text-gray-400 hover:text-[#f4b63c] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" strokeWidth={2} />
                </a>
                <a 
                  href="https://www.instagram.com/nayasuccessaxisfarms/" 
                  className="text-gray-400 hover:text-[#f4b63c] transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" strokeWidth={2} />
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