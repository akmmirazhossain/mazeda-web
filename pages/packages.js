import React from "react";
import PackagesSection2 from "./components/PackagesSection2";
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

        <div className="banner_bg bg-[url('/images/packages-banner.jpg')] ">
          <h1 className="banner_title text_shadow_black">Monthly Pricing</h1>
        </div>

        <div className="container_akm ">
          <PackagesSection2 />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PackagesPage;
