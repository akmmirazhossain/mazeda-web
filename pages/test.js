import React, { useEffect } from "react";
import anime from "animejs/lib/anime.js";

const AnimatedElements = () => {
  useEffect(() => {
    anime({
      targets: ".element-1",
      translateX: ["-100%", 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });

    anime({
      targets: ".element-2",
      translateY: ["100%", 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });

    anime({
      targets: ".element-3",
      translateX: ["100%", 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });
  }, []);

  const elements = ["Element 1", "Element 2", "Element 3"];

  return (
    <div className="container">
      {/* <div className="w-full h-96 bg-cyan-700"></div>
      <div className="w-full h-96 bg-red-700"></div> */}
      {elements.map((element, index) => (
        <div
          key={index}
          className={`element-${index + 1} p-4 rounded-lg bg-gray-200`}
          style={{ position: "relative" }}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

export default AnimatedElements;
