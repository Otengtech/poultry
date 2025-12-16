import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Footer from "../components/homecomponents/Footer";

const QualitiesPage = () => {
  const [activeQuality, setActiveQuality] = useState(qualities[0]);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Qualities' },
    { id: 'product', label: 'Product Excellence' },
    { id: 'process', label: 'Process Standards' },
    { id: 'customer', label: 'Customer Focus' },
    { id: 'innovation', label: 'Innovation' }
  ];

  const filteredQualities = activeFilter === 'all' 
    ? qualities 
    : qualities.filter(q => q.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold tracking-wide mb-4">
            Why Choose Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-green-600">Unbeatable</span> Qualities
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            At NAYA Axis Foods, excellence isn't just a goal—it's our standard. 
            Discover the principles that guide everything we do.
          </p>
        </div>

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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {React.createElement(Icons[activeQuality.icon], {
                        className: "h-8 w-8 text-lime-300"
                      })}
                      <span className="px-3 py-1 bg-lime-500/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {activeQuality.stats}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                      {activeQuality.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                    {activeQuality.title}
                  </h3>
                  <p className="text-gray-200 mb-6 max-w-lg">
                    {activeQuality.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeQuality.features?.map((feature, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        <Icons.Check className="h-3 w-3" /> {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  Featured Quality
                </span>
              </div>
            </div>

            {/* Right Column - Quality Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-h-[600px] overflow-y-auto pr-2">
              {filteredQualities.map((quality) => {
                const isActive = quality.id === activeQuality.id;
                
                return (
                  <button
                    key={quality.id}
                    onClick={() => setActiveQuality(quality)}
                    className={`p-4 md:p-6 rounded-xl text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-green-50 border-2 border-green-200 shadow-lg transform -translate-y-1' 
                        : 'bg-white border border-gray-200 hover:border-green-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* <div className={`p-3 rounded-lg ${
                        isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {React.createElement(Icons[quality.icon], { className: "h-6 w-6" })}
                      </div> */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-bold text-lg ${
                            isActive ? 'text-gray-900' : 'text-gray-800'
                          }`}>
                            {quality.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {quality.categoryLabel}
                          </span>
                        </div>
                        <p className={`text-sm mb-3 ${
                          isActive ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                          {quality.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            isActive ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {quality.stats}
                          </span>
                          {isActive && (
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                              Viewing <Icons.Eye className="h-4 w-4" />
                            </span>
                          )}
                        </div>
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
                    ? 'bg-green-600 w-8' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Show ${quality.title}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Icons.Target className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
            <p className="text-gray-600">
              Every quality standard is backed by measurable goals and regular audits to ensure consistent delivery.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2"><Icons.Check className="h-4 w-4 text-green-500" /> Quarterly quality reviews</li>
              <li className="flex items-center gap-2"><Icons.Check className="h-4 w-4 text-green-500" /> Transparent reporting</li>
              <li className="flex items-center gap-2"><Icons.Check className="h-4 w-4 text-green-500" /> Continuous improvement</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Icons.Users className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Team Excellence</h3>
            <p className="text-gray-600">
              Our trained professionals are the backbone of our quality standards, with ongoing education and certification.
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Team Certification</span>
                <span className="text-sm font-bold text-blue-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Icons.Award className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Industry Recognition</h3>
            <p className="text-gray-600">
              Our commitment to quality has earned us recognition from industry bodies and customer appreciation awards.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-500">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-500">Satisfied Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Our Quality Firsthand
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-green-100">
            See the difference our commitment to excellence makes. Order today and taste the NAYA quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              View Our Products <Icons.Package className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300"
            >
              Contact Quality Team <Icons.MessageCircle className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Enhanced qualities array with more options
const qualities = [
  {
    id: 1,
    title: "Premium Quality Products",
    description: "We deliver only the highest grade poultry products, ensuring exceptional taste and nutritional value.",
    icon: "Star",
    category: "product",
    categoryLabel: "Product Excellence",
    image: "../assets/quality.jpg",
    stats: "100% Quality Check",
    features: ["Grade A Certified", "Nutritional Testing", "Freshness Guarantee"]
  },
  {
    id: 2,
    title: "Sustainable Farming",
    description: "Ethical and sustainable farming practices that respect animal welfare and the environment.",
    icon: "Leaf",
    category: "process",
    categoryLabel: "Process Standards",
    image: "../assets/sustainable.jpg",
    stats: "Eco-Friendly Certified",
    features: ["Organic Feed", "Renewable Energy", "Waste Management"]
  },
  {
    id: 3,
    title: "Food Safety First",
    description: "Rigorous safety protocols and hygiene standards from farm to table.",
    icon: "ShieldCheck",
    category: "process",
    categoryLabel: "Process Standards",
    image: "../assets/safety.jpg",
    stats: "HACCP Certified",
    features: ["Regular Audits", "Hygiene Standards", "Traceability"]
  },
  {
    id: 4,
    title: "Farm Fresh Delivery",
    description: "Direct from our farms to your table within 24 hours of processing.",
    icon: "Truck",
    category: "customer",
    categoryLabel: "Customer Focus",
    image: "../assets/fresh.jpg",
    stats: "24-Hour Fresh",
    features: ["Cold Chain", "Timely Delivery", "Freshness Seal"]
  },
  {
    id: 5,
    title: "Innovation in Agriculture",
    description: "Implementing modern farming technologies for better yields and quality.",
    icon: "Lightbulb",
    category: "innovation",
    categoryLabel: "Innovation",
    image: "../assets/innovation.jpg",
    stats: "Tech-Driven",
    features: ["Smart Monitoring", "Automation", "Data Analytics"]
  },
  {
    id: 6,
    title: "Customer Satisfaction",
    description: "Dedicated customer support and satisfaction guarantee on all products.",
    icon: "Heart",
    category: "customer",
    categoryLabel: "Customer Focus",
    image: "../assets/customer.jpg",
    stats: "98% Satisfaction",
    features: ["24/7 Support", "Easy Returns", "Feedback System"]
  },
  {
    id: 7,
    title: "Animal Welfare Focus",
    description: "Humane treatment and comfortable living conditions for all our poultry.",
    icon: "HeartHandshake",
    category: "process",
    categoryLabel: "Process Standards",
    image: "../assets/welfare.jpg",
    stats: "Welfare Certified",
    features: ["Free Range Options", "Veterinary Care", "Stress Reduction"]
  },
  {
    id: 8,
    title: "Nutritional Excellence",
    description: "Optimized feed formulas for maximum nutritional value and health benefits.",
    icon: "Apple",
    category: "product",
    categoryLabel: "Product Excellence",
    image: "../assets/nutrition.jpg",
    stats: "Rich in Nutrients",
    features: ["Vitamin Enriched", "Omega-3 Boosted", "Antibiotic Free"]
  },
  {
    id: 9,
    title: "Local Community Support",
    description: "Supporting local farmers and contributing to community development.",
    icon: "Users",
    category: "customer",
    categoryLabel: "Customer Focus",
    image: "../assets/customer.jpg",
    stats: "Community Partner",
    features: ["Local Employment", "Farmer Training", "School Programs"]
  },
  {
    id: 10,
    title: "Research & Development",
    description: "Continuous research to improve breeds, feeds, and farming techniques.",
    icon: "FlaskConical",
    category: "innovation",
    categoryLabel: "Innovation",
    image: "../assets/quality.jpg",
    stats: "R&D Focused",
    features: ["Breed Improvement", "Feed Research", "Process Innovation"]
  },
  {
    id: 11,
    title: "Transparent Operations",
    description: "Open communication about our practices, pricing, and processes.",
    icon: "Eye",
    category: "customer",
    categoryLabel: "Customer Focus",
    image: "../assets/customer.jpg",
    stats: "Full Transparency",
    features: ["Farm Visits", "Pricing Breakdown", "Process Documentation"]
  },
  {
    id: 12,
    title: "Environmental Stewardship",
    description: "Minimizing environmental impact through sustainable practices.",
    icon: "TreePine",
    category: "process",
    categoryLabel: "Process Standards",
    image: "../assets/fresh.jpg",
    stats: "Carbon Neutral",
    features: ["Water Recycling", "Solar Power", "Biodegradable Packaging"]
  }
];

export default QualitiesPage;