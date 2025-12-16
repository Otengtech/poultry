import React, { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";
import axios from "axios";

const test = {
  title: "What They Say",
  description:
    "Join thousands of satisfied farmers who have transformed their poultry farming with our premium products, expert guidance, and sustainable practices.",
};

/* =========================
   COMPONENT
========================= */
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
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
                    <svg
                      className="w-10 h-10 text-lime-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Testimonial content */}
                  <p className="text-gray-700 text-lg italic mb-6 flex-1 min-h-[120px]">
                    "{current?.content || "No testimonials available yet"}"
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">{renderStars(current?.rating)}</div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={current?.avatar}
                      alt={current?.name || "User"}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow flex-shrink-0"
                      
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 truncate overflow-hidden max-w-[150px]">
                        {current?.name || "Anonymous"}
                      </h3>
                      <p className="text-gray-600 text-sm truncate overflow-hidden max-w-[200px]">
                        {current?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-6 pt-6 border-t border-lime-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleTestimonialNav("prev")}
                        className="p-2 hover:bg-white rounded-full transition-colors"
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
                                idx === currentIndex ? "bg-lime-600 w-6" : "bg-gray-300"
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
                        className="p-2 hover:bg-white rounded-full transition-colors"
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
                to="/testimonials"
                className="inline-flex items-center gap-2 text-lime-700 hover:text-lime-800 font-medium transition-colors group"
              >
                Read Reviews
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
