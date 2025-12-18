import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";

/* =========================
   OPERATION DATA
========================= */
const operationData = {
  hero: {
    title: "From Our Farms to Your Table",
    description:
      "Discover our transparent process from farm preparation to doorstep delivery. We ensure every product meets our high standards of quality and freshness.",
  },

  // Preparation Process
  preparation: [
    {
      id: 1,
      step: "Farm Selection",
      title: "Sourcing & Quality Check",
      description:
        "We source poultry from our own certified farms in Adenta and Aburi. Each bird undergoes health checks before processing.",
      details: [
        "Daily farm inspections",
        "Health certification verification",
        "Weight and quality grading",
        "Antibiotic-free certification",
      ],
      time: "Day 1: Morning",
    },
    {
      id: 2,
      step: "Processing",
      title: "Hygienic Processing",
      description:
        "Processing in our HACCP-certified facility with strict hygiene protocols. Cold chain maintained throughout.",
      details: [
        "Humane handling standards",
        "Hygienic processing equipment",
        "Temperature-controlled environment",
        "Government inspection passed",
      ],
      time: "Day 1: Processing Day",
    },
    {
      id: 3,
      step: "Packaging",
      title: "Safe Packaging",
      description:
        "Vacuum-sealed packaging with production date and batch numbers. Products labeled for traceability.",
      details: [
        "Food-grade packaging materials",
        "Vacuum sealing for freshness",
        "Clear expiration dating",
        "Batch tracking numbers",
      ],
      time: "Day 1: After Processing",
    },
    {
      id: 4,
      step: "Storage",
      title: "Cold Storage",
      description:
        "Immediate refrigeration at 0-4°C. Products stored in temperature-monitored cold rooms.",
      details: [
        "24/7 temperature monitoring",
        "Regular quality checks",
        "First-in-first-out system",
        "Separate storage for different products",
      ],
      time: "Until Delivery",
    },
  ],

  // Ordering Process
  ordering: {
    title: "How to Order",
    channels: [
      {
        id: 1,
        name: "Website Orders",
        process: [
          "Browse products on our website",
          "Add items to cart",
          "Fill in checkout form",
          "Only Cash on delivery for now",
          "View order in my orders page",
          "Receive order confirmation",
        ],
        deliveryTime: "Within 24 hours",
        minOrder: "No minimum",
      },
      {
        id: 2,
        name: "WhatsApp Orders",
        process: [
          "Message us on WhatsApp (+233 24 438 4928)",
          "Send product list",
          "Share delivery address",
          "Receive price quotation",
          "Confirm order via message",
          "Cash on delivery available",
        ],
        deliveryTime: "Within 24 hours",
        minOrder: "₵100 minimum",
      },
      {
        id: 3,
        name: "Phone Orders",
        process: [
          "Call our hotline (024 438 4928 / 059 711 3385)",
          "Speak with our sales team",
          "Place your order",
          "Confirm delivery details",
          "Receive confirmation",
          "Cash on delivery available",
        ],
        deliveryTime: "Same day (order before 12 PM)",
        minOrder: "₵150 minimum",
      },
      {
        id: 4,
        name: "Walk-in Purchase",
        process: [
          "Visit our retail shops",
          "Select fresh products",
          "Professional assistance",
          "Immediate pickup",
          "Bulk purchase discounts",
          "Product recommendations",
        ],
        deliveryTime: "Immediate",
        minOrder: "No minimum",
      },
    ],
  },

  // Delivery Channels
  delivery: {
    title: "Delivery Network",
    channels: [
      {
        id: 1,
        name: "Direct Farm Delivery",
        coverage: ["Accra Metro", "Adenta", "Madina", "Tema"],
        vehicles: "Refrigerated vans",
        time: "6 AM - 8 PM daily",
        fee: "Free for orders above ₵300",
      },
      {
        id: 2,
        name: "Partner Logistics",
        coverage: ["Greater Accra", "Eastern Region"],
        vehicles: "Cold chain partners",
        time: "Next day delivery",
        fee: "₵20-₵50 depending on location",
      },
      {
        id: 3,
        name: "Pickup Points",
        coverage: ["Adenta Branch", "Aburi Branch", "Madina Market"],
        vehicles: "Self pickup",
        time: "8 AM - 6 PM daily",
        fee: "Free",
      },
    ],
  },

  // Locations
  locations: [
    {
      id: 1,
      name: "Adenta Main Branch",
      address: "Adenta Housing Down, Near Adenta Barrier, Accra",
      hours: "Mon-Sat: 7:00 AM - 8:00 PM | Sun: 8:00 AM - 6:00 PM",
      contact: "0302 XXX XXX | 0555 XXX XXX",
      services: ["Fresh Sales", "Bulk Orders", "Delivery Hub", "Customer Service"],
      coordinates: "5.7227° N, 0.1726° W",
    },
    {
      id: 2,
      name: "Aburi Farm & Retail",
      address: "Aburi-Mariakrom, Eastern Region",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM | Sat: 8:00 AM - 4:00 PM",
      contact: "0332 XXX XXX",
      services: ["Farm Fresh", "Processing", "Wholesale", "Farm Tours"],
      coordinates: "5.8480° N, 0.1755° W",
    },
    {
      id: 3,
      name: "Madina Market Stall",
      address: "Madina Market, Section 3, Accra",
      hours: "Daily: 6:00 AM - 8:00 PM",
      contact: "0244 XXX XXX",
      services: ["Retail Sales", "Eggs", "Processed Chicken", "Same Day Orders"],
      coordinates: "5.6860° N, 0.1700° W",
    },
  ],

  // Products Available
  products: {
    fresh: [
      "Whole Chicken (2kg)",
      "Chicken Parts (Wings, Breast, Thighs)",
      "Fresh Eggs (Crates)",
      "Live Layers",
      "Smoked Chicken",
      "Chicken Breast",
    ],
    packaged: [
      "Vacuum-packed Chicken",
      "Frozen Chicken (for export)",
      "Marinated Chicken",
      "Ready-to-Cook Packs",
      "Family Value Packs",
      "Bulk Wholesale (50kg+)",
    ],
  },

  // FAQ
  faq: [
    {
      question: "How fresh are your products?",
      answer:
        "We process daily and deliver within 24 hours. Products are dated so you know exactly when they were processed.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Mobile Money (MTN, Vodafone), Bank Transfer, Cash on Delivery (for certain areas), and Credit/Debit cards online.",
    },
    {
      question: "Can I order for a specific delivery time?",
      answer:
        "Yes! You can choose 2-hour delivery windows when ordering through our website or WhatsApp.",
    },
    {
      question: "Do you supply to restaurants and hotels?",
      answer:
        "Absolutely. We have special wholesale packages and regular supply contracts for businesses. Contact our business sales team.",
    },
  ],
};

// Import Lucide React icons directly
import { 
  ShoppingCart, 
  ArrowDown, 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown,
  Sparkles,
  Package,
  Home,
  Scissors,
  Package2,
  Snowflake,
  ShoppingBag,
  Store
} from "lucide-react";

/* =========================
   COMPONENT
========================= */
const HowWeOperate = () => {
  const { hero, preparation, ordering, products, faq } = operationData;
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Function to get icon for preparation step
  const getPreparationIcon = (stepId) => {
    switch(stepId) {
      case 1: return <Home className="h-6 w-6" />;
      case 2: return <Scissors className="h-6 w-6" />;
      case 3: return <Package2 className="h-6 w-6" />;
      case 4: return <Snowflake className="h-6 w-6" />;
      default: return <Home className="h-6 w-6" />;
    }
  };

  // Function to get icon for ordering channel
  const getOrderingIcon = (channelId) => {
    switch(channelId) {
      case 1: return <MessageCircle className="h-6 w-6" />;
      case 2: return <Phone className="h-6 w-6" />;
      case 3: return <ShoppingBag className="h-6 w-6" />;
      case 4: return <Store className="h-6 w-6" />;
      default: return <ShoppingCart className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-green-100 mb-8">{hero.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-lime-400 text-gray-900 hover:bg-lime-500 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
              >
                Order Now <ShoppingCart className="h-5 w-5" />
              </Link>
              <button
                onClick={() => {
                  document.getElementById("ordering")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all border border-white/30"
              >
                How to Order <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Process */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold uppercase mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Preparation Journey
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every product goes through our rigorous 4-step quality process
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

            {/* Process Steps */}
            <div className="space-y-12 md:space-y-2">
              {preparation.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <div className="bg-green-500 rounded-xl shadow-lg p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white text-gray-700 rounded-lg">
                          {getPreparationIcon(step.id)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700 uppercase">
                            Step {step.id}
                          </span>
                          <h3 className="text-xl font-bold text-gray-700">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-gray-50">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-sm text-gray-50">
                          <Clock className="h-4 w-4" />
                          <span>{step.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {step.id}
                      </span>
                    </div>
                  </div>

                  {/* Step label for mobile */}
                  <div className="lg:hidden mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {step.id}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Channels */}
      <section id="ordering" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Order
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the most convenient method for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ordering.channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                    {getOrderingIcon(channel.id)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {channel.name}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  {channel.process.map((processStep, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-gray-600">{processStep}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{channel.deliveryTime}</span>
                    </div>
                    <div className="text-green-700 font-semibold">
                      {channel.minOrder}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Order?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/233244384928"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Order
              </a>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                Online Store
              </Link>
              <a
                href="tel:+233244384928"
                target="_blank" 
                  rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products & FAQ */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Products Available */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Products Available
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    Fresh Products
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.fresh.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{product}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-600" />
                    Packaged Products
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.packaged.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{product}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faq.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    <button
                      onClick={() =>
                        setActiveFAQ(activeFAQ === index ? null : index)
                      }
                      className="w-full p-6 text-left flex justify-between items-center"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          activeFAQ === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeFAQ === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Card */}
              <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Still Have Questions?
                </h3>
                <p className="mb-6 text-green-100">
                  Our customer service team is here to help
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+233597113385"
                    target="_blank" 
                  rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    <Phone className="h-5 w-5" />
                    Call Support
                  </a>
                  <a
                     href="nayasuccessaxis@gmail.com"
                    target="_blank" 
                  rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    <Mail className="h-5 w-5" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeOperate;