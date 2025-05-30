// pages/index.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import LinksSection from "./components/LinksSection";
import PackagesSection from "./components/PackagesSection";
import ClientsSection from "./components/ClientsSection";
import Footer from "./components/Footer";
import Modal from "./components/offerModal";
import Head from "next/head";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Automatically open the modal when the component mounts
    openModal();
  }, []);

  return (
    <>
      <Head>
        <title>Mazeda Networks</title>
        <meta
          name="description"
          content="Discover the fastest internet service provider in Dhaka and Bangladesh, offering home internet, corporate internet, SME internet, and broadband internet solutions. Experience reliable network security and data connectivity with our fiber optic connection. Explore dedicated server hosting options for optimal performance. Enjoy bufferless streaming on 4K platforms like YouTube, Facebook, and Netflix. Benefit from gaming cache and 100 Mbps BDIX and other BD NIX speeds. Our home packages feature a 1:8 contention ratio for seamless browsing. Plus, access 24x7 call support and doorstep assistance from 9 am to 10 pm. Choose us for unparalleled speed, reliability, and support."
        />
      </Head>
      <main>
        <Navbar />
        <HeroSection />

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
