import React, { useEffect, useRef } from "react";

import drumsticks from "/assets/drumsticks.jpg";
import feet from "/assets/feet.jpg";
import thighs from "/assets/tighs.jpg";
import wings from "/assets/wing.jpg";
import egg from "/assets/egg.jpg";
import breast from "/assets/breast.jpg";

const poultryProducts = [
  {
    id: 1,
    name: "Drumsticks",
    image: drumsticks,
    comment: "Juicy and tender drumsticks"
  },
  {
    id: 2,
    name: "Feet",
    image: feet,
    comment: "Perfect for soups and stews"
  },
  {
    id: 3,
    name: "Thighs",
    image: thighs,
    comment: "Great for grilling or baking"
  },
  {
    id: 4,
    name: "Wings",
    image: wings,
    comment: "Crispy party wings"
  },
  {
    id: 5,
    name: "Eggs",
    image: egg,
    comment: "Fresh farm eggs"
  },
  {
    id: 6,
    name: "Breast",
    image: breast,
    comment: "Lean healthy protein"
  }
];

function LatestPoultry() {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollWidthRef = useRef(0);
  const isScrollingRef = useRef(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const items = container.children;
    const halfLength = items.length / 2;

    let totalWidth = 0;
    for (let i = 0; i < halfLength; i++) {
      totalWidth += items[i].offsetWidth;
    }
    scrollWidthRef.current = totalWidth;

    const autoScroll = () => {
      if (!isScrollingRef.current) return;

      container.scrollLeft += 1.5;

      if (container.scrollLeft >= scrollWidthRef.current) {
        container.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    const pauseScroll = () => {
      isScrollingRef.current = false;
      cancelAnimationFrame(animationRef.current);
    };

    const resumeScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        animationRef.current = requestAnimationFrame(autoScroll);
      }
    };

    container.addEventListener("mouseenter", pauseScroll);
    container.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", pauseScroll);
      container.removeEventListener("mouseleave", resumeScroll);
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-lime-50 to-lime-100">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Poultry Products
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 w-full overflow-x-auto no-scrollbar scroll-smooth py-4 px-2"
        >
          {[...poultryProducts, ...poultryProducts].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-72 flex-shrink-0 rounded-2xl cursor-pointer overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
            >
              <div className="absolute inset-0 bg-black/50 z-10" />

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-100 text-sm mb-3 opacity-90">
                    {item.comment}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-lime-600/90 text-white text-xs font-semibold rounded-full">
                      Farm Fresh
                    </span>
                    <span className="text-white text-xs opacity-75">
                      #{item.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestPoultry;
