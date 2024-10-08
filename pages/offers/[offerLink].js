// pages/offers/[offerLink].js
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl, imgUrl } from "../../config/config";
import { useApi } from "../../lib/ApiContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

const OfferDetailsPage = () => {
  const router = useRouter();
  const { offerLink } = router.query; // Fetch offerLink from the router
  const { apiBaseUrl } = useApi();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (offerLink) {
      fetch(`${apiBaseUrl}/offers.php?offerLink=${offerLink}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming data is an array, find the offer with offerLink === offerLink
          const foundOffer = data.find((item) => item.offerLink === offerLink);
          setOffer(foundOffer);
        })
        .catch((error) => console.error("Error fetching offer:", error));
    }
  }, [apiBaseUrl, offerLink]);

  const isOfferExpired = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate.split("-").reverse().join("-"));
    return today > expDate;
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!offer) {
    return;

    <>
      <Head>
        <title>{offer.offerTitle}</title>
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                <Skeleton className="subheading_akm border-b mb-3">
                  {offer.offerTitle}
                </Skeleton>
                <Skeleton className="relative w-full h-96"></Skeleton>
                <Skeleton className="pt_akm italic"></Skeleton>
                <Skeleton className="pt_akm" />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>;
  }

  return (
    <>
      <Head>
        <title>{offer.offerTitle}</title>
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                {isOfferExpired(offer.offerDateExpire) && (
                  <div className="bg_green text-white p-4 rounded-t-lg mb-4 text-center">
                    <p className="text-lg font-semibold">
                      This Offer Has Expired
                    </p>
                    <p className="text-sm">
                      This offer expired on {formatDate(offer.offerDateExpire)}
                    </p>
                  </div>
                )}
                <h1 className="subheading_akm border-b mb-3">
                  {offer.offerTitle}
                </h1>
                <div className="relative w-full h-96">
                  <Image
                    src={`${imgUrl}${offer.offerBannerImg}`}
                    alt={offer.offerTitle}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
                <div
                  className="pt_akm italic"
                  dangerouslySetInnerHTML={{
                    __html: offer.offerSubtitle,
                  }}
                ></div>
                <div
                  className="pt_akm"
                  dangerouslySetInnerHTML={{
                    __html: offer.offerContent,
                  }}
                />
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
