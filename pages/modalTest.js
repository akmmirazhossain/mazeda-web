// pages/index.js
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import LinksSection from "./components/LinksSection";
import PackagesSection from "./components/PackagesSection";
import ClientsSection from "./components/ClientsSection";
import Footer from "./components/Footer";
import Head from "next/head";

function Home() {
  useEffect(() => {
    // Open the modal when the component mounts
    const modal = document.getElementById("hs-basic-modal");
    const backdrop = document.getElementById("modal-backdrop");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add(
        "hs-overlay-open:opacity-100",
        "hs-overlay-open:duration-500",
        "pointer-events-auto",
        "opacity-100"
      );
    }
    if (backdrop) {
      backdrop.classList.remove("hidden");
      backdrop.classList.add(
        "fixed",
        "inset-0",
        "bg-gray-900",
        "bg-opacity-50",
        "z-50"
      );
    }
  }, []);

  const closeModal = () => {
    const modal = document.getElementById("hs-basic-modal");
    const backdrop = document.getElementById("modal-backdrop");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove(
        "hs-overlay-open:opacity-100",
        "hs-overlay-open:duration-500",
        "pointer-events-auto",
        "opacity-100"
      );
    }
    if (backdrop) {
      backdrop.classList.add("hidden");
      backdrop.classList.remove(
        "fixed",
        "inset-0",
        "bg-gray-900",
        "bg-opacity-50",
        "z-50"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Mazeda Networks</title>
        <meta
          name="description"
          content="Discover the fastest internet service provider in Dhaka and Bangladesh, offering home internet, corporate internet, SME internet, and broadband internet solutions. Experience reliable network security and data connectivity with our fiber optic connection. Explore dedicated server hosting options for optimal performance. Enjoy bufferless streaming on 4K platforms like YouTube, Facebook, and Netflix. Benefit from gaming cache and 100 Mbps BDIX and other BD NIX speeds. Our home packages feature a 1:8 contention ratio for seamless browsing. Plus, access 24x7 call support and doorstep assistance from 9 am to 10 pm. Choose us for unparalleled speed, reliability, and support."
        />
      </Head>
      <main className="h-screen">
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

        {/* Modal HTML */}
        <div id="modal-backdrop" className="hidden" onClick={closeModal}></div>
        <div
          id="hs-basic-modal"
          className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
          onClick={closeModal}
        >
          <div
            className="sm:max-w-lg sm:w-full m-3 sm:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800">Modal title</h3>
                <button
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="mt-1 text-gray-800">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
