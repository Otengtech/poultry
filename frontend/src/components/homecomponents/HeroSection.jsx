import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../animation/useScrollReveal";
import heroImage from "../../../public/assets/heroimage.jpg";

const HeroSection = ({ content }) => {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // 'right' or 'left'
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
      setDirection("right");
      setIsAnimating(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 600);
    };

    const interval = setInterval(rotateContent, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content]);

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    
    setDirection(index > currentIndex ? "right" : "left");
    setIsAnimating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
      
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 600);
  };

  if (!content || !content.length) return null;

  const hero = content[currentIndex];
  const nextIndex = (currentIndex + 1) % content.length;
  const nextHero = content[nextIndex];

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
          <div className="text-white space-y-6 max-w-3xl w-full">
            {/* Tagline with slide-in animation */}
            <div className="overflow-hidden h-7">
              <p
                key={`tagline-${currentIndex}`}
                className={`text-lime-300 text-lg transition-all duration-700 delay-100 transform ${
                  isAnimating
                    ? direction === "right"
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                EGGXCELLENTLY YOURS
              </p>
            </div>

            {/* Title with slide animation */}
            <div className="relative h-28 sm:h-32 lg:h-36 overflow-hidden">
              {/* Current title sliding out */}
              <h1
                key={`title-out-${currentIndex}`}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  isAnimating
                    ? direction === "right"
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                {hero.title}
              </h1>
              
              {/* Next title sliding in */}
              {isAnimating && (
                <h1
                  key={`title-in-${nextIndex}`}
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                    direction === "right"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                  }`}
                  style={{
                    animation: isAnimating
                      ? `slideIn${direction === "right" ? "FromRight" : "FromLeft"} 0.7s ease-out forwards`
                      : "none",
                  }}
                >
                  {nextHero.title}
                </h1>
              )}
            </div>

            {/* Description with slide animation */}
            <div className="relative h-24 sm:h-28 overflow-hidden">
              {/* Current description sliding out */}
              <p
                key={`desc-out-${currentIndex}`}
                className={`text-lg text-gray-200 transition-all duration-700 delay-200 absolute inset-0 flex items-center justify-center ${
                  isAnimating
                    ? direction === "right"
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                {hero.description}
              </p>
              
              {/* Next description sliding in */}
              {isAnimating && (
                <p
                  key={`desc-in-${nextIndex}`}
                  className={`text-lg text-gray-200 absolute inset-0 flex items-center justify-center transition-all duration-700 delay-200 ${
                    direction === "right"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                  }`}
                  style={{
                    animation: isAnimating
                      ? `slideIn${direction === "right" ? "FromRight" : "FromLeft"} 0.7s ease-out 0.2s forwards`
                      : "none",
                  }}
                >
                  {nextHero.description}
                </p>
              )}
            </div>

            {/* Button - keep consistent */}
            <div className="flex justify-center items-center w-full pt-4">
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
                onClick={() => handleDotClick(index)}
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