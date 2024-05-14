// pages/[offer].js
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Head from "next/head";
import Image from "next/image";
import { apiUrl, imgUrl } from "../../config/config";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const OfferPage = () => {
  const router = useRouter();
  const { offer } = router.query;
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await fetch(`${apiUrl}/offers.php`);
        const data = await response.json();
        const foundOffer = data.find((item) => item.offer_link === offer);
        setSelectedOffer(foundOffer);
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    };

    if (offer) {
      fetchOfferData();
    }
  }, [offer]);

  if (!selectedOffer) {
    return <div></div>;
  }

  return (
    <main className="h-screen">
      <ScrollBar>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                <h1 className="subheading_akm border-b mb-3">
                  {selectedOffer.offer_title}
                </h1>

                <div className="relative w-full h-96">
                  <Image
                    src={`${imgUrl}${selectedOffer.offer_bannerImg}`}
                    alt={selectedOffer.offer_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />

                  <Image
                    src={`${imgUrl}${selectedOffer.offer_thumbImg}`}
                    alt={offer.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl block md:hidden"
                  />
                </div>
                <div
                  className="pt_akm  italic"
                  dangerouslySetInnerHTML={{
                    __html: selectedOffer.offer_subtitle,
                  }}
                ></div>
                <div
                  className="pt_akm"
                  dangerouslySetInnerHTML={{
                    __html: selectedOffer.offer_content,
                  }}
                />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </ScrollBar>
    </main>
  );
};

export default OfferPage;
