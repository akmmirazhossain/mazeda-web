// mazeda-web/pages/components/PackagesSection.js
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

const log = 0 ? console.log : () => {};

// MARK: Group Config
const GROUP_ORDER = ["basic", "standard", "power", "corporate"];

const GROUP_CONFIG = {
  basic: {
    label: "Basic",
    subtitle: "Great for light home use",
    gradient: "from-[#0296b8] via-[#03738C] to-[#0296b8]",
  },
  standard: {
    label: "Standard",
    subtitle: "Most popular for home & small families",
    gradient: "from-[#4f46e5] via-[#3730a3] to-[#4f46e5]",
  },
  power: {
    label: "Power",
    subtitle: "High-speed for gamers & power users",
    gradient: "from-[#0e7490] via-[#164e63] to-[#0e7490]",
  },
  corporate: {
    label: "Corporate",
    subtitle: "Dedicated bandwidth for businesses",
    gradient: "from-[#2d5282] via-[#1e3a5f] to-[#2d5282]",
  },
};

// MARK: Sort by speed
const sortBySpeed = (packages) =>
  [...packages].sort(
    (a, b) => parseFloat(a.packageSpeed) - parseFloat(b.packageSpeed),
  );

// MARK: Group packages
const groupPackages = (flatData) => {
  const grouped = flatData.reduce((acc, pkg) => {
    const group = pkg.packageGroup;
    if (!acc[group]) acc[group] = [];
    acc[group].push(pkg);
    return acc;
  }, {});

  for (const group in grouped) {
    grouped[group] = sortBySpeed(grouped[group]);
  }

  return grouped;
};

const PackagesSection = () => {
  const { apiBaseUrl } = useApi();
  const intl = useIntl();
  const packageFeatures = intl.messages.component.packageFeatures;
  const packageFeaturesTitle = intl.messages.component.packageFeaturesTitle;
  const packageFeaturesBTRC = intl.messages.component.packageFeaturesBTRC;
  const packageTitle = intl.messages.component.packageTitle;

  const [groupedPackages, setGroupedPackages] = useState({});

  useEffect(() => {
    fetch(`${apiBaseUrl}/packages.php`)
      .then((res) => res.json())
      .then((data) => {
        const grouped = groupPackages(data);
        log("🔵 PackagesSection grouped:", grouped);
        setGroupedPackages(grouped);
      })
      .catch((err) => console.error("Error fetching packages:", err));
  }, [apiBaseUrl]);

  const router = useRouter();
  const isMyPage = router.pathname === "/packages";

  return (
    <section className="page_body">
      {!isMyPage && <div className="heading_akm">{packageTitle}</div>}

      <div className="grid grid-cols-1 grid-flow-row lg:grid-flow-col lg:grid-cols-6 gap_akm justify-items-center">
        {/* MARK: Left Sidebar */}
        <div className="box_round_shadow w-full lg:col-span-2">
          <p className="body_text_akm font-bold pb-4">{packageFeaturesTitle}</p>
          {packageFeatures.map((feature, index) => (
            <div key={index} className="flex items-start mb-2">
              <div className="mr-2 rounded-full">
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
                src="/images/connect-in-1-hour.png"
                alt="Connect in 1 hour"
                className="w-full"
              />
            </Link>
          </div>
        </div>

        {/* MARK: Packages List */}
        <div className="w-full lg:col-span-4 flex flex-col gap-10">
          {GROUP_ORDER.map((groupKey) => {
            const packages = groupedPackages[groupKey];
            if (!packages?.length) return null;

            const config = GROUP_CONFIG[groupKey];

            return (
              <div key={groupKey}>
                {/* MARK: Group Header */}
                <div
                  className={`rounded-2xl shadow-xl relative overflow-hidden mb_akm pad_akm bg-gradient-to-b ${config.gradient}`}
                >
                  <div className="flex flex-row items-center justify-center gap-5">
                    <p className="flex-2 text-2xl font-bold leading-tight text-white">
                      {config.label}
                    </p>
                    <p className="flex-1 text-white font-medium text-sm ">
                      {config.subtitle}
                    </p>
                  </div>
                </div>

                {/* MARK: Package Cards */}
                <div className="grid grid-cols-1 gap_akm">
                  {packages.map((pricing, index) => (
                    <PackageCard
                      key={index}
                      pricing={pricing}
                      config={config}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// MARK: Package Card
const PackageCard = ({ pricing, config }) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl bg-white relative transition duration-300 ease-in-out transform hover:-translate-y-1">
    <div
      className={`h-full rounded-2xl ${
        pricing.packagePopular === "1"
          ? "border-2 border-red-500"
          : "border-2 lg:border-0"
      } flex flex-col relative overflow-hidden`}
    >
      {pricing.packagePopular === "1" && (
        <span className="bg-red-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl z-10">
          POPULAR
        </span>
      )}

      <div className="grid grid-col-1 md:grid-col-9 grid-flow-row md:grid-flow-col">
        {/* Speed block */}
        <div
          className={`flex flex-row md:col-span-3 justify-center items-center pl-6 md:-skew-x-12 -ml-6 text-white bg-gradient-to-b ${config.gradient}`}
        >
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

        {/* Features block */}
        <div className="md:col-span-3 flex flex-col justify-center -skew-x-12 pl-16 p-6 bg-gradient-to-b from-white via-gray-100 to-white">
          <div className="skew-x-12">
            {pricing.packageFeatures.map((feature, idx) => (
              <div key={idx} className="flex mb-2">
                <div className="mr-2 rounded-full">
                  <FontAwesomeIcon icon={faCircleCheck} className="text_red" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Price + CTA block */}
        <div
          className={`md:col-span-3 flex flex-col justify-center items-center p-6 md:-skew-x-12 bg-gradient-to-b ${config.gradient} -mr-5 text-white`}
        >
          <div
            className={
              pricing.packagePrice === "(Call for Price)"
                ? "text-white text-sm italic font-bold tracking-wide"
                : "text-3xl md:skew-x-12 -ml-4 tracking-wide font-semibold"
            }
          >
            <div className="flex items-center">
              <span>{pricing.packagePrice}</span>
              {pricing.packagePrice !== "(Call for Price)" && (
                <span className="text-sm font-extralight rounded-full pl-0.5 pr-1 tracking-tighter italic">
                  (Including vat)
                </span>
              )}
            </div>
          </div>
          <Link
            href="/contact"
            className="items-center rounded-full text-center md:skew-x-12 text-white red_gradient hover:deep_red_gradient py-2 px-4 mt-4"
          >
            Contact Us
            <FontAwesomeIcon icon={faArrowRightLong} className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default PackagesSection;
