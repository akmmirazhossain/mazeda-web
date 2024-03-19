import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseSignal,
  faBriefcase,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import theme from "../../config/theme";
import AnimatedSection from "./animejs/AnimatedSection";

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
  const slideRef = AnimatedSection();
  return (
    <section className="section_akm slideContainer" ref={slideRef}>
      <div className="heading_akm content">Our Services</div>

      <div className="grid gap_akm sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-between box_round_shadow "
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
