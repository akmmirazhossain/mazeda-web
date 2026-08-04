// pages/index.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import ServicesSection from "./components/ServicesSection";
import LinksSection from "./components/LinksSection";
import PackagesSection from "./components/PackagesSection";
import ClientsSection from "./components/ClientsSection";
import Footer from "./components/Footer";
import Modal from "./components/offerModal";
import Head from "next/head";
import dynamic from "next/dynamic";
const HeroSectionDesktop = dynamic(
  () => import("./components/HeroSectionDesktop"),
  {
    ssr: false,
  },
);
const HeroSectionMobile = dynamic(
  () => import("./components/HeroSectionMobile"),
  {
    ssr: false,
  },
);

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Automatically open the modal when the component mounts
    openModal();
  }, []);

  return (
    <>
      <Head>
        <title>
          Mazeda Networks — Fast Fiber Internet in Dhaka & Bangladesh
        </title>

        {/* SEO */}
        <meta
          name="description"
          content="Mazeda Networks offers high-speed fiber optic internet for homes and businesses in Dhaka. 4K streaming, low-latency gaming, 24x7 support, and doorstep service."
        />

        {/* OG - Facebook, WhatsApp, LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mazeda Networks" />
        <meta property="og:url" content="https://www.mazeda.net" />
        <meta
          property="og:title"
          content="Mazeda Networks — Fast Fiber Internet in Dhaka"
        />
        <meta
          property="og:description"
          content="High-speed fiber optic internet for homes and businesses in Dhaka. 4K streaming, gaming cache, 24x7 support, and doorstep service."
        />
        <meta
          property="og:image"
          content="https://www.mazeda.net/images/connect-in-1-hour.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mazeda Networks - Fast Fiber Internet in Bangladesh!"
        />
        <meta
          name="twitter:description"
          content="High-speed fiber optic internet for homes and businesses in Dhaka. 4K streaming, gaming cache, 24x7 support, and doorstep service."
        />
        <meta
          name="twitter:image"
          content="https://www.mazeda.net/images/connect-in-1-hour.png"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://www.mazeda.net" />
      </Head>
      <main>
        <Navbar />
        {isMobile === null ? (
          <div className="h-[600px] w-full" />
        ) : isMobile ? (
          <HeroSectionMobile />
        ) : (
          <HeroSectionDesktop />
        )}

        <div className="container_akm custom-utility">
          <ServicesSection />
        </div>
        <div className="container_akm">
          <LinksSection />
        </div>
        <div className="container_akm">
          <PackagesSection />
        </div>
        <div className="container_akm">
          <ClientsSection />
        </div>

        <Footer />

        {/* Modal Component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </>
  );
}

export default Home;
