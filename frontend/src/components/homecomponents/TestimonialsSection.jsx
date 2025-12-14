import React, { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";

/* =========================
   JSON CONTENT (INLINE)
========================= */
const testimonialSection = {
  title: "What They’re Saying",
  testimonials: [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Commercial Farmer, Texas",
      content:
        "The quality of chicks we received was exceptional. 98% survival rate and they're thriving. Best poultry supplier we've worked with in 15 years of farming.",
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
        "I really like your website interface it is really nice, catchy and easily navigated. Your products are all quality, I really loved the chicken meat.",
      rating: 5,
      avatar: "../../assets/avatar3.jfif",
    },
  ],
  images: [
    { id: "1", img: "../../assets/tighs.jpg" },
    { id: "2", img: "../../assets/wing.jpg" },
    { id: "3", img: "../../assets/drumsticks.jpg" },
    { id: "4", img: "../../assets/feet.jpg" },
    { id: "5", img: "../../assets/breast.jpg" },
    { id: "6", img: "../../assets/smoke.jpg" },
  ],
};

/* =========================
   COMPONENT
========================= */
const TestimonialSection = () => {
  const { title, testimonials, images } = testimonialSection;

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Scroll reveal refs
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const mobileNavRef = useScrollReveal();

  // Autoplay
  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    pauseAutoplay();
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    pauseAutoplay();
  };

  const pauseAutoplay = () => {
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

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

  const current = testimonials[currentTestimonial];

  return (
    <section className="bg-lime-50 py-12 lg:py-24 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="scroll-reveal opacity-0 translate-y-8 text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16"
        >
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT */}
          <div
            ref={leftRef}
            className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2 bg-white rounded-2xl p-8 flex flex-col justify-between shadow-lg"
          >
            <div>
              <p className="text-gray-600 text-lg italic mb-6">
                “{current.content}”
              </p>

              <div className="flex gap-2 mb-4">
                {renderStars(current.rating)}
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {current.name}
                  </h3>
                  <p className="text-gray-600">{current.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between items-center">
              <button onClick={handlePrev} className="p-2 hover:bg-lime-100 rounded-full">
                ‹
              </button>

              <span className="text-sm text-gray-600">
                {currentTestimonial + 1} / {testimonials.length}
              </span>

              <button onClick={handleNext} className="p-2 hover:bg-lime-100 rounded-full">
                ›
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/review"
                className="inline-flex items-center gap-2 text-gray-700 font-medium"
              >
                GO TO REVIEWS
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={rightRef}
            className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition"
                >
                  <img
                    src={img.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div
          ref={mobileNavRef}
          className="scroll-reveal opacity-0 translate-y-8 flex lg:hidden justify-center gap-6 mt-8"
        >
          <button onClick={handlePrev} className="p-3 bg-lime-100 rounded-full">
            ‹
          </button>
          <span className="font-medium">
            {currentTestimonial + 1} / {testimonials.length}
          </span>
          <button onClick={handleNext} className="p-3 bg-lime-100 rounded-full">
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
