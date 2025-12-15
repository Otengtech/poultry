import React, { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";
import LatestPoultry from "../../components/LatestPoultry"; // Import your LatestPoultry component

const testimonialSection = {
  title: "What They Say",
  // subtitle: "Trusted by farmers worldwide for quality poultry solutions",
  description: "Join thousands of satisfied farmers who have transformed their poultry farming with our premium products, expert guidance, and sustainable practices.",
  testimonials: [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Commercial Farmer, Texas",
      content:
        "The quality of chicks we received was exceptional. 98% survival rate and they're thriving. This has transformed our farming operations.",
      rating: 5,
      avatar: "../../assets/avatar1.jfif",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Organic Farm Owner, Oregon",
      content:
        "Their commitment to animal welfare and organic practices aligns perfectly with our values. The eggs are consistently fresh and customers love them.",
      rating: 5,
      avatar: "../../assets/avatar2.jfif",
    },
    {
      id: 3,
      name: "Felix Oteng",
      role: "On-Farm Supervisor, Ghana",
      content:
        "I really like your website interface it is really nice, catchy and easily navigated. Your products are all quality.",
      rating: 5,
      avatar: "../../assets/avatar3.jfif",
    },
    {
      id: 4,
      name: "Linda Chen",
      role: "Poultry Farm Manager, California",
      content:
        "The technical support and training provided have been invaluable. Our production efficiency increased by 35%.",
      rating: 5,
      avatar: "../../assets/avatar4.jfif",
    },
  ],
};

/* =========================
   COMPONENT
========================= */
const TestimonialSection = () => {
  const { title, subtitle, description, testimonials } = testimonialSection;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll reveal refs
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();

  /* ---------- TESTIMONIAL AUTOPLAY ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleTestimonialNav = (direction) => {
    if (direction === 'next') {
      setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
    } else {
      setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
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
        {/* Full-width header section */}
        <div
          ref={leftRef}
          className="scroll-reveal opacity-0 translate-y-8 mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left side: Title and description */}
              <div>
                <h1
                  ref={titleRef}
                  className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                >
                  {title}
                </h1>
                {/* <h2 className="text-md lg:text-xl font-semibold text-lime-500 mb-4">
                  {subtitle}
                </h2> */}
                <p className="text-gray-600 text-md leading-relaxed">
                  {description}
                </p>
                
                {/* Stats or key points */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-lime-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-lime-700">98%</div>
                    <div className="text-sm text-gray-600">Survival Rate</div>
                  </div>
                  <div className="bg-lime-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-lime-700">5000+</div>
                    <div className="text-sm text-gray-600">Happy Farmers</div>
                  </div>
                  <div className="bg-lime-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-lime-700">35%</div>
                    <div className="text-sm text-gray-600">Production Increase</div>
                  </div>
                  <div className="bg-lime-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-lime-700">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>

              {/* Right side: Current testimonial */}
              <div
                ref={testimonialsRef}
                className="scroll-reveal opacity-0 translate-y-8 bg-lime-50 rounded-xl p-6 lg:p-8"
              >
                <div className="flex flex-col h-full">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <svg className="w-10 h-10 text-lime-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Testimonial content */}
                  <p className="text-gray-700 text-lg italic mb-6 flex-1">
                    "{current.content}"
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {renderStars(current.rating)}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{current.name}</h3>
                      <p className="text-gray-600 text-sm">{current.role}</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-6 pt-6 border-t border-lime-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleTestimonialNav('prev')}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                        aria-label="Previous testimonial"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {testimonials.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentIndex ? 'bg-lime-600 w-6' : 'bg-gray-300'
                              }`}
                              aria-label={`Go to testimonial ${idx + 1}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {currentIndex + 1} / {testimonials.length}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTestimonialNav('next')}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                        aria-label="Next testimonial"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View all testimonials link */}
            <div className="mt-8 text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 text-lime-700 hover:text-lime-800 font-medium transition-colors group"
              >
                Read Reviews
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        {/* Latest Poultry Section - Replaces news feed */}
        <div
          ref={rightRef}
          className="scroll-reveal opacity-0 translate-y-8"
        >
          <LatestPoultry />
        </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;