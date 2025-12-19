import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LatestSneakers = () => {
  const scrollRef = useRef(null);
  const [product, setProducts] = useState([]);

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

  return (
    <section className="py-14">
      <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
        Our Top Products
      </div>

      <div
        ref={scrollRef}
        className="
          flex gap-4 px-4
          overflow-x-auto scrollbar-hide md:scrollbar-thin
          scroll-smooth
        "
      >
        {product.map((item) => (
          <div
            key={item._id || item.name}
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
              className="w-full h-36 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/288x144/cccccc/969696?text=Product+Image";
              }}
            />

            <h3 className="text-lg font-bold text-center">
              {item.name}
            </h3>

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
