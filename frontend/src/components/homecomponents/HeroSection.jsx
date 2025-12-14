import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../animation/useScrollReveal";
import heroImage from "../../../public/assets/heroimage.jpg";

const HeroSection = ({ content }) => {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Rotate hero messages with animation states
  useEffect(() => {
    if (!content || !content.length) return;

    const rotateContent = () => {
      setIsAnimating(true);

      // Wait for fade-out animation to complete before changing content
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);

        // Wait a bit before allowing fade-in
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 500);
    };

    const interval = setInterval(rotateContent, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content]);

  if (!content || !content.length) return null;

  const hero = content[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="w-full bg-cover bg-center h-[75vh] relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Subtle parallax effect for background */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000 ease-out"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Background overlay with fade-in */}
        <div className="absolute inset-0 bg-black/50 duration-1000" />

        <div
          ref={sectionRef}
          className="relative z-10 h-full flex items-center justify-center px-4 text-center"
        >
          <div className="text-white space-y-6 max-w-3xl">
            {/* Tagline with slide-in animation */}
            <p className="text-lime-300 text-lg transform translate-y-0 opacity-100 transition-all duration-700 delay-100">
              EGGXCELLENTLY YOURS
            </p>

            {/* Title with fade animation */}
            <div className="relative h-28 sm:h-32 lg:h-32 overflow-hidden">
              <h1
                key={currentIndex}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  isAnimating
                    ? "opacity-0 transform -translate-y-4"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {hero.title}
              </h1>
            </div>

            {/* Description with staggered fade-in */}
            <p
              key={`desc-${currentIndex}`}
              className={`text-lg text-gray-200 transition-all duration-500 delay-200 ${
                isAnimating
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {hero.description}
            </p>

            {/* Button with hover animation */}
            <div className="flex justify-center items-center w-full">
              <Link to="/products">
                <button className="px-6 py-3 bg-lime-400 text-black rounded-full flex items-center justify-center gap-2 group relative overflow-hidden transition-all duration-300 hover:bg-lime-500 hover:shadow-lg hover:scale-105 transform">
                  <span className="relative flex items-center justify-center gap-2">
                    Discover More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        {content.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {content.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 100);
                  }, 500);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-lime-400 w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
