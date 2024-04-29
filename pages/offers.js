import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

const OffersPage = () => {
  return (
    <>
      <Head>
        <title>Offers</title>
      </Head>
      <main>
        <Navbar />

        <div className="container_akm nav_space_akm">
          <section className="section_akm">
            <div className="flex items-center justify-center flex-col text-center  bg-[url('/images/offers.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96  text-white px-6">
              <h1 className="heading_akm text_shadow_black">
                Exclusive Offers
              </h1>
              <p className="subheading_akm text_shadow_black w-full lg:w-6/12">
                Unlock exclusive deals and incentives as you get our internet
                connection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <img
                  src="/images/laptop-girl.jpg"
                  alt=""
                  className="rounded-2xl"
                />
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="">
                  <div className="mb-2">
                    <p className="subheading_akm border-b">Current Offers</p>
                  </div>
                  <div
                    className="grid grid-cols-1 lg:grid-cols-5 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: "url('/images/offers-bg.png')" }}
                  >
                    <div className="col-span-2 pt-2 flex items-center justify-center">
                      <img
                        src="/images/price-drop.png"
                        alt=""
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="col-span-3 flex flex-col items-center justify-center px-6 pb-8 sm:pb-0">
                      <p className="text-4xl font-semibold italic text-center tracking-tight">
                        Get 50% off on your connection charge with every new
                        connection.
                      </p>
                      <p className="font-semibold text-center">
                        (Call us now! 09613 334455)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default OffersPage;
