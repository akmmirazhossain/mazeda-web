// OffersPage.js
import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { apiUrl, imgUrl } from "../config/config";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/offers.php`);
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Offers</title>
      </Head>
      <main className="h-screen">
        <ScrollBar>
          <Navbar />

          <div className="banner_bg  bg-[url('/images/offers.webp')]">
            <h1 className="banner_title text_shadow_black">Exclusive Offers</h1>
            <p className="banner_subtitle text_shadow_black ">
              Unlock exclusive deals and incentives as you get our internet
              connection.
            </p>
          </div>

          <div className="container_akm ">
            <section className="page_body">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap_akm">
                {offers.map((offer) => (
                  <Link
                    href={`/offers/${offer.offer_link}`}
                    key={offer.offer_id}
                  >
                    <div className="rounded-t-2xl rounded-2xl shadow-xl bg-white  hover:shadow-2xl relative transition duration-300 ease-in-out transform hover:-translate-y-1">
                      <div className="relative w-full h-64">
                        <Image
                          src={`${imgUrl}${offer.offer_thumbImg}`}
                          alt={offer.offer_title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-2xl"
                        />
                      </div>

                      <div className="pad_akm">
                        <div className=" mb-1 ">
                          {" "}
                          <p className="subheading_akm line-clamp-2">
                            {offer.offer_title}
                          </p>
                        </div>

                        <div
                          className="mt-1 mb-3 text-justify line-clamp-5"
                          dangerouslySetInnerHTML={{
                            __html: offer.offer_subtitle,
                          }}
                        ></div>

                        <div className="">
                          {" "}
                          <p className="font-semibold text_green">
                            Read More...
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <Footer />
        </ScrollBar>
      </main>
    </>
  );
};

export default OffersPage;
