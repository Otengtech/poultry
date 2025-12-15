import React, { useState, useEffect } from "react";
import { Star, ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";

/* =========================
   DATA
========================= */
const testimonialSection = {
  title: "What They're Saying",
  testimonials: [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Commercial Farmer, Texas",
      content:
        "The quality of chicks we received was exceptional. 98% survival rate and they're thriving.",
      rating: 5,
      avatar: "../../assets/avatar1.jfif",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Organic Farm Owner, Oregon",
      content:
        "Their commitment to animal welfare and organic practices aligns perfectly with our values.",
      rating: 5,
      avatar: "../../assets/avatar2.jfif",
    },
    {
      id: 3,
      name: "Felix Oteng",
      role: "On-Farm Supervisor, Ghana",
      content:
        "Clean interface, smooth navigation, and high-quality poultry products.",
      rating: 5,
      avatar: "../../assets/avatar3.jfif",
    },
  ],
  newsFeed: [
    {
      id: 1,
      title: "Improved Poultry Feed Formula Introduced",
      content:
        "A nutrient-optimized poultry feed improves growth and reduces waste.",
      date: "2024-03-15",
      category: "Nutrition",
      readTime: "2 min read",
    },
    {
      id: 2,
      title: "Smart Poultry Housing System Launched",
      content:
        "Automated systems ensure ideal living conditions for poultry.",
      date: "2024-03-10",
      category: "Technology",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "Sustainable Poultry Waste Management",
      content:
        "Recycling poultry waste into organic fertilizer supports sustainability.",
      date: "2024-03-05",
      category: "Sustainability",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Enhanced Poultry Health Monitoring",
      content:
        "Digital tools enable early detection of poultry health issues.",
      date: "2024-02-28",
      category: "Animal Health",
      readTime: "2 min read",
    },
  ],
};

/* =========================
   COMPONENT
========================= */
const TestimonialSection = () => {
  const { title, testimonials, newsFeed } = testimonialSection;
  const [currentIndex, setCurrentIndex] = useState(0);

  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  /* ---------- TESTIMONIAL AUTOPLAY ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  const current = testimonials[currentIndex];

  return (
    <section className="bg-lime-50 py-16 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1
          ref={titleRef}
          className="scroll-reveal opacity-0 translate-y-8 text-4xl lg:text-5xl font-bold text-center mb-14"
        >
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* TESTIMONIAL */}
          <div
  ref={leftRef}
  className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full"
>
  {/* Quote Icon */}
  <div className="mb-4">
    <svg className="w-8 h-8 text-lime-200" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  </div>

  {/* Testimonial Content */}
  <div className="flex-1">
    <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
      "{current.content}"
    </p>

    {/* Stars Rating */}
    <div className="flex gap-1 mb-8">
      {renderStars(current.rating)}
      <span className="ml-2 text-sm text-gray-500 font-medium">
        {current.rating}.0 Rating
      </span>
    </div>

    {/* Author Info */}
    <div className="flex items-center gap-4">
      <div className="relative">
        <img
          src={current.avatar}
          alt={current.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-lime-100"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{current.name}</h3>
        <p className="text-gray-600">{current.role}</p>
      </div>
    </div>
  </div>

  {/* Navigation & Indicators */}
  <div className="mt-8 pt-6 border-t border-gray-100">
    <div className="flex items-center justify-between">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-lime-50 transition-colors group"
        aria-label="Previous testimonial"
      >
        <svg 
          className="w-5 h-5 text-gray-400 group-hover:text-lime-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-8 bg-lime-600' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              } h-2 rounded-full`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 font-medium min-w-[60px]">
          {currentIndex + 1} of {testimonials.length}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-lime-50 transition-colors group"
        aria-label="Next testimonial"
      >
        <svg 
          className="w-5 h-5 text-gray-400 group-hover:text-lime-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* View All Link */}
    <div className="mt-6 text-center">
      <Link
        to="/testimonials"
        className="inline-flex items-center gap-2 text-lime-700 hover:text-lime-800 font-medium transition-colors group"
      >
        Read More Testimonials
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
</div>

          {/* NEWS FEED */}
          <div
            ref={rightRef}
            className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 h-[420px] overflow-hidden">
              <h2 className="text-xl font-bold mb-4">
                Latest News & Updates
              </h2>

              <div className="relative h-full overflow-hidden group">
                <div className="space-y-4 animate-news-scroll group-hover:pause-animation">
                  {[...newsFeed, ...newsFeed].map((news, index) => (
                    <div
                      key={`${news.id}-${index}`}
                      className="border-l-2 border-lime-400 pl-3 py-2 rounded-r"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {news.title}
                        </h3>
                        <span className="bg-lime-100 text-lime-800 text-xs px-2 py-0.5 rounded">
                          {news.category}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {news.content}
                      </p>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {news.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {news.readTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fade edges */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              <div className="text-center mt-4 pt-4 border-t">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-lime-700"
                >
                  VIEW ALL NEWS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
