import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CoverageBlocks from "./components/CoverageBlocks";
import Head from "next/head";

const CoveragePage = () => {
  return (
    <>
      <Head>
        <title>Coverage</title>
        <meta
          name="description"
          content="Discover Mazeda Networks' internet coverage areas in Dhaka, Gazipur, and Tangail. We currently provide reliable internet services in Dhanmondi, Uttara, Banani, Bashundhara, Mohammadpur, Nobodoy Housing Society, Salimullah Road, Chawk Bazar, Panthapath, Malibagh, Mirpur, Matikata, Rupnagar, Hazaribag, Khilgaon, Kallyanpur, Kamrangirchor, Ati Bazar, Rayer Bazar, Khilkhet, Jigatola, Bosila, Green Road Area, North Balur-Chor, Kolatia, Elephant Road, and more. Stay tuned as we expand to cover Aftab Nagar, Agargaon, Anondo Police Housing Society, Armanitola, Azampur, Azimpur, Bailey Road, Banani DOHS, Banasree, Bangabazar, Bangla Bazar, Baridhara, Baridhara DOHS, Basabo, Bashundhara Residential Area, Begun Bari, Birulia, Chandni Chowk, Chowk Bazaar, Chowkbazar Thana, Dholaikhal, Diabari, East Nakhalpara, Farashganj, Farmgate, Hatirpool, House Building in Uttara, Jhilmil Residential Area, Jolshiri Abashon, Kakrail, Kallyanpur, Kamalapur, Kawran Bazar, Lalbagh Thana, Lalmatia, Maghbazar, Matuail, Mohakhali, Mohakhali DOHS, Nakhalpara, Narinda, Nazirabazar, New Eskaton, New Market, New Paltan, Niketan, Nilkhet, Panthapath, Paribagh, Pilkhana, Rajarbagh, Rayer Bazaar, Rupayan City, Savar DOHS, Segunbagicha, Shahbag, Shahjadpur, Shankhari Bazaar, Shantinagar, Solmaid, Tejturi Bazar, Tikatuli, Uttara, and West Rajabazar."
        />
      </Head>
      <main>
        <Navbar />
        <div className="flex items-center justify-center flex-col text-center   bg-[url('/images/coverage-page.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96  text-white ">
          <h1 className="heading_akm text_shadow_black">Our coverage</h1>
          <p className="subheading_akm text_shadow_black">
            Our network grows daily, so stay tuned for updates here.
          </p>
        </div>
        <div className="container_akm nav_space_akm min-h-screen">
          <div>
            <CoverageBlocks />
          </div>
          <div></div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default CoveragePage;
