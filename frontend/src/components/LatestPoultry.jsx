import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LatestSneakers = () => {
  const sliderRef = useRef(null);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-product`);
        setProducts(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // RIGHT → LEFT infinite sliding
  useEffect(() => {
    if (loading || product.length === 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let position = 0;
    const speed = 0.7; // adjust speed here

    const animate = () => {
      position -= speed;
      const width = slider.scrollWidth / 2;

      if (Math.abs(position) >= width) {
        position = 0;
      }

      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [product, loading]);

  return (
    <section className="py-14 overflow-hidden">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
        Our Top Products
      </h2>

      {/* Viewport */}
      <div className="w-full overflow-hidden">
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="flex gap-4 w-max"
        >
          {[...product, ...product].map((item, index) => (
            <div
              key={`${item._id || item.name}-${index}`}
              className="
                w-72 flex-shrink-0
                bg-white text-black
                p-4 rounded-2xl
                transition-transform duration-300
                hover:scale-105
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/288x144/cccccc/969696?text=Product+Image";
                }}
              />

              <h3 className="text-lg font-bold text-center">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-gray-600 line-clamp-3 text-sm mt-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestSneakers;
