// pages/index.js

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import LinksSection from "./components/LinksSection";
import PackagesSection from "./components/PackagesSection";
import PayBillSection from "./components/PayBillSection";
import PromotionsSection from "./components/PromotionsSection";
import StrengthSection from "./components/StrengthSection";
import ClientsSection from "./components/ClientsSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import theme from "../config/theme";

function Home() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
        <div className="container_akm ">
          <ServicesSection />
        </div>
        <div className="container_akm ">
          <LinksSection />
        </div>
        <div className="container_akm ">
          <PackagesSection />
        </div>
        <div className="container_akm ">
          {/* <PromotionsSection /> */}
          {/* <StrengthSection /> */}
          {/* <ContactForm /> */}
          <ClientsSection />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Home;
