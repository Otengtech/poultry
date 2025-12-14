import React from "react";
import { 
  Mail, 
  ArrowRight, 
  Facebook, 
  Youtube, 
  Instagram,
  Shield,
  Truck,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                Naya Axis <span className="text-lime-500"> Foods</span>
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Providing poultry products with unmatched quality and service since 2018.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-lime-400 mr-2" />
                  Certified Quality
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Truck className="w-4 h-4 text-lime-400 mr-2" />
                  Fast Delivery
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-lime-400 mr-2" />
                  98% Satisfaction
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: "Company",
                links: ['About', 'Team', 'Contact', 'Review', 'Blog']
              },
              {
                title: "Products",
                links: ['Fresh Eggs', 'Live Poultry', 'Chicken Feet']
              },
              {
                title: "Support",
                links: ['FAQ', 'Privacy', 'Products', 'Orders']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        to={`/${link.toLowerCase()}`} 
                        className="text-gray-400 hover:text-green-400 transition-colors"
                      >
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
                <a href="https://www.facebook.com/NayaSuccessAxis/" className="text-gray-400 hover:text-[#f4b63c] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://youtu.be/huUjY541_jo?si=4b3kuwjj77b7Ttl6" className="text-gray-400 hover:text-[#f4b63c] transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/nayasuccessaxisfarms/" className="text-gray-400 hover:text-[#f4b63c] transition-colors">
                  <Instagram className="w-5 h-5" />
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