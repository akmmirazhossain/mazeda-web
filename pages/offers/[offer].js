// pages/[offer].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Head from "next/head";
import Image from "next/image";
import { apiUrl, imgUrl } from "../../config/config";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const OfferPage = () => {
  const router = useRouter();
  const { offer } = router.query;
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await fetch(`${apiUrl}/offers.php`);
        const data = await response.json();
        const foundOffer = data.find((item) => item.offer_link === offer);
        setSelectedOffer(foundOffer);
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    };

    if (offer) {
      fetchOfferData();
    }
  }, [offer]);

  if (!selectedOffer) {
    return <div>Loading...</div>;
  }

  const shareUrl = `https://mazedanetworks.net/offers/${offer}`;
  const shareQuote = selectedOffer.offer_title;
  const shareImage = `${imgUrl}${selectedOffer.offer_bannerImg}`; // Assuming you want to share the banner image

  return (
    <main className="h-screen">
      <ScrollBar>
        <Head>
          <title>{selectedOffer.offer_title}</title>
          <meta property="og:title" content={selectedOffer.offer_title} />
          <meta
            property="og:description"
            content={selectedOffer.offer_subtitle.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          />
          <meta property="og:image" content={shareImage} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="website" />
        </Head>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                <h1 className="subheading_akm border-b mb-3">
                  {selectedOffer.offer_title}
                </h1>

                <div className="relative w-full h-96">
                  <Image
                    src={`${imgUrl}${selectedOffer.offer_bannerImg}`}
                    alt={selectedOffer.offer_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                  <Image
                    src={`${imgUrl}${selectedOffer.offer_thumbImg}`}
                    alt={selectedOffer.offer_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl block md:hidden"
                  />
                </div>

                <div
                  className="pt_akm italic"
                  dangerouslySetInnerHTML={{
                    __html: selectedOffer.offer_subtitle,
                  }}
                ></div>
                <div
                  className="pt_akm"
                  dangerouslySetInnerHTML={{
                    __html: selectedOffer.offer_content,
                  }}
                />

                <div className="flex items-center mt-6 p-4 text-center justify-between  border w-full max-w-xs rounded-2xl mx-auto">
                  <p className="font-bold ">Share this offer:</p>
                  <div className="flex justify-between ">
                    <div>
                      <FacebookShareButton
                        className="mx-1"
                        url={shareUrl}
                        quote={shareQuote}
                      >
                        <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>
                    </div>
                    <div>
                      <WhatsappShareButton
                        className="mx-1"
                        url={shareUrl}
                        title={shareQuote}
                      >
                        <WhatsappIcon size={40} round={true} />
                      </WhatsappShareButton>
                    </div>
                    <div>
                      <LinkedinShareButton
                        className="mx-1"
                        url={shareUrl}
                        title={shareQuote}
                      >
                        <LinkedinIcon size={40} round={true} />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </ScrollBar>
    </main>
  );
};

export default OfferPage;
