// pages/[slug].js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { apiUrl, imgUrl } from "../config/config";

const Page = ({ infoData }) => {
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
    ); // Add a loading state if needed
  }

  return (
    <>
      <main className="">
        <Navbar />
        <div className="container_akm nav_space_akm min-h-[60vh]">
          <section className="page_body">
            {/* <div className="text-center ">
              <h1 className="heading_akm">{title}</h1>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="subheading_akm border-b mb-3">
                  {infoData.pageTitle}
                </h1>
                <div
                  dangerouslySetInnerHTML={{ __html: infoData.pageContent }}
                />
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
      </main>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const slug = params.slug;

  try {
    const response = await fetch(`${apiUrl}/pages.php`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const responseData = await response.json();

    const infoData = responseData.find((data) => data.pageUrl === slug);
    if (!infoData) return { notFound: true };

    return { props: { infoData } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
}

export default Page;
