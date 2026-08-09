// mazeda-web/pages/offers/[offerLink].js
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";
import RichText from "../components/RichText";

const log = 0 ? console.log : () => {};

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const OfferDetailsPage = () => {
  const router = useRouter();
  const { offerLink } = router.query;
  const { locale } = router;
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (!offerLink) return;

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/offers/${offerLink}?locale=${locale}&populate[0]=banner_image`,
    )
      .then((res) => res.json())
      .then((json) => {
        setOffer(json.data || null);
      })
      .catch((err) => console.error("Error fetching offer:", err));
  }, [offerLink, locale]);

  const isOfferExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!offer) {
    return (
      <>
        <Head>
          <title>Offer</title>
        </Head>
        <main>
          <Navbar />
          <div className="container_akm nav_space_akm">
            <section className="page_body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
                <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                  <Skeleton className="subheading_akm border-b mb-3 h-8" />
                  <Skeleton className="relative w-full h-96" />
                  <Skeleton className="pt_akm italic h-6" />
                  <Skeleton className="pt_akm h-32" />
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{offer.title}</title>
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                {isOfferExpired(offer.expiry_date) && (
                  <div className="bg_green text-white p-4 rounded-t-lg mb-4 text-center">
                    <p className="text-lg font-semibold">
                      This Offer Has Expired
                    </p>
                    <p className="text-sm">
                      This offer expired on {formatDate(offer.expiry_date)}
                    </p>
                  </div>
                )}
                <h1 className="subheading_akm border-b mb-3">{offer.title}</h1>
                <div className="relative w-full h-96">
                  <Image
                    src={getMediaUrl(offer.banner_image?.url)}
                    alt={offer.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
                {offer.excerpt && (
                  <div className="pt_akm italic">{offer.excerpt}</div>
                )}
                <div className="pt_akm">
                  <RichText content={offer.body} />
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

export default OfferDetailsPage;
