// hooks/useFeaturedOffer.js
import { useState, useEffect } from "react";

const useFeaturedOffer = () => {
  const [featuredOffer, setFeaturedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          "https://apis.mazedanetworks.net/apis/offers.php"
        );
        const offers = await response.json();
        const featured = offers.find((offer) => offer.offer_featured === "yes");
        setFeaturedOffer(featured);
      } catch (error) {
        console.error("Failed to fetch offers", error);
      }
    };

    fetchOffers();
  }, []);

  return featuredOffer;
};

export default useFeaturedOffer;
