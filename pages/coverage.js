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
      </Head>
      <main>
        <Navbar />

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
