import Image from "next/image";
import { useIntl } from "react-intl";
import clientLogos from "../../public/data/clientLogos.json";

const ClientsSection = () => {
  const intl = useIntl();
  const clientSectionTitle = intl.messages.component.clientSectionTitle;
  return (
    <section className="page_body">
      <div className="heading_akm">{clientSectionTitle}</div>
      <div className="grid grid-cols-2  lg:grid-cols-5 gap_akm pad_akm box_round_shadow">
        {" "}
        {clientLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center p-4 justify-center h-full "
          >
            <img alt="" src={`/images/logos/${logo}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
