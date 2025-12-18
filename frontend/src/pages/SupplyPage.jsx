// SupplyPage.jsx - Poultry Business Supplies Page
import React, { useState } from "react";
import {
  FaTruck,
  FaPhone,
  FaEnvelope,
  FaCalendarCheck,
  FaStar,
  FaShieldAlt,
  FaWhatsapp,
  FaShoppingCart,
  FaBalanceScale,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Utensils,
  Church,
  Building,
  ChefHat,
  GraduationCap,
  Heart,
  Home,
  ShoppingCart,
  Briefcase,
  ChevronRight,
  Coffee,
  Users,
  Calendar,
  Package,
  Truck,
  Clock,
  MapPin,
  DollarSign,
  BoxIcon,
} from "lucide-react";

const eventTypes = [
  {
    name: "Restaurants",
    count: 45,
    color: "bg-red-100 text-red-800",
    description: "Regular supply for daily menu preparation",
    delivery: "Daily morning deliveries before opening hours",
    Icon: Utensils,
    avgOrder: "₵500-₵2,000 daily",
    contact: "Restaurant Manager",
  },
  {
    name: "Funerals",
    count: 45,
    color: "bg-gray-100 text-gray-800",
    description: "Bulk orders for funeral ceremonies",
    delivery: "Scheduled 24-48 hours before event",
    Icon: Church,
    avgOrder: "₵1,000-₵5,000 per event",
    contact: "Family Representative",
  },
  {
    name: "Hotels",
    count: 32,
    color: "bg-blue-100 text-blue-800",
    description: "Supply for breakfast buffets and room service",
    delivery: "Early morning deliveries (5-7 AM)",
    Icon: Building,
    avgOrder: "₵800-₵3,000 weekly",
    contact: "Executive Chef",
  },
  {
    name: "Schools",
    count: 19,
    color: "bg-green-100 text-green-800",
    description: "Student meal programs and cafeteria supply",
    delivery: "Weekday mornings before classes start",
    Icon: GraduationCap,
    avgOrder: "₵300-₵1,500 weekly",
    contact: "School Administrator",
  },
  {
    name: "Hospitals",
    count: 12,
    color: "bg-purple-100 text-purple-800",
    description: "Patient meals and staff cafeteria",
    delivery: "Early morning and afternoon deliveries",
    Icon: Heart,
    avgOrder: "₵1,000-₵4,000 weekly",
    contact: "Dietary Manager",
  },
  {
    name: "Individuals",
    count: 120,
    color: "bg-lime-100 text-lime-800",
    description: "Home cooking and family consumption",
    delivery: "Flexible timing, same-day or scheduled",
    Icon: Home,
    avgOrder: "₵100-₵500 per order",
    contact: "Direct Customer",
  },
  {
    name: "Supermarkets",
    count: 8,
    color: "bg-orange-100 text-orange-800",
    description: "Retail packaging for consumer sales",
    delivery: "Daily restocking, early morning",
    Icon: ShoppingCart,
    avgOrder: "₵2,000-₵10,000 weekly",
    contact: "Procurement Manager",
  },
  {
    name: "Weddings",
    count: 22,
    color: "bg-pink-100 text-pink-800",
    description: "Large quantity orders for wedding receptions",
    delivery: "Day before or morning of the event",
    Icon: Heart,
    avgOrder: "₵3,000-₵15,000 per event",
    contact: "Wedding Planner",
  },
  {
    name: "Parties",
    count: 18,
    color: "bg-teal-100 text-teal-800",
    description: "Birthday parties and social gatherings",
    delivery: "Scheduled based on party timing",
    Icon: BoxIcon,
    avgOrder: "₵500-₵3,000 per event",
    contact: "Event Host",
  },
  {
    name: "Festivals",
    count: 9,
    color: "bg-violet-100 text-violet-800",
    description: "Seasonal cultural and food festivals",
    delivery: "Pre-event bulk delivery",
    Icon: Calendar,
    avgOrder: "₵2,000-₵10,000 per festival",
    contact: "Festival Organizer",
  },
  {
    name: "Bulk Wholesale",
    count: 11,
    color: "bg-emerald-100 text-emerald-800",
    description: "Large volume distribution to resellers",
    delivery: "Scheduled pickups or deliveries",
    Icon: Package,
    avgOrder: "₵5,000-₵20,000 monthly",
    contact: "Wholesale Manager",
  },
];

const SupplyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-lime-500 to-green-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Our Poultry Supplies
                </h1>
                <p className="text-lime-100 mt-1">
                  Quality Chicken Products Since 2017
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="font-semibold">Order Now!</p>
              <div className="flex flex-col md:flex-row gap-1 text-sm">
                <p>024 438 4928 / </p>
                <p>059 711 3385 / </p>
                <p>024 497 2219</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            We supply fresh chicken parts, live layers and eggs to restaurants,
            hotels, and individuals across Ghana. Quality guaranteed!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center transition transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              <FaShoppingCart className="mr-2" />
              Order Products
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-lime-600 font-semibold py-3 px-8 flex items-center rounded-lg border-2 border-lime-500 transition transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              <FaCalendarCheck className="mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-lime-50 to-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-lime-600 mb-2">500+</div>
              <div className="text-gray-700">Chickens Weekly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">9+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                50+
              </div>
              <div className="text-gray-700">Regular Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                24/7
              </div>
              <div className="text-gray-700">Order Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="bg-lime-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Who We Supply
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {eventTypes.map((client, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              >
                {/* Icon with count badge */}
                <div className="relative mb-4">
                  <div
                    className={`inline-flex items-center justify-left ${
                      client.color.split(" ")[0]
                    } p-3 rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className={client.color.split(" ")[1]}>
                      <client.Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
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
                  <div className="flex items-center justify-left gap-2 text-sm text-gray-500 mb-2">
                    <span className="font-medium">Delivery: Contact for delivery info</span>
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="flex items-center justify-left gap-2 mt-3 text-sm text-gray-500">
                  <span>{client.avgOrder}</span>
                </div>

                {/* Contact Info */}
                <div className="flex items-center justify-left gap-2 mt-2 text-sm text-gray-500">
                  <Users className="h-3 w-3" />
                  <span>Contact: {client.contact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Our Poultry Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 text-lime-600 rounded-full mb-4">
              <FaShieldAlt className="text-2xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              Quality Guaranteed
            </h4>
            <p className="text-gray-600">
              All products are fresh, healthy, and inspected to the highest
              standards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <FaTruck className="text-2xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              Fast Delivery
            </h4>
            <p className="text-gray-600">
              Same-day delivery available for orders placed before 12pm.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
              <FaBalanceScale className="text-2xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              Fair Pricing
            </h4>
            <p className="text-gray-600">
              Competitive prices with discounts for bulk orders and regular
              clients.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4">
              <FaStar className="text-2xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              5-Star Rated
            </h4>
            <p className="text-gray-600">
              Rated 4.8/5 by our clients for quality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-6">Ready to Order?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-lime-100">
              Contact us today for fresh poultry products delivered to your
              doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <FaPhone className="text-3xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-4">Call Us</h4>
              <div className="space-y-2">
                <p className="text-lg">024 438 4928</p>
                <p className="text-lg">059 711 3385</p>
                <p className="text-lg">+233 24 497 2219</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <FaWhatsapp className="text-3xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-4">WhatsApp</h4>
              <p className="text-lg mb-4">Click to chat on WhatsApp</p>
              <a
                href="https://wa.me/233244384928"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-lime-600 font-bold py-2 px-6 rounded-lg inline-block hover:bg-gray-100 transition"
              >
                Message Now
              </a>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <FaEnvelope className="text-3xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-4">Email Us</h4>
              <p className="text-lg mb-4">Send us your order details</p>
              <a
                href="/contact"
                className="bg-white text-lime-600 font-bold py-2 px-6 rounded-lg inline-block hover:bg-gray-100 transition"
              >
                Contact Form
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                to="/products"
                className="bg-white text-lime-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
              >
                <FaShoppingCart className="mr-3" />
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplyPage;
