import React, { useContext, useState, useEffect } from "react";
import { ContentContext } from "../../context/ContentContext";
import { Star, ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../animation/useScrollReveal";

const TestimonialSection = ({content}) => {
  const { loading } = useContext(ContentContext);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { title, testimonials, images } = content;

  // Reveal refs
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const mobileNavRef = useScrollReveal();

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  if (loading || !content) return null;

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="bg-lime-50 py-12 lg:py-24 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="scroll-reveal opacity-0 translate-y-8 text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 lg:mb-16"
        >
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left */}
          <div
            ref={leftRef}
            className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2 rounded-2xl p-6 lg:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-lime-300"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Text */}
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed italic mb-6">
                "{currentData.content}"
              </p>

              <div className="flex items-center gap-2 mb-4">
                {renderStars(currentData.rating)}
              </div>

              {/* Person */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-lime-100">
                    {currentData.avatar ? (
                      <img
                        src={currentData.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 text-lime-600 mx-auto mt-4">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {currentData.name}
                  </h3>
                  <p className="text-gray-600">{currentData.role}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-8 lg:mt-12 flex justify-center items-center gap-2 mb-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? "bg-lime-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Desktop Prev/Next */}
            <div className="hidden lg:flex justify-center items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-lime-50"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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

              <span className="text-gray-600 text-sm">
                {currentTestimonial + 1} / {testimonials.length}
              </span>

              <button
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-lime-50"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
            <div className="flex justify-center mt-4 items-center space-x-4">
              <Link
                to="/review"
                className="inline-flex items-center px-6 py-3 color text-gray-700 font-medium rounded-full duration-300 group"
              >
                GO TO REVIEWS
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div
            ref={rightRef}
            className="scroll-reveal opacity-0 translate-y-8 lg:w-1/2"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={image.img}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          ref={mobileNavRef}
          className="scroll-reveal opacity-0 translate-y-8 flex lg:hidden justify-center items-center gap-6 mt-8"
        >
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-lime-100 hover:bg-lime-200"
          >
            <svg
              className="w-5 h-5 text-lime-700"
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

          <span className="text-gray-700 font-medium">
            {currentTestimonial + 1} / {testimonials.length}
          </span>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-lime-100 hover:bg-lime-200"
          >
            <svg
              className="w-5 h-5 text-lime-700"
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
    </section>
  );
};

export default TestimonialSection;
