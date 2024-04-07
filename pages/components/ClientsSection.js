import Image from "next/image";
import clientLogos from "../../public/data/clientLogos.json";

const ClientsSection = () => {
  return (
    <section className="section_akm">
      <div className="heading_akm">Our Successful Clients</div>
      <div className="grid grid-cols-2  lg:grid-cols-5 gap_akm pad_akm box_round_shadow">
        {" "}
        {clientLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center p-4 justify-center h-full "
          >
            <img alt="" src={logo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
