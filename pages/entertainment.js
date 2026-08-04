import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";

const EntertainLinks = [
  {
    link: "http://172.22.22.101/home/list_files.php?link=data102.mazeda.net/s1d4/&parent=Latest%20Uploads&cat_name=Latest%20Week",
    imageSrc: "/images/old-ftp.svg",
    altText: "Old FTP",
  },
  {
    link: "http://172.22.22.100",
    imageSrc: "/images/new-ftp.webp",
    altText: "New FTP",
  },
  {
    link: "http://172.22.22.10:32400/",
    imageSrc: "/images/plex.webp",
    altText: "Plex Movies",
  },
];

const Entertainment = () => {
  return (
    <main>
      <Navbar />

      <div className="container_akm min-h-[80vh] nav_space_akm">
        <section className="section_akm">
          <div className="text-center pb-4">
            <h1 className="heading_akm">Entertainment</h1>
            <p className="subheading_akm ">
              Get 100 Mbps download speeds from these entertainment links.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {EntertainLinks.map((service, index) => (
              <div key={index} className=" box_round_shadow ">
                <Link
                  target="_blank"
                  href={service.link}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={service.imageSrc}
                    alt={service.altText}
                    width={64}
                    height={64}
                  />
                </Link>
                <div className="mt-4 text-center">
                  <h2 className="subheading_akm">{service.altText}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Entertainment;
