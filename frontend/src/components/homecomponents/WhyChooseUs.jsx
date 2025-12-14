import React, { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";

const AboutSection = ({ content }) => {
  const { loading } = useContext(ContentContext);

  // Scroll reveal refs
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const productsRef = useScrollReveal();
  const featureImageRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  if (loading || !content) return null;

  const data = content;

  const stats = [
    { label: "Live Poultry", value: "1,820" },
    { label: "Blog Articles", value: "357" },
    { label: "Satisfied Customers", value: "720" },
    { label: "Reliable Partners", value: "250" },
  ];

  return (
    <section className="bg-gray-50 py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Left Column */}
          <div ref={leftRef} className="scroll-reveal space-y-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-lime-500 rounded-full"></div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {data.title}
            </h2>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="scroll-reveal space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">{data.text1}</p>
            <Link to="/about" className="inline-flex bg-lime-400 rounded-full px-6 py-2.5 text-gray-700 items-center gap-2 group">
              <span className="text-lg font-medium group-hover:text-gray-600 transition-colors duration-300">
                Learn more
              </span>
              <Icons.ArrowRight className="h-5 w-5 text-gray-700 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div ref={productsRef} className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {data.products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">{item.category}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <Link to={item.link} className="flex items-center gap-2 group/link">
                    <span className="text-sm font-medium text-lime-600 group-hover/link:text-lime-700 transition-colors duration-300">
                      View products
                    </span>
                    <Icons.ChevronRight className="h-4 w-4 text-lime-500 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>

                  {item.price && <span className="text-lg font-bold text-emerald-700">{item.price}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURE IMAGE */}
        <div ref={featureImageRef} className="scroll-reveal relative mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={data.image} alt="Organic farming" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute bottom-8 left-8 max-w-xl">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-1 w-8 bg-white rounded-full"></div>
                <span className="text-sm font-semibold text-white uppercase tracking-wide">
                  Natural & Healthy
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{data.title2}</h3>
              <p className="text-gray-200 mb-6">{data.text2}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-lime-400 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                Browse Products
                <Icons.ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div ref={statsRef} className="scroll-reveal bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building trust through transparency and quality for years
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                <div className="text-4xl font-bold text-lime-600 mb-3">
                  {stat.value}
                  <span className="text-lime-600 text-2xl">+</span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div ref={ctaRef} className="scroll-reveal mt-20 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Ready to Experience Quality?</h3>
            <p className="text-gray-600 text-lg">
              Join thousands of satisfied customers who trust our organic products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                to="/blog"
                className="px-8 py-3 bg-lime-500 text-white font-medium rounded-lg hover:bg-lime-600 transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                Blog Posts
                <Icons.Star className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-lime-500 hover:text-lime-600 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <Icons.Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
