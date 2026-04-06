// SupplyPage.jsx - Poultry Business Supplies Page
import React from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Utensils,
  Building,
  Home,
  Users,
  Calendar,
  Package,
} from "lucide-react";

const eventTypes = [
  {
    name: "Restaurants",
    count: 45,
    color: "bg-red-100 text-red-800",
    description: "Regular supply for daily menu preparation",
    delivery: "Daily morning deliveries before opening hours",
    Icon: Utensils,
    contact: "Team",
  },
  {
    name: "Hotels",
    count: 32,
    color: "bg-blue-100 text-blue-800",
    description: "Supply for breakfast buffets and room service",
    delivery: "Early morning deliveries (5-7 AM)",
    Icon: Building,
    contact: "Team",
  },
  {
    name: "Individuals",
    count: 120,
    color: "bg-lime-100 text-lime-800",
    description: "Home cooking and family consumption",
    delivery: "Flexible timing, same-day or scheduled",
    Icon: Home,
    contact: "Team",
  },
  {
    name: "Bulk Wholesale",
    count: 11,
    color: "bg-emerald-100 text-emerald-800",
    description: "Large volume distribution to resellers",
    delivery: "Scheduled pickups or deliveries",
    Icon: Package,
    contact: "Team",
  },
];

const SupplyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Client Types */}
      <section className="bg-lime-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-10">
            Who We Supply
          </h3>
          
          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventTypes.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))}
          </div>
          
          {/* Mobile Horizontal Scroll (shown on mobile) */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
              {eventTypes.map((client, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[280px] snap-start"
                >
                  <ClientCard client={client} />
                </div>
              ))}
            </div>
            {/* Scroll hint for mobile users */}
            <div className="text-center mt-4 text-gray-500 text-sm">
              <p>← Slide to see more →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white text-gray-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-6">Ready to Order?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-500">
              Contact us today for fresh poultry products delivered to your
              doorstep. Check out main Event Page for more info.
            </p>
          </div>

          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                to="/event"
                className="bg-lime-500 text-gray-700 font-bold py-4 px-8 rounded-lg text-lg transition transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
              >
                <Calendar className="mr-3" />
                Events we supply
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Separate ClientCard component for reusability
const ClientCard = ({ client }) => {
  return (
    <div className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group h-full">
      {/* Icon with count badge */}
      <div className="relative mb-4">
        <div
          className={`inline-flex items-center justify-center ${
            client.color.split(" ")[0]
          } p-3 rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300`}
        >
          <div className={client.color.split(" ")[1]}>
            <client.Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute -top-2 -right-2 bg-green-100 border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
          <span
            className={`text-xs font-bold ${
              client.color.split(" ")[1]
            }`}
          >
            {client.count}
          </span>
        </div>
      </div>

      {/* Client Name */}
      <h4 className="font-bold text-gray-800 text-lg mb-2">
        {client.name}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 min-h-[40px]">
        {client.description}
      </p>

      {/* Delivery Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
          <span className="font-medium">Delivery: Contact for delivery info</span>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
        <span>{client.avgOrder}</span>
      </div>

      {/* Contact Info */}
      <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
        <FaUsers className="h-3 w-3" />
        <span>Contact: {client.contact}</span>
      </div>
    </div>
  );
};

export default SupplyPage;