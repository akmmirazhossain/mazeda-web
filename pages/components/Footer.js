// pages/about.js
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font bg-slate-200 ">
        {/* <div className="container px-5 py-6 mx-auto flex md:items-center max-w-7xl lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="text-xl">Mazeda Networks</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;re more than an ISP, your digital ally for robust,
              high-speed internet and exceptional customer care.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SERVICES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Internet Plans
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Installation Options
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Billing Information
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                RESOURCES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">FAQs</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    User Guides
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CONTACT US
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Sales Enquiries
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Technical Assistance
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Feedback</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SUBSCRIBE
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Promotions
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Exclusive Offers
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Updates</a>
                </li>
              </nav>
            </div>
          </div>
        </div> */}
        <div className="bg-gray-100">
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
