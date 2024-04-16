// pages/about.js
import React from "react";
import Link from "next/link";
import footerData from "../../public/data/footerData.json";

const Footer = () => {
  return (
    <>
      <footer className="border-t text-gray-500">
        <div className="section_akm flex md:items-center px-6  lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <div className="flex items-center md:justify-start justify-center ">
              <Link href="/">
                <img alt="" src="/logo.webp" className="pr-10" />
              </Link>
            </div>

            <p className="mt-2  text-sm">
              We&apos;re more than an ISP, your digital ally for robust,
              high-speed internet and exceptional customer care.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            {footerData.footerData.map((section, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                  {section.title}
                </h2>
                <nav className="list-none mb-10">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-0.5">
                      <Link
                        href={link.url}
                        className="text-gray-600 hover:text-gray-800 "
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 border-t">
          <div className="container mx-auto max-w-7xl py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 Mazeda Networks Ltd.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/mazedanetltd"
                target="_blank"
                className="text-gray-500"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
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
