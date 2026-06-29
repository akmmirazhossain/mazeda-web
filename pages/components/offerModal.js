// mazeda-web/pages/components/offerModal.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const Modal = ({ isOpen, onClose }) => {
  const { locale } = useRouter();
  const [featuredOffer, setFeaturedOffer] = useState(null);

  // Function to handle setting the cookie
  const handleOnClose = () => {
    // Set a cookie with a 72-hour expiration
    Cookies.set("MazedaModalClosed", "true", { expires: 3 });
    onClose();
  };

  useEffect(() => {
    // Check if the modalClosed cookie is set
    const modalClosed = Cookies.get("MazedaModalClosed");
    if (modalClosed) {
      onClose(); // Close the modal if the cookie is set
      return;
    }

    if (isOpen) {
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/offers?locale=${locale}&filters[is_featured][$eq]=true&populate[0]=thumb_image&pagination[limit]=1`,
      )
        .then((response) => response.json())
        .then((json) => {
          const featured = json.data?.[0];

          if (featured) {
            setFeaturedOffer(featured);
          } else {
            onClose();
          }
        })
        .catch((error) => {
          console.error("Error fetching the offers:", error);
          onClose();
        });
    }
  }, [isOpen, onClose, locale]);

  if (!isOpen || !featuredOffer) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOnClose}
    >
      <div
        className="bg-white p-0 rounded-2xl shadow-lg relative max-w-sm md:max-w-md "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-0 text-gray-600 text-3xl  w-10"
          onClick={handleOnClose}
        >
          &times;
        </button>
        <Link href={`/offers/${featuredOffer.slug}`}>
          <div className="modal-content">
            <h2 className="text-2xl mt-6 mx-6 mb-4 font-bold ">
              {featuredOffer.title}
            </h2>
            <div className="mb-6 mx-6">
              {featuredOffer.excerpt}{" "}
              <span className="text-blue-500 hover:underline">
                Read more...
              </span>
            </div>

            <img
              className="rounded-b-2xl"
              src={getMediaUrl(featuredOffer.thumb_image?.url)}
              alt={featuredOffer.title}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
