import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faArrowRightLong,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import { useApi } from "../../lib/ApiContext";

// Utility function to sort data by price
const sortBySpeed = (data) => {
  return data.sort((a, b) => {
    const speedA = parseFloat(a.packageSpeed);
    const speedB = parseFloat(b.packageSpeed);
    return speedA - speedB;
  });
};

const PackagesSection = () => {
  const { apiBaseUrl } = useApi();
  const intl = useIntl();
  const packageFeatures = intl.messages.component.packageFeatures;
  const packageFeaturesTitle = intl.messages.component.packageFeaturesTitle;
  const packageFeaturesBTRC = intl.messages.component.packageFeaturesBTRC;
  const packageTitle = intl.messages.component.packageTitle;
  const packageGroups = intl.messages.component.packageGroups;

  const [activeTab, setActiveTab] = useState(2); // Default tab to 'Standard'
  const [filteredData, setFilteredData] = useState([]);
  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/packages.php`)
      .then((response) => response.json())
      .then((data) => {
        // Process and sort data by package_speed for each group
        const sortedData = data.reduce((acc, curr) => {
          if (!acc[curr.packageGroup]) acc[curr.packageGroup] = [];
          acc[curr.packageGroup].push(curr);
          return acc;
        }, {});

        for (let group in sortedData) {
          sortedData[group] = sortBySpeed(sortedData[group]);
        }

        setAllPackages(sortedData);

        // Set the default tab content to "Standard" group
        setFilteredData(sortedData["standard"]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiBaseUrl]);

  const handleTabClick = (tabIndex) => {
    let group;
    switch (tabIndex) {
      case 1:
        group = "basic";
        break;
      case 2:
        group = "standard";
        break;
      case 3:
        group = "power";
        break;
      case 4:
        group = "corporate";
        break;
      default:
        group = "standard";
    }

    setFilteredData(allPackages[group] || []);
    setActiveTab(tabIndex);
  };

  const router = useRouter();
  const isMyPage = router.pathname === "/packages";

  return (
    <section className="page_body">
      {!isMyPage && <div className="heading_akm">{packageTitle}</div>}

      <div className="grid grid-cols-1 grid-flow-row lg:grid-flow-col lg:grid-cols-6 gap_akm justify-items-center">
        <div className="box_round_shadow w-full lg:col-span-2">
          <p className="body_text_akm font-bold pb-4">
            {packageFeaturesTitle}
            {/* All packages include these features. */}
          </p>
          {packageFeatures.map((feature, index) => (
            <div key={index} className="flex items-start mb-2">
              <div className="mr-2 text-white rounded-full">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-[#03738C]"
                />
              </div>
              <div>{feature}</div>
            </div>
          ))}
          <Link href="../files/Mazeda_tariff_permission_of_BTRC.pdf">
            <button className="items-center mt-2 text-center text-white green_gradient border-0 py-2 px-4 w-full focus:outline-none hover:red_gradient rounded-full">
              {packageFeaturesBTRC} <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </Link>
          <div className="p-14 bounce">
            <Link href="contact">
              <img
                src="/images/connect-in-1-hour.png" // Replace with the path to your image
                alt="Your Image"
                className="w-full"
              />
            </Link>
          </div>
        </div>
        <div className="w-full lg:col-span-4">
          <div className="grid grid-cols-4 items-center rounded-2xl shadow-xl overflow-hidden bg-white">
            {packageGroups.map((group, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
              >
                <TabButton
                  title={group.title}
                  onClick={() => handleTabClick(group.tabIndex)}
                  isActive={group.tabIndex === activeTab}
                />
              </div>
            ))}
            {/* <div className="w-full flex justify-center items-center">
              <TabButton
                title="Basic"
                onClick={() => handleTabClick(1)}
                isActive={activeTab === 1}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <TabButton
                title="Standard"
                onClick={() => handleTabClick(2)}
                isActive={activeTab === 2}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <TabButton
                title="Power"
                onClick={() => handleTabClick(3)}
                isActive={activeTab === 3}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <TabButton
                title="Corporate"
                onClick={() => handleTabClick(4)}
                isActive={activeTab === 4}
              />
            </div> */}
          </div>
          <div className="mt_akm">
            <TabContent>
              <div className="grid grid-cols-1 gap_akm">
                {filteredData.map((pricing, index) => (
                  <div
                    key={index}
                    className="rounded-2xl shadow-xl hover:shadow-2xl bg-white relative transition duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    <div
                      className={`h-full rounded-2xl ${
                        pricing.packagePopular === "1"
                          ? "border-2 border-red-500 rounded-2xl"
                          : "border-2 lg:border-0"
                      } flex flex-col relative overflow-hidden`}
                    >
                      {pricing.packagePopular === "1" && (
                        <span className="bg-red-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl z-10">
                          POPULAR
                        </span>
                      )}
                      <div className="grid grid-col-1 md:grid-col-9 grid-flow-row md:grid-flow-col">
                        <div className="flex flex-row md:col-span-3 justify-center items-center pl-6 bg_green md:-skew-x-12 -ml-6 text-white green_gradient">
                          <div className="lg:-mt-1 lg:pl-3 md:skew-x-12 py-3">
                            <h2 className="text-2xl tracking-widest title-font pl-1 text_red font-extrabold">
                              {pricing.packageName}
                            </h2>
                            <div className="flex flex-row">
                              <p className="text-5xl font-bold leading-none mr-1">
                                {pricing.packageSpeed}
                              </p>
                              <p className="flex items-end text-lg tracking-widest font-medium">
                                Mbps
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-3 flex flex-col justify-center -skew-x-12 pl-16 p-6 bg-gradient-to-b from-white via-gray-100 to-white">
                          <div className="skew-x-12">
                            {pricing.packageFeatures.map((feature, idx) => (
                              <div key={idx} className="flex mb-2">
                                <div className="mr-2 text-white rounded-full">
                                  <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="text_red"
                                  />
                                </div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-3 flex flex-col justify-center items-center p-6 md:-skew-x-12 bg-gradient-to-b from-[#0296b8] via-[#03738c] to-[#0296b8] -mr-5 text-white">
                          <p
                            className={
                              pricing.packagePrice === "(Call for Price)"
                                ? "text-white text-sm italic font-bold tracking-wide"
                                : "text-3xl md:skew-x-12 -ml-4 tracking-wide font-semibold"
                            }
                          >
                            {pricing.packagePrice}
                          </p>
                          <Link
                            href="/contact"
                            className="items-center rounded-full text-center md:skew-x-12 text-white red_gradient hover:deep_red_gradient py-2 px-4 mt-4"
                          >
                            Contact Us
                            <FontAwesomeIcon
                              icon={faArrowRightLong}
                              className="ml-2 text-sm"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabContent>
          </div>
        </div>
      </div>
    </section>
  );
};

const TabButton = ({ title, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-grow py-4 px-2 text-xs sm:text-base sm:px-0 font-semibold  focus:outline-none ${
        isActive ? "text-white green_gradient" : ""
      }`}
      style={{
        backgroundColor: isActive ? "" : "transparent",
      }}
    >
      {title}
    </button>
  );
};

const TabContent = ({ children }) => <div>{children}</div>;

export default PackagesSection;
