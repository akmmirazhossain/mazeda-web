import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseSignal,
  faBriefcase,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import servicesData from "../../public/data/servicesData.json";

const Services = () => {
  return (
    <section className="section_akm">
      <div className="heading_akm content">Our Services</div>

      <div className="grid gap_akm sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-between box_round_shadow "
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#e6242d]">
                <FontAwesomeIcon
                  className="text-2xl text-white"
                  icon={
                    service.icon === "faHouseSignal"
                      ? faHouseSignal
                      : service.icon === "faBriefcase"
                      ? faBriefcase
                      : faVideo
                  }
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
