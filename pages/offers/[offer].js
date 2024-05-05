// pages/[offer].js

import React from "react";
import { useRouter } from "next/router";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Head from "next/head";
import Image from "next/image";
import offersData from "../../public/data/offersData.json";

const OfferPage = () => {
  const router = useRouter();
  const { offer } = router.query;
  const selectedOffer = offersData.find((item) => item.link === `/${offer}`);

  console.log("Offer parameter:", selectedOffer);

  if (!selectedOffer) {
    return <></>;
  }

  return (
    <main>
      <Navbar />
      <div className="container_akm nav_space_akm">
        <section className="page_body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
            <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
              <h1 className="subheading_akm border-b mb-3">
                {selectedOffer.title}
              </h1>

              <div className="relative w-full h-96">
                <Image
                  src={selectedOffer.bannerImg}
                  alt={offer.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
              <div
                className="pt_akm  italic"
                dangerouslySetInnerHTML={{ __html: selectedOffer.subtitle }}
              ></div>
              <div
                className="pt_akm"
                dangerouslySetInnerHTML={{ __html: selectedOffer.content }}
              />
            </div>

            {/* <div className="col-span-1 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
              <img
                alt=""
                src="/images/server-man.jpg"
                className="rounded-2xl"
              />
            </div> */}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default OfferPage;
