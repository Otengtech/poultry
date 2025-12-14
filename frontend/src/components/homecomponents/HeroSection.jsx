import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../animation/useScrollReveal";
const heroImage = "/assets/heroimage.jpg";

/* ================= HERO DATA (INLINE JSON) ================= */
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

  /* ================= ROTATION LOGIC ================= */
  useEffect(() => {
    if (!content.length) return;

    const rotate = () => {
      setIsAnimating(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        setIsAnimating(false);
      }, 600);
    };

    const interval = setInterval(rotate, 6000);
    return () => clearInterval(interval);
  }, [content]);

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const { title, description } = content[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="w-full h-[75vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div
          ref={sectionRef}
          className="relative z-10 h-full flex items-center justify-center px-4 text-center"
        >
          <div className="text-white space-y-6 max-w-3xl w-full">
            <p className="text-lime-300 text-lg tracking-wide">
              EGGXCELLENTLY YOURS
            </p>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-6" : "opacity-100"
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-lg text-gray-200 transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-6" : "opacity-100"
              }`}
            >
              {description}
            </p>

            <Link to="/products">
              <button className="mx-auto px-6 py-3 bg-lime-400 text-black rounded-full flex items-center gap-2 hover:bg-lime-500 transition">
                Discover More
                <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
