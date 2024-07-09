// OffersPage.js
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { apiUrl, imgUrl } from "../config/config";
import { useIntl } from "react-intl";
import { useApi } from "../lib/ApiContext";

const OffersPage = () => {
  const { apiBaseUrl } = useApi();
  const intl = useIntl();
  const offerTitle = intl.messages.component.offerTitle;
  const offerSubtitle = intl.messages.component.offerSubtitle;

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/offers.php`)
      .then((response) => response.json())
      .then((data) => {
        setOffers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiBaseUrl]);

  return (
    <>
      <Head>
        <title>Offers</title>
      </Head>
      <main>
        <Navbar />

        <div className="banner_bg  bg-[url('/images/offers.webp')]">
          <h1 className="banner_title text_shadow_black">{offerTitle}</h1>
          <p className="banner_subtitle text_shadow_black ">{offerSubtitle}</p>
        </div>

        <div className="container_akm ">
          <section className="page_body">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap_akm">
              {offers.map((offer) => (
                <Link href={`/offers/${offer.offerLink}`} key={offer.offerId}>
                  <div className="rounded-t-2xl rounded-2xl shadow-xl bg-white  hover:shadow-2xl relative transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="relative w-full h-64">
                      <Image
                        src={`${imgUrl}${offer.offerThumbImg}`}
                        alt={offer.offerTitle}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                      />
                    </div>

                    <div className="pad_akm">
                      <div className=" mb-1 ">
                        {" "}
                        <p className="subheading_akm line-clamp-2">
                          {offer.offerTitle}
                        </p>
                      </div>

                      <div
                        className="mt-1 mb-3 text-justify line-clamp-5"
                        dangerouslySetInnerHTML={{
                          __html: offer.offerSubtitle,
                        }}
                      ></div>

                      <div className="">
                        {" "}
                        <p className="font-semibold text_green">Read More...</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default OffersPage;
