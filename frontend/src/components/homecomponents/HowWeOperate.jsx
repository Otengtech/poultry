import { useState } from "react";
import { Link } from "react-router-dom";


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
      image: "https://res.cloudinary.com/dgk47100y/image/upload/v1767574028/xxvzttxwd9ndqdcohy9r.jpg", // add image URL later
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
      image: "https://res.cloudinary.com/dgk47100y/image/upload/v1767569205/p4smwqnorfn7lbdrq7be.jpg",
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
      image: "https://res.cloudinary.com/dgk47100y/image/upload/v1767569328/le41gm6yynyhluxlivu1.jpg",
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
      image: "https://res.cloudinary.com/dgk47100y/image/upload/v1767574027/ksnon4dv49wftyvkmvzw.jpg",
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

  // Products Available
  products: {
    fresh: [
      "Whole Chicken (2kg)",
      "Fresh Eggs (Crates)",
      "Live Layers",
      "Smoked Chicken",
      "Chicken Breast",
      "Chicken Wings",
      "Chicken Thighs",
      "Chicken Drumsticks",
      "Chicken Back",
    ]
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
  ShoppingBag,
  Store
} from "lucide-react";


const HowWeOperate = () => {
  const { hero, ordering, products, faq } = operationData;
  const [activeFAQ, setActiveFAQ] = useState(null);

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
    <div className="text-center mb-14">
      <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold uppercase mb-4">
        Ordering
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {ordering.title}
      </h2>
      <p className="text-gray-600">
        Choose the ordering method that works best for you
      </p>
    </div>

    <div className="space-y-16">
      {ordering.channels.map((channel, index) => (
        <div
          key={channel.id}
          className={`flex flex-col lg:flex-row items-center gap-10 ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {channel.image ? (
                <img
                  src={channel.image}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  Image goes here
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-green-500 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">
                {channel.name}
              </h3>

              <div className="space-y-3 mb-6">
                {channel.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5" />
                    <span className="text-gray-50">{step}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-50 border-t border-green-400 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{channel.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Min Order:</span>
                  <span>{channel.minOrder}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
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