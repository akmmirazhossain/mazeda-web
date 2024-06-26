// pages/about.js
import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useIntl } from "react-intl";

const Footer = () => {
  const intl = useIntl();
  const footerData = intl.messages.component.footerData;
  const footerSubtitle = intl.messages.component.footerSubtitle;
  return (
    <>
      <footer className="shadow-xl text_gray bg-white ">
        <div className="grid grid-col-1 md:grid-cols-11 section_akm   items-center   lg:items-start ">
          <div className="md:col-span-3 w-64  md:mx-0 my-6 md:my-0 mx-auto text-center justify-center md:text-left">
            <div className="grid place-items-center md:place-items-start">
              <Link href="/">
                <img alt="" src="/logo.webp" />
              </Link>
            </div>

            <p className="mt-2  text-sm">{footerSubtitle}</p>

            <div className="pt-2 text-sm">
              <FontAwesomeIcon icon={faHeadset} /> 09666 334455
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-8  md:grid-cols-4 px-8 md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            {footerData.map((section, index) => (
              <div key={index} className=" w-full px-4">
                <h2 className="title-font font-bold text_green tracking-widest text-sm mb-3">
                  {section.title}
                </h2>
                <nav className="list-none mb-10">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-1.5 lg:py-1">
                      <Link href={link.url} className=" hover:text_red ">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className=" border-t bg_green text-white">
          <div className="container  mx-auto max-w-7xl py-2 px-5 flex flex-wrap flex-col sm:flex-row items-center">
            <p className=" text-sm text-center sm:text-left">
              © 2024 Mazeda Networks Ltd.
            </p>

            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start ">
              <a
                href="https://www.facebook.com/mazedanetltd"
                target="_blank"
                className="border rounded-full p-1"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
