import React from "react";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <main>
        <Navbar />
        <div className="text-center pb-4 bg-[url('/images/about-us.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-[400px] flex items-center justify-center  text-white ">
          <h1 className="heading_akm text_shadow_black">About Us</h1>
        </div>

        <div className="container_akm nav_space_akm">
          <AboutSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
