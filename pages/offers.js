// mazeda-web/pages/offers.js
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

const log = 1 ? console.log : () => {};

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const OffersPage = () => {
  const { locale } = useRouter();
  const intl = useIntl();
  const offerTitle = intl.messages.component.offerTitle;
  const offerSubtitle = intl.messages.component.offerSubtitle;

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/offers?locale=${locale}&sort=offer_serial:asc&populate[0]=thumb_image`,
    )
      .then((res) => res.json())
      .then((json) => {
        log("🔵 offers:", json.data);
        setOffers(json.data || []);
      })
      .catch((err) => console.error("Error fetching offers:", err));
  }, [locale]);

  const isOfferExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                <Link href={`/offers/${offer.documentId}`} key={offer.id}>
                  <div className="rounded-t-2xl rounded-2xl shadow-xl bg-white hover:shadow-2xl relative transition duration-300 ease-in-out transform hover:-translate-y-1">
                    {isOfferExpired(offer.expiry_date) && (
                      <div className="absolute inset-0 bg-white/50  z-10 rounded-2xl" />
                    )}
                    <div className="relative w-full h-64">
                      <Image
                        src={getMediaUrl(offer.thumb_image?.url)}
                        alt={offer.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                      />
                      {isOfferExpired(offer.expiry_date) && (
                        <div className="absolute top-0 left-0 right-0 bg_green text-white text-center py-2 rounded-t-2xl z-20">
                          This offer has expired on{" "}
                          {formatDate(offer.expiry_date)}
                        </div>
                      )}
                    </div>

                    <div className="pad_akm relative">
                      <div className="mb-1">
                        <p className="subheading_akm line-clamp-2">
                          {offer.title}
                        </p>
                      </div>

                      <div className="mt-1 mb-3 text-justify line-clamp-5">
                        {offer.excerpt}
                      </div>

                      <div>
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
