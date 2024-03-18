import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anime from "animejs/lib/anime.js";
import {
  faHouseSignal,
  faBriefcase,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: faHouseSignal,
    title: "Home Internet",
    description:
      "Elevate your home experience with high-speed internet at your fingertips.",
  },
  {
    icon: faBriefcase,
    title: "Corporate Internet",
    description:
      "Boost your business efficiency with our Corporate Internet: fast, secure, and reliable connectivity solutions.",
  },
  {
    icon: faVideo,
    title: "CCTV Solutions",
    description:
      "Securing peace of mind with our advanced CCTV solutions for comprehensive and reliable surveillance.",
  },
];

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.3, // Trigger animation when 50% of element is in view
  });

  useEffect(() => {
    if (inView) {
      // Trigger anime.js animation when element comes into view
      anime({
        targets: ".section_akm.animated", // Select only elements with the 'animated' class
        translateY: ["100%", 0],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutQuad", // You can adjust the easing function as needed
        delay: anime.stagger(100), // Add stagger for multiple elements
      });
    }
  }, [inView]);

  return (
    <section
      className="section_akm animated"
      ref={ref}
      style={{ opacity: 0 }} // Initially set opacity to 0
    >
      <div className="heading_akm">Our Services</div>

      <div className="grid gap_akm sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-between box_round_shadow " // Add the 'animated' class to control visibility
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#e6242d]">
                <FontAwesomeIcon
                  className="text-2xl text-white"
                  icon={service.icon}
                />
              </div>
              <h6 className="subheading_akm">{service.title}</h6>
              <p className="body_text_akm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
