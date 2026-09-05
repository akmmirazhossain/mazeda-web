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
      <footer className="bg-white shadow-xl text_gray ">
        <div className="grid items-center grid-col-1 md:grid-cols-11 section_akm lg:items-start ">
          <div className="justify-center w-64 mx-auto my-6 text-center md:col-span-3 md:mx-0 md:my-0 md:text-left">
            <div className="grid place-items-center md:place-items-start">
              <Link href="/">
                <img alt="" src="/logo.webp" />
              </Link>
            </div>

            <p className="mt-2 text-sm">{footerSubtitle}</p>

            <div className="pt-2 text-sm">
              <FontAwesomeIcon icon={faHeadset} />{" "}
              <a href="tel:09666334455" className="hover:underline">
                09666 334455
              </a>
              ,{" "}
              <a href="tel:09613334455" className="hover:underline">
                09613 334455
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 px-8 mt-10 -mb-10 text-center md:col-span-8 md:grid-cols-3 md:pl-20 md:mt-0 md:text-left">
            {footerData.map((section, index) => (
              <div key={index} className="w-full px-4 ">
                <h2 className="mb-3 text-sm font-bold tracking-widest title-font text_green">
                  {section.title}
                </h2>
                <nav className="mb-10 list-none">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-1.5 lg:py-1">
                      <Link href={link.url} className=" hover:text_red">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  {index === footerData.length - 1 && (
                    <li className="py-1.5 lg:py-1">
                      <a
                        href="https://www.facebook.com/mazedanetltd"
                        target="_blank"
                        className="inline-flex items-center justify-center p-1 border rounded-full hover:border-[#e6242d]"
                      >
                        <svg
                          fill="currentColor"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                    </li>
                  )}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="text-white border-t bg_green">
          <div className="container flex flex-col flex-wrap items-center px-5 py-2 mx-auto max-w-7xl sm:flex-row">
            <p className="text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Mazeda Networks Ltd.
            </p>

            <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start text-sm">
              <a
                href="https://epicodeit.com/"
                target="_blank"
                className="hover:underline"
              >
                Developed by EpicodeIT
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
