import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faCreditCard,
  faBars,
  faHeadset,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@nextui-org/react";
import { useIntl } from "react-intl";
import { useApi } from "../../lib/ApiContext";
import axios from "axios";

function Navbar() {
  const { locales, locale, asPath } = useRouter();
  const { switchToEnApi, switchToBnApi } = useApi();
  const router = useRouter();
  const intl = useIntl();
  const items = intl.messages.component.navbar;
  const navbarButtons = intl.messages.component.navbarButtons;
  const [offersCount, setOffersCount] = useState("");
  const { apiBaseUrl } = useApi();

  const [localeBn, localeEn] = locales || ["bn", "en"];
  const handleLocaleChange = (selectedLocale) => {
    if (selectedLocale === "en") {
      switchToEnApi();
    } else {
      switchToBnApi();
    }

    router.replace(asPath, asPath, { locale: selectedLocale, scroll: false });
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "faCreditCard":
        return faCreditCard;
      case "faPhoneVolume":
        return faPhoneVolume;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/offers.php`);

        // Get today's date in 'DD-MM-YYYY' format
        const today = new Date();
        const todayString = today.toLocaleDateString("en-GB"); // 'DD-MM-YYYY'

        // Count offers with offerDateExpire before today's date
        const validOffersCount = response.data.filter((offer) => {
          const offerExpireDate = new Date(
            offer.offerDateExpire.split("-").reverse().join("-")
          ); // Convert 'DD-MM-YYYY' to 'YYYY-MM-DD'
          return offerExpireDate > today;
        }).length;

        setOffersCount(validOffersCount); // Update count of valid offers
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <nav className="fixed mx-auto w-full top-0 z-40 bg-[#FFFFFF]  ">
      <div className="h-6 text-sm text-white bg_green">
        <div className="flex items-center justify-end h-full mx-auto lg:px-4 max-w-7xl">
          <div className="flex items-center gap-1 pr-4">
            <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />{" "}
            mazeda@mazedanetworks.net
          </div>
          <div className="flex items-center gap-1 pr-1">
            <FontAwesomeIcon icon={faHeadset} className="h-3.5 w-3.5" />
            <a href="tel:09666334455" className="hover:underline">
              09666 334455
            </a>
          </div>
        </div>
      </div>
      <div className="h-14">
        <div className="h-full pl-6 mx-auto lg:px-4 max-w-7xl">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center h-full">
              <div className="py-2">
                <Link href="/">
                  <img alt="" src="/logo.webp" className="pr-10" />
                </Link>
              </div>
              <ul className="items-center hidden h-full space-x-4 lg:flex">
                {items.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="relative h-full"
                  >
                    <li className={`p-2 lg:p-4  relative `}>
                      {item.label}
                      {item.label === "Offers" && offersCount != 0 && (
                        <div className="flex items-center justify-center h-full absolute -top-1.5 -right-1">
                          <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full ">
                            {offersCount}
                          </div>
                        </div>
                      )}

                      {item.label === "অফার" && offersCount != 0 && (
                        <div className="flex items-center justify-center h-full absolute -top-1.5 -right-1">
                          <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full ">
                            {offersCount}
                          </div>
                        </div>
                      )}
                    </li>
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-0 w-full border-b-2 border-red-500"></div>
                    )}
                  </Link>
                ))}
              </ul>
            </div>

            <div className="flex">
              <Switch
                isSelected={locale === "en"} // Check if current locale is 'en'
                onChange={(e) =>
                  handleLocaleChange(e.target.checked ? localeEn : localeBn)
                }
                size="lg"
                color="danger"
                startContent={<span style={{ fontSize: "13px" }}>BN</span>}
                endContent={<span style={{ fontSize: "13px" }}>EN</span>}
              />
              <ul className="items-center hidden space-x-2 sm:flex">
                {navbarButtons.map((button, index) => (
                  <li key={index}>
                    <Link
                      href={button.href}
                      className="flex items-center  px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF] rounded-full shadow-md"
                    >
                      <FontAwesomeIcon
                        icon={getIcon(button.icon)}
                        className="pr-1 h-3.5 w-3.5 "
                      />
                      {button.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleMenu}
                className="py-2 pl-2 pr-6 lg:hidden hover:text-deep-purple-accent-400 focus:outline-none focus:text-deep-purple-accent-400"
              >
                <div className="">
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
                    {item.label === "Offers" && offersCount != 0 && (
                      <div className="flex items-center justify-center h-full absolute -top-1.5 -right-1">
                        <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full ">
                          {offersCount}
                        </div>
                      </div>
                    )}

                    {item.label === "অফার" && offersCount != 0 && (
                      <div className="flex items-center justify-center h-full absolute -top-1.5 -right-1">
                        <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full ">
                          {offersCount}
                        </div>
                      </div>
                    )}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-0 w-full border-b-2 border-red-500"></div>
                    )}
                  </li>
                </Link>
              ))}
            </ul>

            {/* <div className="flex justify-center mt-4">
              <Switch
                className="flex sm:hidden"
                isSelected={locale === "en"} // Check if current locale is 'en'
                onChange={(e) =>
                  handleLocaleChange(e.target.checked ? localeEn : localeBn)
                }
                size="lg"
                color="danger"
                startContent={<span style={{ fontSize: "13px" }}>BN</span>}
                endContent={<span style={{ fontSize: "13px" }}>EN</span>}
              />
            </div> */}

            <ul className="flex justify-center my-4 space-x-2 sm:hidden">
              {navbarButtons.map((button, index) => (
                <li key={index}>
                  <Link
                    href={button.href}
                    className="justify-center px-4 py-2 font-sm green_gradient hover:red_gradient text-[#FFF] rounded-full shadow-md"
                  >
                    <FontAwesomeIcon
                      icon={getIcon(button.icon)}
                      size="xs"
                      className="pr-1"
                    />
                    {button.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
