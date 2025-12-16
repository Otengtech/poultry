import React from "react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

// Import all images if they're in src/assets folder
// IMPORTANT: Make sure these file names match exactly
import blog3 from "../../assets/blog3.jpg";
import eggs from "../../assets/eggs.jpg";
import p2 from "../../assets/p2.webp";
import p1 from "../../assets/p1.avif";
import qualityPoultry from "../../assets/quality.jpg";
import sustainableFarm from "../../assets/sustainable.jpg";
import safetyProcess from "../../assets/safety.jpg";
import freshDelivery from "../../assets/fresh.jpg";
import modernFarm from "../../assets/innovation.jpg";
import happyCustomers from "../../assets/customer.jpg";

/* =========================
   JSON CONTENT (DIRECT USE)
========================= */
const whyChooseUs = {
  title: "Quality, innovation and food safety.",
  text1:
    "NAYA Success Axis is an Agribusiness that started as a backyard poultry farm in 2018. It was registered as a fulltime business in April 2019 at the Registrar General Department. It currently has 2 branches in Accra – Adenta and Aburi - Mariakrom in the Eastern Region.",
  products: [
    {
      id: "1",
      category: "Layer",
      link: "/products",
      image: blog3,
      text: "Healthy, well-raised live poultry layers sourced from trusted farms.",
    },
    {
      id: "2",
      category: "Fresh Eggs",
      link: "/products",
      image: eggs,
      text: "Farm-fresh eggs collected daily, ensuring natural taste and quality.",
    },
    {
      id: "3",
      category: "Broiler Meat",
      link: "/products",
      image: p2,
      text: "Clean, high-quality broiler wings, breast, thighs, neck, full broiler etc.",
    },
    {
      id: "4",
      category: "Smoked Chicken",
      link: "/products",
      image: p1,
      text: "Healthy smoked chicken in various prices and sizes, very clean and hygienic.",
    },
  ],
  
  // Enhanced qualities data
  qualities: [
    {
      id: 1,
      title: "Premium Quality Products",
      description: "We deliver only the highest grade poultry products, ensuring exceptional taste and nutritional value.",
      icon: "Star",
      image: qualityPoultry,
      stats: "100% Quality Check"
    },
    {
      id: 2,
      title: "Sustainable Farming",
      description: "Ethical and sustainable farming practices that respect animal welfare and the environment.",
      icon: "Leaf",
      image: sustainableFarm,
      stats: "Eco-Friendly"
    },
    {
      id: 3,
      title: "Food Safety First",
      description: "Rigorous safety protocols and hygiene standards from farm to table.",
      icon: "ShieldCheck",
      image: safetyProcess,
      stats: "HACCP Certified"
    },
    {
      id: 4,
      title: "Farm Fresh Delivery",
      description: "Direct from our farms to your table within 24 hours of processing.",
      icon: "Truck",
      image: freshDelivery,
      stats: "24-Hour Fresh"
    },
    {
      id: 5,
      title: "Innovation in Agriculture",
      description: "Implementing modern farming technologies for better yields and quality.",
      icon: "Lightbulb",
      image: modernFarm,
      stats: "Tech-Driven"
    },
    {
      id: 6,
      title: "Customer Satisfaction",
      description: "Dedicated customer support and satisfaction guarantee on all products.",
      icon: "Heart",
      image: happyCustomers,
      stats: "98% Satisfaction"
    }
  ]
};

/* =========================
   COMPONENT
========================= */
const AboutSection = () => {
  const { title, text1, products, qualities } = whyChooseUs;
  const [activeQuality, setActiveQuality] = React.useState(qualities[0]);

  // Auto-rotate qualities (optional)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuality(prev => {
        const currentIndex = qualities.findIndex(q => q.id === prev.id);
        const nextIndex = (currentIndex + 1) % qualities.length;
        return qualities[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [qualities]);

  return (
    <section className="bg-gray-50 py-8 md:py-10 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
          <div className="space-y-4 lg:space-y-6">
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {text1}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              About Us <Icons.ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* PRODUCTS */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 lg:mb-20">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              <div className="h-48 md:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">{item.category}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                <Link
                  to={item.link}
                  className="text-lime-600 hover:text-lime-700 text-sm font-medium inline-flex items-center gap-1 group/link"
                >
                  View products 
                  <Icons.ChevronRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div> */}

        {/* DYNAMIC QUALITIES SHOWCASE SECTION */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-10 lg:mb-16">
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Our Qualities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Excellence in Every Aspect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us different and why thousands trust us for their poultry needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Active Quality Showcase */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <img
                src={activeQuality.image}
                alt={activeQuality.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    {React.createElement(Icons[activeQuality.icon], {
                      className: "h-8 w-8 text-lime-300"
                    })}
                    <span className="px-3 py-1 bg-lime-500/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {activeQuality.stats}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                    {activeQuality.title}
                  </h3>
                  <p className="text-gray-200 mb-6 max-w-lg">
                    {activeQuality.description}
                  </p>
                  <Link
                    to="/quality"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 border border-white/20"
                  >
                    Discover More <Icons.ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Quality Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {qualities.map((quality) => {
                const isActive = quality.id === activeQuality.id;
                
                return (
                  <button
                    key={quality.id}
                    onClick={() => setActiveQuality(quality)}
                    className={`p-4 md:p-6 rounded-xl text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-lime-50 border-2 border-lime-200 shadow-lg transform -translate-y-1' 
                        : 'bg-white border border-gray-200 hover:border-lime-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isActive ? 'bg-lime-100 text-lime-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {React.createElement(Icons[quality.icon], { className: "h-6 w-6" })}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-2 ${
                          isActive ? 'text-gray-900' : 'text-gray-800'
                        }`}>
                          {quality.title}
                        </h4>
                        <p className={`text-sm ${
                          isActive ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {quality.description}
                        </p>
                        {isActive && (
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-lime-600">
                              Active <Icons.CheckCircle className="h-4 w-4" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Quality Indicators */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {qualities.map((quality) => (
              <button
                key={quality.id}
                onClick={() => setActiveQuality(quality)}
                className={`w-2 h-2 rounded-full transition-all ${
                  quality.id === activeQuality.id 
                    ? 'bg-lime-600 w-8' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Show ${quality.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;