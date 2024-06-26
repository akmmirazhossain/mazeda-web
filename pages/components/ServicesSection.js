import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseSignal,
  faBriefcase,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useIntl } from "react-intl";

const Services = () => {
  const intl = useIntl();
  const servicesTitle = intl.messages.component.servicesTitle;
  const servicesData = intl.messages.component.services;
  return (
    <section className="page_body">
      <div className="heading_akm content">{servicesTitle}</div>

      <div className="grid gap_akm sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-between box_round_shadow "
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full deep_red_radial_gradient">
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
              <h6 className="subheading_akm  ">{service.title}</h6>
              <p className="body_text_akm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
