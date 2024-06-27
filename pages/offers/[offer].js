import React from "react";
import { useRouter } from "next/router";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Head from "next/head";
import Image from "next/image";
import { apiUrl, imgUrl } from "../../config/config";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const OfferPage = ({ selectedOffer }) => {
  const router = useRouter();
  const { offer } = router.query;

  if (!selectedOffer) {
    return <div></div>;
  }

  const shareUrl = `https://mazedanetworks.net/offers/${offer}`;
  const shareQuote = selectedOffer.offer_title;
  const shareImage = `${imgUrl}${selectedOffer.offer_bannerImg}`;

  return (
    <main>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={selectedOffer.offer_title} />
        <meta
          property="og:description"
          content={selectedOffer.offer_subtitle.replace(/<\/?[^>]+(>|$)/g, "")}
        />
        <meta property="og:image" content={shareImage} />
        <title>{selectedOffer.offer_title}</title>
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
                  fill
                  className="rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                  priority
                />
                <Image
                  src={`${imgUrl}${selectedOffer.offer_thumbImg}`}
                  alt={selectedOffer.offer_title}
                  fill
                  className="rounded-2xl block md:hidden object-cover"
                  sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                  priority
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

              <div className="flex items-center mt-4 p-4 text-center border w-full max-w-xs rounded-2xl mx-auto">
                <p className="font-bold">Share this offer:</p>
                <div className="flex justify-center">
                  <FacebookShareButton
                    className="mx-1"
                    url={shareUrl}
                    quote={shareQuote}
                  >
                    <FacebookIcon size={40} round={true} />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    className="mx-1"
                    url={shareUrl}
                    title={shareQuote}
                  >
                    <WhatsappIcon size={40} round={true} />
                  </WhatsappShareButton>
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
        </section>
      </div>
      <Footer />
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const { offer } = context.params;

  try {
    const response = await fetch(`${apiUrl}/offers.php`);
    const data = await response.json();
    const foundOffer = data.find((item) => item.offer_link === offer);

    return {
      props: {
        selectedOffer: foundOffer || null,
      },
    };
  } catch (error) {
    console.error("Error fetching offer data:", error);
    return {
      props: {
        selectedOffer: null,
      },
    };
  }
};

export default OfferPage;
