import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { imgUrl } from "../config/config";
import { useApi } from "../lib/ApiContext";
import { useIntl } from "react-intl";
import { Skeleton } from "@nextui-org/react";

const AboutPage = () => {
  const { apiBaseUrl } = useApi();
  const [aboutInfo, setAboutInfo] = useState([]);
  const intl = useIntl();
  const title = intl.messages.component.about.title;
  const mission = intl.messages.component.about.mission;
  const vision = intl.messages.component.about.vision;
  const partner = intl.messages.component.about.partner;

  useEffect(() => {
    fetch(`${apiBaseUrl}/about.php`)
      .then((response) => response.json())
      .then((data) => {
        setAboutInfo(data);
        if (data.length > 0) {
          console.log("🚀 ~ AboutPage ~ bannerimg:", data[0].bannerimg);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiBaseUrl]);

  if (aboutInfo.length === 0) {
    return (
      <>
        <Head>
          <title>About Us</title>
        </Head>
        <main>
          <Navbar />

          <Skeleton className="banner_bg">
            <h1 className="banner_title text_shadow_black">{title}</h1>
          </Skeleton>

          <div className="container_akm ">
            <section className="page_body">
              <div className="grid grid-cols-1 md:grid-cols-6 gap_akm ">
                <Skeleton className="col-span-2 text-center pad_akm box_round_shadow min-h-96 max-h-[600px] hidden md:block"></Skeleton>

                <div className="col-span-4 sm:mt-0 text-center sm:text-left">
                  <Skeleton className="box_round_shadow"></Skeleton>

                  <div className="grid grid-col-1 md:grid-col-2 mt_akm">
                    <Skeleton className="mb_akm box_round_shadow">
                      <h1 className="subheading_akm mb_akm pb-1 border-b">
                        {mission}
                      </h1>

                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: aboutData.vision,
                        }}
                      ></p> */}
                    </Skeleton>

                    <Skeleton className="mb_akm box_round_shadow">
                      <h1 className="subheading_akm mb_akm pb-1 border-b">
                        {vision}
                      </h1>
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: aboutData.vision,
                        }}
                      ></p> */}
                    </Skeleton>

                    <Skeleton className="mb_akm box_round_shadow">
                      <h1 className="subheading_akm mb_akm pb-1 border-b">
                        {partner}
                      </h1>
                      <Skeleton className="grid grid-cols-2 md:grid-cols-4 gap_akm ">
                        {/* {aboutData.partners.map((partner, index) => (
                          <img
                            key={index}
                            src={`${imgUrl}${partner}`}
                            alt={`Partner ${index}`}
                            className="rounded-2xl border shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)] py-4 px-2"
                          />
                        ))} */}
                      </Skeleton>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  const aboutData = aboutInfo[0];

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
            backgroundImage: `url(${imgUrl}${aboutData.bannerimg})`,
          }}
        >
          <h1 className="banner_title text_shadow_black">{title}</h1>
        </div>

        <div className="container_akm ">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-6 gap_akm ">
              <div
                className="col-span-2 text-center pad_akm box_round_shadow min-h-48 max-h-[600px] hidden md:block"
                style={{
                  backgroundImage: `url(${imgUrl}${aboutData.sideimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="col-span-4 sm:mt-0 text-center sm:text-left">
                <div className="box_round_shadow">
                  <p
                    className="text-lg leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{
                      __html: aboutData.description,
                    }}
                  ></p>
                </div>

                <div className="grid grid-col-1 md:grid-col-2 mt_akm">
                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      {mission}
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: aboutData.mission,
                      }}
                    ></p>
                  </div>

                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      {vision}
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: aboutData.vision,
                      }}
                    ></p>
                  </div>

                  <div className="mb_akm box_round_shadow">
                    <h1 className="subheading_akm mb_akm pb-1 border-b">
                      {partner}
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap_akm ">
                      {aboutData.partners.map((partner, index) => (
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
