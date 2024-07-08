import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { apiUrl, imgUrl } from "../config/config";
import Cookies from "js-cookie";

const AboutPage = () => {
  const [aboutInfo, setAboutInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = Cookies.get("baseApi");
      try {
        const response = await fetch(`${apiUrl}/about.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setAboutInfo(data[0]); // Assuming there's only one about entry in the response
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  if (!aboutInfo) {
    return (
      <>
        <main>
          <Navbar />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <main>
        <Navbar />
        <div
          className="banner_bg"
          style={{
            backgroundImage: `url(${imgUrl}${aboutInfo.bannerimg})`,
          }}
        >
          <h1 className="banner_title text_shadow_black">About Us</h1>
        </div>

        <div className="container_akm ">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-6 gap_akm ">
              <div
                className="col-span-2 text-center pad_akm box_round_shadow min-h-48 max-h-[600px] hidden md:block"
                style={{
                  backgroundImage: `url(${imgUrl}${aboutInfo.sideimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="col-span-4     sm:mt-0 text-center sm:text-left">
                <div className="box_round_shadow">
                  <p
                    className="text-lg leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{
                      __html: aboutInfo.description,
                    }}
                  ></p>
                </div>

                <div className="grid grid-col-1 md:grid-col-2 mt_akm">
                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      Our Mission
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo.mission,
                      }}
                    ></p>
                  </div>

                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      Our Vision
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo.vision,
                      }}
                    ></p>
                  </div>

                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      Partnered With
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap_akm ">
                      {aboutInfo.partners.map((partner, index) => (
                        <img
                          key={index}
                          src={`${imgUrl}${partner}`}
                          alt={`Partner ${index}`}
                          className="rounded-2xl border shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)] py-4 px-2"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
