import { useEffect, useRef } from "react";

function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start animation
          element.classList.add("scroll-visible");
        } else {
          // Reset animation when section leaves viewport
          element.classList.remove("scroll-visible");
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return elementRef;
}

export default useScrollReveal;