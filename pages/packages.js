import React from "react";
import PackagesSection from "./components/PackagesSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const PackagesPage = () => {
  return (
    <>
      <Head>
        <title>Packages</title>
        <meta
          name="description"
          content="Explore Mazeda Networks' range of internet packages designed to meet your connectivity needs. Choose from our Basic, Standard, Power, and Corporate plans, each offering a tailored experience to suit your requirements. Our Basic plans start at just ৳500/month, providing speeds from 7 Mbps to 20 Mbps with features like fiber optic connection, 24x7 call center support, and bufferless cached content. Upgrade to our Standard plans for speeds up to 60 Mbps, or opt for Power plans offering bandwidth up to 110 Mbps. For businesses, our Corporate plans provide dedicated bandwidth, logistics setup, and priority support. Contact us for details on our other packages, including Startup, Professional, and Enterprise options. Join Mazeda Networks today for reliable internet and exceptional service!"
        />
      </Head>
      <main>
        <Navbar />

        <div className="relative text-center  bg-[url('/images/packages-banner.jpg')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-[400px] flex items-center justify-center text-white ">
          <h1 className="heading_akm -mb-8 text_shadow_black">
            Monthly Pricing
          </h1>
          {/* <div className="absolute bottom-0 right-0 lg:mr-3 xl:mr-16 mb-6 hidden lg:block">
            <div className="flex flex-col font-medium border text-white">
              <p className="text-lg inline-block  bg-opacity-80  py-1 px-6 transform tracking-wide  bg-gradient-to-b from-[#03738c] via-[#015a6e] to-[#03738c]">
                <FontAwesomeIcon icon={faBullhorn} /> Get connection within 1
                hour!
              </p>
            </div>
          </div> */}
        </div>

        <div className="container_akm nav_space_akm">
          <PackagesSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PackagesPage;
