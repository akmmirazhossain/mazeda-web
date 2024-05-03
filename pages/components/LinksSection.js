import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

import linkData from "../../public/data/linksData.json";

const LinkSection = () => {
  return (
    <section className="section_akm ">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 text-center gap_akm">
        {linkData.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="box_round_shadow hover:shadow-2xl bg-white relative transition duration-300 ease-in-out transform hover:-translate-y-1">
              <img
                alt=""
                src={`/images/${item.image}`}
                className="mb-4 rounded-2xl w-full"
              />
              <h2 className="subheading_akm truncate">{item.count}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LinkSection;
