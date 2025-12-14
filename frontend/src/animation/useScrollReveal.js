import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");

          // Reset will-change after animation completes
          const removeWillChange = () => {
            el.style.willChange = "auto";
            el.removeEventListener("transitionend", removeWillChange);
          };
          el.addEventListener("transitionend", removeWillChange);
        } else {
          // Always remove so it can animate again on re-entry
          el.classList.remove("visible");
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return elementRef;
}
