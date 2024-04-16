// pages/[slug].js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import mixedData from "../public/data/mixedData.json";

export default function InfoPage({ infoData }) {
  if (!infoData) {
    return (
      <>
        <main>
          <Navbar />
          <div className="container_akm nav_space_akm">
            <section className="section_akm">
              <div className="text-center pb_akm">
                <h1 className="heading_akm">Content Not Found</h1>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  const { title, content } = infoData;
  return (
    <>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="section_akm">
            <div className="text-center ">
              <h1 className="heading_akm">{title}</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <img
                  alt=""
                  src="/images/server-man.jpg"
                  className="rounded-2xl"
                />
              </div>
              <div
                className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const infoData = mixedData.mixedData.find((data) => data.url === slug);

  return {
    props: {
      infoData: infoData || null, // Pass null if data is not found
    },
  };
}
