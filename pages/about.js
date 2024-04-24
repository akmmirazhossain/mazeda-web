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

        <div className="container_akm nav_space_akm">
          <AboutSection />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
