// pages/about.js
import React from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import supportData from "../public/data/supportData.json";
const Support = () => {
  const { faqContent, workflowImage, networkDiagramImage, subtitle, title } =
    supportData;

  return (
    <>
      <Head>
        <title>Support</title>
        <meta
          name="description"
          content="Experience the reliability of Mazeda Networks' support team, adept at swiftly resolving network issues and providing expert assistance. With their quick response and extensive experience, rest assured your internet connection is in capable hands."
        />
      </Head>

      <main>
        <Navbar />

        <div className="container_akm nav_space_akm">
          <section className="section_akm">
            <div className="flex items-center justify-center flex-col text-center pb-4 bg-[url('/images/call-center-banner.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96  text-white px-6">
              <h1 className="heading_akm text_shadow_black">{title}</h1>
              <p className="subheading_akm text_shadow_black w-full lg:w-6/12">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <img
                  alt=""
                  src="/images/server-man.jpg"
                  className="rounded-2xl"
                />
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="container mx-auto ">
                  <PhoneNumbers />
                </div>
                <div id="faqSection" className="mt-10 pt_akm border-t">
                  <div className="mb-2">
                    <p className="subheading_akm">Popular Inquiries</p>
                  </div>
                  {faqContent.map((item, index) => (
                    <div key={index} className="my-6">
                      <div className="flex items-start my-1">
                        <div>
                          <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <div>
                          <p className="body_text_akm text-left pl-2 font-semibold">
                            {item.question}
                          </p>
                        </div>
                      </div>
                      <div className="pl-6 text-left">{item.answer}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt_akm border-t">
                  <div className="mb-2">
                    <p className="subheading_akm">Support Workflow</p>
                  </div>
                  <div>
                    <img alt="" src={workflowImage} className="rounded-2xl" />
                  </div>
                </div>
                <div className="mt-10 pt_akm border-t">
                  <div className="mb-2">
                    <p className="subheading_akm">Home Network Diagram</p>
                  </div>
                  <div>
                    <img
                      alt=""
                      src={networkDiagramImage}
                      className="rounded-2xl"
                    />
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

export default Support;
