import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LatestSneakers = () => {
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);
  const isScrollingRef = useRef(true);
  const [product, setProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-product`);
        setProducts(res.data.data || []);
      } catch {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  // Auto scrolling effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || product.length === 0) return;

    // Wait for DOM + images to settle
    const initScroll = () => {
      const maxScroll = el.scrollWidth / 2;

      const scroll = () => {
        if (!isScrollingRef.current) return;

        el.scrollLeft += 0.4; // 👈 SLOW speed

        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = 0;
        }

        animationFrameId.current = requestAnimationFrame(scroll);
      };

      animationFrameId.current = requestAnimationFrame(scroll);

      const pause = () => {
        isScrollingRef.current = false;
        cancelAnimationFrame(animationFrameId.current);
      };

      const resume = () => {
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          animationFrameId.current = requestAnimationFrame(scroll);
        }
      };

      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);

      return () => {
        cancelAnimationFrame(animationFrameId.current);
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
      };
    };

    const timeout = setTimeout(initScroll, 300);

    return () => clearTimeout(timeout);
  }, [product]);

  return (
    <section className="py-14">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
        Our Top Products
      </h2>

      <div
        ref={scrollRef}
        className="flex w-full items-center overflow-x-hidden px-4"
      >
        {[...product, ...product].map((item, index) => (
          <div
            key={`${item._id || item.name}-${index}`}
            className="w-72 flex-shrink-0 bg-white text-black p-4 mx-2 rounded-2xl transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover rounded-lg mb-4"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/288x144/cccccc/969696?text=Product+Image";
              }}
            />
            <h3 className="text-lg font-bold text-center">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600 line-clamp-3 text-sm mt-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestSneakers;
