import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { apiUrl, imgUrl } from "../config/config";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/contact.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setContactInfo(data[0]); // Assuming there's only one contact entry in the response
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchData();
  }, []);

  if (!contactInfo) {
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
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Mazeda Networks' dedicated support team for any inquiries, assistance, or feedback. Contact us via phone, email, or visit our office to experience unparalleled customer service and resolve any queries swiftly."
        />
      </Head>
      <main className="h-screen">
        <ScrollBar>
          <Navbar />
          <div
            className="banner_bg"
            style={{
              backgroundImage: `url(${imgUrl}${contactInfo.contact_bannerimg})`,
            }}
          >
            <h1 className="banner_title text_shadow_black">
              {contactInfo.contact_title}
            </h1>
            <p className="banner_subtitle text_shadow_black w-full lg:w-6/12">
              {contactInfo.contact_subtitle}
            </p>
          </div>

          <div className="container_akm ">
            <section className="page_body">
              <div className="flex flex-col sm:flex-row gap_akm">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                  <Image
                    src={`${imgUrl}${contactInfo.contact_sideimg}`}
                    alt={contactInfo.contact_title}
                    width={800}
                    height={1067}
                    className="rounded-2xl"
                  />
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className="container mx-auto">
                    <div className="mb_akm">
                      <PhoneNumbers />
                    </div>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: contactInfo.contact_content,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </ScrollBar>
      </main>
    </>
  );
};

export default ContactPage;
