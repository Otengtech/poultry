import React from "react";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaBuilding, 
  FaTree, 
  FaTruck,
  FaGlobeAfrica,
  FaMap,
  FaHeadset,
  FaCertificate
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Location = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 md:py-10 py-6 bg-gray-900 text-white">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Column - Company Overview */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Naya Success Axis
            </h1>
            
            <p className="text-lime-400 text-lg mb-3 font-semibold flex items-center gap-2">
              <FaCertificate className="text-lime-400" />
              GHANA'S PREMIUM POULTRY FARM
            </p>

            <div className="w-16 h-1 bg-lime-500 mb-6"></div>

            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              Operating from strategic locations across Ghana, we're committed to 
              revolutionizing poultry farming with sustainable practices and 
              superior quality standards. Our dual-location approach ensures 
              optimal production and efficient distribution nationwide.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gray-800 p-3 rounded-lg">
                <FaGlobeAfrica className="text-lime-400 text-2xl" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">
                  Serving Ghana with quality poultry since 2017
                </p>
                <p className="text-gray-400 text-xs">
                  Certified • Sustainable • Trusted
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/contact">
              <button className="px-6 py-3 bg-lime-500 text-gray-800 rounded-lg font-semibold hover:bg-lime-400 transition flex items-center gap-2">
                <FaMap />
                Get Directions
              </button></Link>
              <Link to="/about">
              <button className="px-6 py-3 bg-transparent border border-lime-400 text-lime-500 rounded-lg font-semibold transition flex items-center gap-2">
                <FaHeadset />
                About Us
              </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Locations */}
          <div className="space-y-6">
            {/* Adenta Card */}
            <div className="p-5 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <FaBuilding className="text-lime-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Adenta Headquarters
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Administrative & Commercial Hub
                  </p>
                </div>
              </div>
              
              <p className="text-gray-200 mb-4 text-sm">
                Our main office in Greater Accra, managing operations, sales, 
                and customer relations. Strategically positioned for market 
                access and efficient logistics.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-lime-400" />
                  <span>Adenta Municipal District, Accra</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaPhone className="text-lime-400" />
                  <span>024 438 4928 / 059 711 3385 / 024 497 2219</span>
                </div>
              </div>
            </div>

            {/* Aburi Card */}
            <div className=" p-5 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-lime-500/20 p-3 rounded-lg">
                  <FaTree className="text-lime-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Aburi Production Farm
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Primary Breeding & Production Facility
                  </p>
                </div>
              </div>
              
              <p className="text-gray-200 mb-4 text-sm">
                Nestled in the Eastern Region's poultry belt, leveraging 
                Aburi's ideal climate for optimal poultry health, growth, 
                and sustainable farming practices.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-lime-400" />
                  <span>Aburi, Eastern Region</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;