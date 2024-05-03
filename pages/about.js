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
        <div className="banner_bg bg-[url('/images/about-us.webp')]">
          <h1 className="banner_title text_shadow_black">About Us</h1>
        </div>

        <div className="container_akm ">
          <AboutSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
