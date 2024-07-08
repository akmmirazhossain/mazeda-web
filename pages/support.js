// pages/about.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useIntl } from "react-intl";

import { apiUrl, imgUrl } from "../config/config";

const Support = () => {
  const [faqContent, setFaqContent] = useState([]);

  const intl = useIntl();
  const popularInquiries = intl.messages.component.supportPage.popularInquiries;
  const supportWorkflow = intl.messages.component.supportPage.supportWorkflow;
  const diagram = intl.messages.component.supportPage.diagram;
  const title = intl.messages.component.supportPage.title;
  const subtitle = intl.messages.component.supportPage.subtitle;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/faq.php`);
        const data = await response.json();
        setFaqContent(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);

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

        <div className="banner_bg bg-[url('/images/call-center-banner.webp')] ">
          <h1 className="banner_title text_shadow_black">{title}</h1>
          <p className="banner_subtitle text_shadow_black ">{subtitle}</p>
        </div>

        <div className="container_akm ">
          <section className="page_body">
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
                    <p className="subheading_akm">{popularInquiries}</p>
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
                    <p className="subheading_akm">{supportWorkflow}</p>
                  </div>
                  <div>
                    <img
                      alt=""
                      src="/images/support-workflow.png"
                      className="rounded-2xl"
                    />
                  </div>
                </div>
                <div className="mt-10 pt_akm border-t">
                  <div className="mb-2">
                    <p className="subheading_akm">{diagram}</p>
                  </div>
                  <div>
                    <img
                      alt=""
                      src="/images/support-workflow.png"
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
