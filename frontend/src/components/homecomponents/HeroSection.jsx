import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../animation/useScrollReveal";
const heroImage = "/assets/heroimage.jpg";

const heroData = {
  heroMessages: [
    {
      title: "NAYA SUCCESS AXIS FOODS",
      description:
        "Experience quality eggs, meats and chicks nurtured with care and delivered to you.",
    },
    {
      title: "Premium Poultry Services",
      description:
        "We provide healthy livestock and reliable delivery for farms and homes.",
    },
    {
      title: "Quality, Fresh and Organic",
      description:
        "Enjoy farm-fresh products raised with the highest standards for safety and nutrition.",
    },
    {
      title: "Trusted by Farmers Nationwide",
      description:
        "Your reliable partner for poultry supply, consulting, and farm management.",
    },
    {
      title: "Healthy Birds, Healthy Business",
      description:
        "Our expert poultry practices ensure your birds grow strong, healthy, and productive.",
    },
    {
      title: "Sustainable Farming Solutions",
      description:
        "We combine modern poultry techniques with eco-friendly methods to support long-term growth.",
    },
  ],
};

const HeroSection = () => {
  const sectionRef = useScrollReveal();
  const timeoutRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const content = heroData.heroMessages;

  // Rotation logic
  useEffect(() => {
    if (!content.length) return;

    const rotate = () => {
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        setIsAnimating(false);
      }, 500);
    };

    const interval = setInterval(rotate, 10000);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [content]);

  const { title, description } = content[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="w-full h-[75vh] md:h-[85vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />
        
        {/* Content Container */}
        <div
          ref={sectionRef}
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
        >
          <div className="text-white w-full max-w-4xl mx-auto space-y-8 md:space-y-10 text-center">
            
            {/* Subtitle */}
            <div className="space-y-3">
              <p className="text-lime-300 text-lg md:text-xl font-medium tracking-wide">
                EGGXCELLENTLY YOURS
              </p>
              
              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-500 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {title}
              </h1>
            </div>

            {/* Description */}
            <p
              className={`text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed transition-all duration-500 delay-100 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {description}
            </p>

            {/* CTA Button */}
            <div className="flex items-center justify-center pt-4 space-x-4">
              <Link to="/products">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="text-base md:text-md">Our Products</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6"/>
                </button>
              </Link>
              <Link to="/about">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-transparent text-lime-500 border hover:border-lime-400 hover:text-lime-400 border-lime-500 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="text-base md:text-md">About US</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </Link>
            </div>

            {/* Simple Pagination Dots */}
            <div className="flex justify-center items-center gap-2 pt-4">
              {content.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsAnimating(false);
                    }, 200);
                  }}
                  className="focus:outline-none group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-lime-500 w-6"
                        : "bg-white/60 group-hover:bg-white"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;