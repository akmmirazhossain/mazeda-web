import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhoneNumbers from "./components/common/phone-numbers";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import contactData from "../public/data/contactData.json";

const ContactPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Set the JSON data to state
    setData(contactData);
  }, []);

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
        <div className="flex items-center  justify-center flex-col text-center  bg-[url('/images/call-center-banner.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-[450px]  text-white px-6">
          <h1 className="heading_akm text_shadow_black">
            {data && data.title}
          </h1>
          <p className="subheading_akm text_shadow_black w-full lg:w-6/12">
            {data && data.subtitle}
          </p>
        </div>

        <div className="container_akm nav_space_akm">
          <section className="section_akm">
            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                <img src={data && data.image} alt="" className="rounded-2xl" />
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="container mx-auto">
                  <div className="mb_akm">
                    <PhoneNumbers />
                  </div>
                  <p className="mb-6">
                    <span className="font-bold">Headquarters Address:</span>{" "}
                    {data && data.address} {data && data.email}
                  </p>
                  {/* Render Facebook Page link if available */}
                  {data && data.facebookPage && (
                    <p>
                      <span className="font-bold">Facebook Page: </span>{" "}
                      <Link target="_blank" href={data.facebookPage}>
                        facebook.com/mazedanetltd
                      </Link>
                    </p>
                  )}
                  {/* Render Facebook Group link if available */}
                  {data && data.facebookGroup && (
                    <p>
                      <span className="font-bold">Facebook Group: </span>{" "}
                      <Link target="_blank" href={data.facebookGroup}>
                        facebook.com/groups/mazedabdserver
                      </Link>
                    </p>
                  )}
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
