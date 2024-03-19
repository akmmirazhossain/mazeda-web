import { useEffect, useRef } from "react";

const AnimatedComponent = () => {
  const slideRef = useRef(null);

  useEffect(() => {
    const slideElement = slideRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          slideElement.classList.add("slide"); // Add CSS class with animation
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01, // Adjust as needed
      }
    );

    if (slideElement) {
      observer.observe(slideElement);
    }

    return () => {
      if (slideElement) {
        observer.unobserve(slideElement);
      }
    };
  }, []);

  return slideRef;
};

export default AnimatedComponent;
