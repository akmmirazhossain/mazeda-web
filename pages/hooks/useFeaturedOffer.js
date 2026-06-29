// mazeda-web/pages/hooks/useFeaturedOffer.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useFeaturedOffer = () => {
  const { locale } = useRouter();
  const [featuredOffer, setFeaturedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/offers?locale=${locale}&filters[is_featured][$eq]=true&populate[0]=thumb_image&pagination[limit]=1`,
        );
        const json = await response.json();
        setFeaturedOffer(json.data?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch offers", error);
      }
    };

    fetchOffers();
  }, [locale]);

  return featuredOffer;
};

export default useFeaturedOffer;
