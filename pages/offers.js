import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import Image from "next/image";
import Link from "next/link";

const OffersPage = () => {
  return (
    <>
      <main>
        <Navbar />

        <div className="container_akm nav_space_akm">
          <section className="section_akm">
            <div className="text-center pb_akm">
              <h1 className="heading_akm">Exclusive Offers</h1>
              <p className="subheading_akm ">
                Unlock exclusive deals and incentives as you get our internet
                connection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow">
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
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      <img
                        src="/images/price-drop.png"
                        alt=""
                        className="rounded-2xl"
                      />
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
