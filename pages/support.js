// pages/about.js
import React from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const Support = () => {
  const faqContent = [
    {
      question: "If I experience slow internet, what steps should I take?",
      answer:
        "i) Reboot the WiFi router, ii) Attempt to use the internet in close proximity to the router. If you continue to experience slow internet, please reach out to our support hotline.",
    },
    {
      question:
        "If I shift to a different location, will I need to pay the new connection fee again?",
      answer:
        "If the new residence is within proximity to our closest fiber optic hub, no further payments will be required. However, if it's too distant, there may be additional charges for the extra fiber optic cable.",
    },
    {
      question:
        "Upon activating an internet connection, does the support team offer free support for setting up WiFi router?",
      answer:
        "Yes, we provide free-of-charge router configuration services for any model upon each new connection.",
    },

    {
      question:
        "If I decide to relocate my router, ONU, or cables to another room, what do I need to do?",
      answer:
        "In this case our support team will be able to help, there could be a basic charge for initial adjustments, with costs for changes like wire length or drilling to be determined after gathering all necessary information.",
    },

    // Add more objects here for additional FAQs
  ];
  return (
    <main>
      <Navbar />

      <div className="container_akm nav_space_akm">
        <section className="section_akm">
          <div className="text-center pb_akm">
            <h1 className="heading_akm">Support</h1>
            <p className="subheading_akm ">
              Guiding your internet journey, expert support at your fingertips
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap_akm">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow">
              <img alt="" src="/images/lineman.webp" className="rounded-2xl" />
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <div className="container mx-auto ">
                <PhoneNumbers />
              </div>
              <div className="mt-10 pt_akm border-t">
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
                  <img
                    alt=""
                    src="/images/support-workflow.png"
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <div className="mt-10 pt_akm border-t">
                <div className="mb-2">
                  <p className="subheading_akm">Home Network Diagram</p>
                </div>
                <div>
                  <img
                    alt=""
                    src="/images/home-network-diagram.png"
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
  );
};

export default Support;
