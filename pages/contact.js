import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { apiUrl, imgUrl } from "../config/config";
import Cookies from "js-cookie";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = Cookies.get("baseApi");
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
      <main>
        <Navbar />
        <div
          className="banner_bg"
          style={{
            backgroundImage: `url(${imgUrl}${contactInfo.contactBannerimg})`,
          }}
        >
          <h1 className="banner_title text_shadow_black">
            {contactInfo.contactTitle}
          </h1>
          <p className="banner_subtitle text_shadow_black w-full lg:w-6/12">
            {contactInfo.contactSubtitle}
          </p>
        </div>

        <div className="container_akm ">
          <section className="page_body">
            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <Image
                  src={`${imgUrl}${contactInfo.contactSideimg}`}
                  alt={contactInfo.contactTitle}
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
                      __html: contactInfo.contactContent,
                    }}
                  ></p>
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

export default ContactPage;
