import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const Support = () => {
  const { locale } = useRouter();
  const [support, setSupport] = useState(null);

  const faqTitle = locale === "bn" ? "জনপ্রিয় জিজ্ঞাসা" : "Popular Inquiries";
  const workflowTitle =
    locale === "bn" ? "সাপোর্ট ওয়ার্কফ্লো" : "Support Workflow";
  const diagramTitle =
    locale === "bn" ? "নেটওয়ার্ক ডায়াগ্রাম" : "Network Diagram";

  useEffect(() => {
    const url =
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/support?locale=${locale}` +
      `&populate[0]=phone_number_block.block_image` +
      `&populate[1]=page_banner` +
      `&populate[2]=side_image` +
      `&populate[3]=support_faq` +
      `&populate[4]=support_workflow` +
      `&populate[5]=home_network_diagram`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setSupport(json.data || null))
      .catch((err) => console.error("Error fetching support:", err));
  }, [locale]);

  if (!support) {
    return (
      <main>
        <Navbar />
      </main>
    );
  }

  const bannerStyle = {
    backgroundImage: support.page_banner?.url
      ? "url(" + getMediaUrl(support.page_banner.url) + ")"
      : "url('/images/call-center-banner.webp')",
  };

  return (
    <React.Fragment>
      <Head>
        <title>Support</title>
        <meta
          name="description"
          content="Experience the reliability of Mazeda Networks support team."
        />
      </Head>

      <main>
        <Navbar />

        <div className="banner_bg" style={bannerStyle}>
          <h1 className="banner_title text_shadow_black">
            {support.page_title}
          </h1>
          <p className="banner_subtitle text_shadow_black">
            {support.page_subtitle}
          </p>
        </div>

        <div className="container_akm">
          <section className="page_body">
            <div className="flex flex-col sm:flex-row gap_akm">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 box_round_shadow hidden sm:block">
                {support.side_image?.url ? (
                  <Image
                    src={getMediaUrl(support.side_image.url)}
                    alt={support.page_title || "Support"}
                    width={800}
                    height={1067}
                    className="rounded-2xl"
                  />
                ) : (
                  <img
                    src="/images/server-man.jpg"
                    alt=""
                    className="rounded-2xl"
                  />
                )}
              </div>

              <div className="sm:w-2/3 sm:pl-8 sm:py-8 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="container mx-auto">
                  {support.phone_number_block &&
                    support.phone_number_block.length > 0 && (
                      <div className="mb_akm grid grid-cols-2 lg:grid-cols-4 gap_akm">
                        {support.phone_number_block.map((block, i) => (
                          <div
                            key={i}
                            className="text-center border pad_akm_sm rounded-2xl shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)]"
                          >
                            <p className="font-bold body_text_akm">
                              {block.block_title}
                            </p>
                            {block.block_image && block.block_image.url && (
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
                                href={"tel:" + block.block_phone_number}
                                className="font-bold body_text_akm"
                              >
                                {block.block_phone_number}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                  {support.support_faq && support.support_faq.length > 0 && (
                    <div id="faqSection" className="mt-10 pt_akm border-t">
                      <div className="mb-2">
                        <p className="subheading_akm">{faqTitle}</p>
                      </div>
                      {support.support_faq.map((item, index) => (
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
                  )}

                  {support.support_workflow && support.support_workflow.url && (
                    <div className="mt-10 pt_akm border-t">
                      <div className="mb-2">
                        <p className="subheading_akm">{workflowTitle}</p>
                      </div>
                      <div>
                        <Image
                          src={getMediaUrl(support.support_workflow.url)}
                          alt="Support Workflow"
                          width={1200}
                          height={600}
                          className="rounded-2xl"
                        />
                      </div>
                    </div>
                  )}

                  {support.home_network_diagram &&
                    support.home_network_diagram.url && (
                      <div className="mt-10 pt_akm border-t">
                        <div className="mb-2">
                          <p className="subheading_akm">{diagramTitle}</p>
                        </div>
                        <div>
                          <Image
                            src={getMediaUrl(support.home_network_diagram.url)}
                            alt="Home Network Diagram"
                            width={1200}
                            height={600}
                            className="rounded-2xl"
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </React.Fragment>
  );
};

export default Support;
