import { useEffect, useRef, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

const LatestSneakers = () => {
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);
  const widthRef = useRef(0);
  const isScrollingRef = useRef(true);
  const [product, setProducts] = useState([])

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-product`);
        setProducts(res.data.data);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  // Initialize scrolling after products are loaded
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
    <section className="py-14">
      <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
        Our Top Products
      </div>
      <div
        ref={scrollRef}
        className="flex w-fullitems-center justify-center overflow-x-auto no-scrollbar px-4"
        style={{ scrollBehavior: "auto", scrollSnapType: "none" }}
      >
        {/* Render products twice for seamless scrolling */}
        {[...product, ...product].map((item, index) => (
          <div
            key={`${item._id || item.name}-${index}`}
            className="w-72 flex-shrink-0 bg-white text-black p-4 mx-2 my-2 rounded-2xl transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/288x144/cccccc/969696?text=Product+Image";
              }}
            />
            <h3 className="text-lg font-bold text-center">{item.name}</h3>
            {item.description && (
            <p className="text-left text-gray-600 line-clamp-3 text-sm mt-2">
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