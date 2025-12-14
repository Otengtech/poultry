import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button only when user has scrolled down at least 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {visible && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-16 ml-3 right-6 bg-lime-400 text-gray-700 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl z-40"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
