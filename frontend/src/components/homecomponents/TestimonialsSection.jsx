import React, { useState, useEffect } from "react";
import { Star, ArrowRight, ChevronDown, X, Quote, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";
import axios from "axios";

const test = {
  title: "What They Say",
  description:
    "Join thousands of satisfied farmers who have transformed their poultry farming with our premium products, expert guidance, and sustainable practices.",
};

/* =========================
   MODAL COMPONENT
========================= */
const TestimonialModal = ({ testimonial, isOpen, onClose }) => {
  if (!isOpen || !testimonial) return null;

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < (rating || 0)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lime-50 rounded-lg">
                <Quote className="w-6 h-6 text-lime-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
                <p className="text-sm text-gray-500">Full testimonial</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Author info */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="relative flex-shrink-0">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonial.name || "Anonymous"}
                </h3>
                <p className="text-gray-600 mb-2">{testimonial.email || "No email"}</p>
                
                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {testimonial.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{testimonial.location}</span>
                    </div>
                  )}
                  {testimonial.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{testimonial.rating || 0}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {renderStars(testimonial.rating)}
            </div>

            {/* Full content */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Review
              </h4>
              <div className="bg-gray-50 rounded-xl p-6">
                <Quote className="w-8 h-8 text-lime-300 mb-4" />
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {testimonial.content || "No review content available"}
                </p>
              </div>
            </div>

            {/* Additional info if available */}
            {(testimonial.additionalInfo || testimonial.product) && (
              <div className="bg-lime-50 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-lime-800 mb-3">
                  Additional Details
                </h4>
                <div className="space-y-2 text-sm">
                  {testimonial.product && (
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-600">Product:</span>
                      <span className="text-gray-700">{testimonial.product}</span>
                    </div>
                  )}
                  {testimonial.additionalInfo && (
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-600">Note:</span>
                      <span className="text-gray-700">{testimonial.additionalInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Review ID: {testimonial.id || "N/A"}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-lime-600 text-white font-medium rounded-lg hover:bg-lime-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-review`
        );
        setTestimonials(res.data.reviews);
      } catch (err) {
        console.error("Error fetching testimonials: ", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Scroll reveal refs
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
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
    if (direction === "next") {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < (rating || 0)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  const current = testimonials[currentIndex] || {};

  // Function to truncate text with line clamp
  const truncateText = (text, maxLines = 2) => {
    if (!text) return "";
    // This is a CSS-based clamp, but we'll also truncate characters as fallback
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayContent = truncateText(current?.content);

  return (
    <>
      <section className="bg-lime-50 py-14 px-4 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Full-width header section */}
          <div
            ref={leftRef}
            className="scroll-reveal opacity-0 translate-y-8 mb-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left side: Title and description */}
                <div className="min-w-0">
                  <h1
                    ref={titleRef}
                    className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                  >
                    {test.title}
                  </h1>
                  <p className="text-gray-600 text-md leading-relaxed">
                    {test.description}
                  </p>

                  {/* Stats or key points */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-lime-700">98%</div>
                      <div className="text-sm text-gray-600">Survival Rate</div>
                    </div>
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-lime-700">
                        5000+
                      </div>
                      <div className="text-sm text-gray-600">Happy Farmers</div>
                    </div>
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-lime-700">35%</div>
                      <div className="text-sm text-gray-600">
                        Production Increase
                      </div>
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
                  className="scroll-reveal opacity-0 translate-y-8 bg-lime-50 rounded-xl p-6 lg:p-8 will-change-transform"
                >
                  <div className="flex flex-col h-full min-w-0">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <Quote className="w-10 h-10 text-lime-300" />
                    </div>

                    {/* Testimonial content with line clamp */}
                    <div className="mb-6 flex-1 group">
                      <div 
                        className="relative cursor-pointer"
                        onClick={openModal}
                      >
                        {/* Line-clamped content */}
                        <p className="text-gray-700 text-lg italic line-clamp-2 md:line-clamp-3 hover:line-clamp-none transition-all duration-200 group-hover:bg-gray-50 group-hover:p-3 group-hover:rounded-lg">
                          "{current?.content || "No testimonials available yet"}"
                        </p>
                        
                        {/* Read More overlay */}
                        <div className="absolute bottom-0 right-0 left-0 h-12 bg-gradient-to-t from-lime-50 to-transparent pointer-events-none flex items-end justify-end p-2">
                          <span className="text-sm font-medium text-lime-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-lime-200 shadow-sm">
                            Read more
                          </span>
                        </div>
                      </div>
                      
                      {/* Click hint */}
                      <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                        Click anywhere on the review to read full details
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">{renderStars(current?.rating)}</div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={current?.avatar}
                          alt={current?.name || "User"}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                        />
                        {/* Online indicator */}
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 truncate overflow-hidden max-w-[150px]">
                          {current?.name || "Anonymous"}
                        </h3>
                        <p className="text-gray-600 text-sm truncate overflow-hidden max-w-[200px]">
                          {current?.email || "No email"}
                        </p>
                        {current?.location && (
                          <p className="text-gray-500 text-xs truncate overflow-hidden max-w-[200px]">
                            {current.location}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={openModal}
                        className="ml-auto p-2 hover:bg-white rounded-full transition-colors hover:scale-110 active:scale-95"
                        aria-label="View full review"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-600 transform rotate-90" />
                      </button>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 pt-6 border-t border-lime-100">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleTestimonialNav("prev")}
                          className="p-2 hover:bg-white rounded-full transition-colors hover:scale-110 active:scale-95"
                          aria-label="Previous testimonial"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {testimonials.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  idx === currentIndex ? "bg-lime-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {testimonials.length > 0
                              ? `${currentIndex + 1} / ${testimonials.length}`
                              : "0 / 0"}
                          </span>
                        </div>

                        <button
                          onClick={() => handleTestimonialNav("next")}
                          className="p-2 hover:bg-white rounded-full transition-colors hover:scale-110 active:scale-95"
                          aria-label="Next testimonial"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
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
                  to="/review"
                  className="inline-flex items-center gap-2 text-lime-700 hover:text-lime-800 font-medium transition-colors group hover:gap-3"
                >
                  View All Reviews
                  <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <TestimonialModal 
        testimonial={current}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TestimonialSection;