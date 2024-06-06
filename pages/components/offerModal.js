// components/Modal.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Modal = ({ isOpen, onClose }) => {
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
      // Fetch data from the API
      fetch("https://apis.mazedanetworks.net/apis/offers.php")
        .then((response) => response.json())
        .then((data) => {
          // Find the first offer that is featured
          const featured = data.find((offer) => offer.offer_featured === "yes");
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
  }, [isOpen, onClose]);

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
        <Link
          href={`https://mazedanetworks.net/offers/${featuredOffer.offer_link}`}
          target="_blank"
        >
          <div className="modal-content">
            <h2 className="text-2xl mt-6 mx-6 mb-4 font-bold ">
              {featuredOffer.offer_title}
            </h2>
            <div
              className="mb-6  mx-6"
              dangerouslySetInnerHTML={{
                __html: `${featuredOffer.offer_subtitle} <a href='https://mazedanetworks.net/offers/${featuredOffer.offer_link}' target='_blank' rel='noopener noreferrer' class='text-blue-500 hover:underline'>Read more...</a>`,
              }}
            />

            <img
              className="rounded-b-2xl"
              src={`https://apis.mazedanetworks.net/web_files/${featuredOffer.offer_thumbImg}`}
              alt={featuredOffer.offer_title}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
