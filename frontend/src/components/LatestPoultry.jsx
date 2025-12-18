import { useEffect, useRef } from "react";

const poultryProducts = [
  { id: 1, name: "Drumsticks", image: "/assets/drumsticks.jpg", comment: "Juicy and tender drumsticks" },
  { id: 2, name: "Feet", image: "/assets/feet.jpg", comment: "Perfect for soups and stews" },
  { id: 3, name: "Thighs", image: "/assets/tighs.jpg", comment: "Great for grilling or baking" },
  { id: 4, name: "Wings", image: "/assets/wing.jpg", comment: "Crispy party wings" },
  { id: 5, name: "Eggs", image: "/assets/egg.jpg", comment: "Fresh farm eggs" },
  { id: 6, name: "Breast", image: "/assets/breast.jpg", comment: "Lean healthy protein" }
];

const LatestSneakers = () => {
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);
  const widthRef = useRef(0);
  const isScrollingRef = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const children = el.children;
    const half = children.length / 2;

    // Calculate width of one set (first half)
    let width = 0;
    for (let i = 0; i < half; i++) {
      width += children[i].offsetWidth;
    }
    widthRef.current = width;

    const scroll = () => {
      if (!isScrollingRef.current || !el) return;

      el.scrollLeft += 1.5;

      if (el.scrollLeft >= widthRef.current) {
        el.scrollLeft = 0;
      }

      animationFrameId.current = requestAnimationFrame(scroll);
    };

    animationFrameId.current = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      isScrollingRef.current = false;
      cancelAnimationFrame(animationFrameId.current);
    };

    const handleMouseLeave = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        animationFrameId.current = requestAnimationFrame(scroll);
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-6">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
        Our Top Products
      </div>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto no-scrollbar px-4"
        style={{ scrollBehavior: "auto", scrollSnapType: "none" }}
      >
        {[...poultryProducts, ...poultryProducts].map((sneaker, index) => (
          <div
            key={`${sneaker.name}-${index}`}
            className="w-72 flex-shrink-0 bg-white text-black p-4 my-2 transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className="w-full h-36 object-cover rounded-lgs mb-4"
            />
            <h3 className="text-lg font-bold text-center">{sneaker.name}</h3>
            <p className="text-center text-gray-600">{sneaker.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestSneakers;