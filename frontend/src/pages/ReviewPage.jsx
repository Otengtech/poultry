import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Star,
  MessageSquare,
  User,
  Mail,
  Calendar,
  Camera,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useScrollReveal } from "../animation/useScrollReveal";
import Footer from "../components/homecomponents/Footer";

/* ===================== JSON DATA ===================== */
const reviewData = {
  title: "What They’re Saying",
  testimonials: [
    {
      id: 1,
      name: "Michael Rodriguez",
      email: "michaelrod@gmail.com",
      content:
        "The quality of chicks we received was exceptional. 98% survival rate and they're thriving. Best poultry supplier we've worked with in 15 years of farming.",
      rating: 5,
      avatar: "/assets/avatar1.jfif",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "john123sarah@gmail.com",
      content:
        "Their commitment to animal welfare and organic practices aligns perfectly with our values. The eggs are consistently fresh and customers love them.",
      rating: 5,
      avatar: "/assets/avatar2.jfif",
    },
    {
      id: 3,
      name: "Felix Oteng",
      email: "ultimate90@gmail.com",
      content:
        "I really like your website interface it is really nice, catchy and easily navigated. Your products are all quality, I really loved the chicken meat.",
      rating: 5,
      avatar: "/assets/avatar3.jfif",
    },
  ],
};

/* ===================== COMPONENT ===================== */
const ReviewPage = () => {
  const testimonials = reviewData.testimonials;

  const [currentReview, setCurrentReview] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const titleRef = useScrollReveal();
  const featuredRef = useScrollReveal();

  const allReviews = useMemo(
    () => [...testimonials, ...submittedReviews],
    [testimonials, submittedReviews]
  );

  const featuredReview = allReviews[currentReview];

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!autoplay || allReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, allReviews.length]);

  const goToNext = () =>
    setCurrentReview((prev) => (prev + 1) % allReviews.length);
  const goToPrevious = () =>
    setCurrentReview((prev) =>
      prev === 0 ? allReviews.length - 1 : prev - 1
    );

  const renderStars = (rating = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lime-50">
      {/* HERO */}
      <section className="bg-gray-900 py-16 text-center">
        <h1
          ref={titleRef}
          className="scroll-reveal opacity-0 translate-y-8 text-4xl font-bold text-white"
        >
          {reviewData.title}
        </h1>
        <p className="text-lime-100 mt-3">
          Real feedback from customers who trust us
        </p>
      </section>

      {/* FEATURED REVIEW */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div
          ref={featuredRef}
          className="scroll-reveal opacity-0 translate-y-8 bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Review</h2>
            <div className="flex gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-lime-100"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-lime-100"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="bg-lime-50 rounded-2xl p-8">
            <p className="italic text-lg mb-4">
              “{featuredReview.content}”
            </p>

            <div className="flex items-center gap-2 mb-4">
              {renderStars(featuredReview.rating)}
            </div>

            <div className="flex items-center gap-4">
              <img
                src={featuredReview.avatar}
                alt={featuredReview.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{featuredReview.name}</h3>
                <p className="text-sm text-gray-600">
                  {featuredReview.email}
                </p>
              </div>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-6 gap-2">
            {allReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentReview
                    ? "bg-lime-500 w-6"
                    : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewPage;
