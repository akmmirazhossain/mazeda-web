import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faCreditCard,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/coverage", label: "Coverage" },
  { href: "/offers", label: "Offers" },
  { href: "/pay-bill", label: "Pay Bill" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <nav className="fixed mx-auto  h-14 w-full top-0 z-40 bg-[#FFFFFF]  ">
      <div className="mx-auto pl-6 lg:px-4 max-w-7xl h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <div className="py-2">
              <Link href="/">
                <img alt="" src="/logo.webp" className="pr-10" />
              </Link>
            </div>
            <ul className="items-center hidden space-x-6 lg:flex text-base font-medium ">
              {items.map((item, index) => (
                <Link href={item.href} key={index} className="relative">
                  <li className={`p-2 lg:p-4  relative`}>
                    {item.label}
                    {item.label === "Offers" && (
                      <div className="flex items-center justify-center h-full absolute -top-1.5 -right-1">
                        <div className=" bg-red-500 h-5 w-5 rounded-full flex items-center justify-center  text-white text-xs">
                          1
                        </div>
                      </div>
                    )}
                  </li>
                  {isActive(item.href) && (
                    <div className="border-b-2 border-red-500 absolute bottom-0 left-0 w-full"></div>
                  )}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex">
            <ul className="items-center space-x-2 hidden sm:flex">
              <li>
                <Link
                  href="https://isperp.mazedanetworks.net/ispcare"
                  target="_blank"
                  className="justify-center px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF]  rounded-full shadow-md"
                >
                  <FontAwesomeIcon
                    size="xs"
                    className="pr-1"
                    icon={faCreditCard}
                  />
                  Quick Pay
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="justify-center px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF]  rounded-full shadow-md"
                >
                  <FontAwesomeIcon
                    size="xs"
                    className="pr-1"
                    icon={faPhoneVolume}
                  />
                  Support
                </Link>
              </li>
            </ul>

            <button
              onClick={toggleMenu}
              className="py-2 pl-2 pr-6  hover:text-deep-purple-accent-400 focus:outline-none focus:text-deep-purple-accent-400"
            >
              <div className="lg:hidden">
                <FontAwesomeIcon className="text-lg" icon={faBars} />
              </div>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="overflow-auto  w-full bg-[#FFFFFF] bg-opacity-90 border-t"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <ul className="flex flex-col items-center mt-4 space-y-4">
            {items.map((item, index) => (
              <Link href={item.href} key={index}>
                <li className={`p-2 lg:p-4 ${isActive(item.href)} relative`}>
                  {item.label}
                  {item.label === "Offers" && (
                    <div className="flex items-center justify-center h-full absolute -top-2 -right-3">
                      <div className="relative bg-red-500 h-5 w-5 rounded-full flex items-center justify-center  text-white text-xs">
                        1
                      </div>
                    </div>
                  )}
                  {isActive(item.href) && (
                    <div className="border-b-2 border-red-500 absolute bottom-0 left-0 w-full"></div>
                  )}
                </li>
              </Link>
            ))}
          </ul>

          <ul className="flex sm:hidden justify-center my-4 space-x-2">
            <li>
              <Link
                className="justify-center px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF]  rounded-full shadow-md "
                href="https://isperp.mazedanetworks.net/ispcare"
                target="_blank"
              >
                <FontAwesomeIcon className="text-xs pr-1" icon={faCreditCard} />
                Quick Pay
              </Link>
            </li>
            <li>
              <Link
                className="justify-center px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF]  rounded-full shadow-md "
                href="/support"
              >
                <FontAwesomeIcon
                  className="text-xs pr-1"
                  icon={faPhoneVolume}
                />
                Support
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
