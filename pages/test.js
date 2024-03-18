import React, { useEffect } from "react";
import anime from "animejs/lib/anime.js";

const BottomToTopFlowAnimation = () => {
  useEffect(() => {
    anime({
      targets: ".flow-up",
      translateY: ["100%", 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad", // You can adjust the easing function as needed
      delay: anime.stagger(100), // Add stagger for multiple elements
    });
  }, []);

  return (
    <div className="container">
      <div className="flow-up">Element 1</div>
      <div className="flow-up">Element 2</div>
      <div className="flow-up">Element 3</div>
      {/* Add more elements as needed */}
    </div>
  );
};

export default BottomToTopFlowAnimation;
