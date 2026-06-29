// mazeda-web/pages/contact.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const ContactPage = () => {
  const { locale } = useRouter();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact?locale=${locale}&populate[0]=phone_number_block.block_image&populate[1]=page_banner&populate[2]=side_image`,
    )
      .then((res) => res.json())
      .then((json) => setContact(json.data || null))
      .catch((err) => console.error("Error fetching contact:", err));
  }, [locale]);

  if (!contact) {
    return (
      <main>
        <Navbar />
      </main>
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
            backgroundImage: contact.page_banner?.url
              ? `url(${getMediaUrl(contact.page_banner.url)})`
              : `url('/images/contact-us5.jpg')`,
          }}
        >
          <h1 className="banner_title text_shadow_black">
            {contact.page_title}
          </h1>
          <p className="banner_subtitle text_shadow_black w-full lg:w-6/12">
            {contact.page_subtitle}
          </p>
        </div>

        <div className="container_akm">
          <section className="page_body">
            <div className="flex flex-col sm:flex-row gap_akm">
              {/* Side image — matches old sm:w-1/3 block */}
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                {contact.side_image?.url && (
                  <Image
                    src={getMediaUrl(contact.side_image.url)}
                    alt={contact.page_title || "Contact"}
                    width={800}
                    height={1067}
                    className="rounded-2xl"
                  />
                )}
              </div>

              {/* Main content — matches old sm:w-2/3 block */}
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="container mx-auto">
                  {/* Image blocks replace the old PhoneNumbers component */}
                  {contact.phone_number_block?.length > 0 && (
                    <div className="mb_akm grid grid-cols-2 lg:grid-cols-4 gap_akm">
                      {contact.phone_number_block.map((block, i) => (
                        <div
                          key={i}
                          className="text-center border pad_akm_sm rounded-2xl shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)]"
                        >
                          <p className="font-bold body_text_akm">
                            {block.block_title}
                          </p>
                          {block.block_image?.url && (
                            <Image
                              src={getMediaUrl(block.block_image.url)}
                              alt={block.block_title || ""}
                              width={120}
                              height={120}
                              className="p-6 mx-auto"
                            />
                          )}
                          {block.block_phone_number && (
                            <a
                              href={`tel:${block.block_phone_number}`}
                              className="font-bold body_text_akm"
                            >
                              {block.block_phone_number}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rich text replaces old dangerouslySetInnerHTML */}
                  {contact.page_content && (
                    <BlocksRenderer content={contact.page_content} />
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
