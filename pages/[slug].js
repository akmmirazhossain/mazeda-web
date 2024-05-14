// pages/[slug].js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import mixedData from "../public/data/mixedData.json";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

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
      <main className="h-screen">
        <ScrollBar>
          <Navbar />
          <div className="container_akm nav_space_akm">
            <section className="page_body">
              {/* <div className="text-center ">
              <h1 className="heading_akm">{title}</h1>
            </div> */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
                <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="subheading_akm border-b mb-3">{title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* <div className="col-span-1 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <img
                  alt=""
                  src="/images/server-man.jpg"
                  className="rounded-2xl"
                />
              </div> */}
              </div>
            </section>
          </div>
          <Footer />
        </ScrollBar>
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
