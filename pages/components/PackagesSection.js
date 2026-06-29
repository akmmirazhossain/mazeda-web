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

const log = 0 ? console.log : () => {};

const darken = (hex, amount = 0.2) => {
  if (!hex) return "#000000";
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - 255 * amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount);
  const b = Math.max(0, (num & 0x0000ff) - 255 * amount);
  return `rgb(${r}, ${g}, ${b})`;
};

const gradientStyle = (hex) => ({
  background: `linear-gradient(to bottom, ${hex}, ${darken(hex)}, ${hex})`,
});

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const PackagesSection = () => {
  const { locale } = useRouter();
  const intl = useIntl();
  const packageTitle = intl.messages.component.packageTitle;

  const [categories, setCategories] = useState([]);
  const [globalFeatures, setGlobalFeatures] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/package-categories?locale=${locale}&sort=order:asc&populate[packages][sort]=order:asc&populate[packages][populate]=features`,
    )
      .then((res) => res.json())
      .then((json) => {
        log("🔵 categories:", json.data);
        setCategories(json.data || []);
      })
      .catch((err) => console.error("Error fetching packages:", err));

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages-page?locale=${locale}&populate[pkg_global_features_block][populate][0]=List&populate[pkg_global_features_block][populate][1]=btrc_button&populate[pkg_global_features_block][populate][2]=image`,
    )
      .then((res) => res.json())
      .then((json) => {
        log("🔵 packages-page:", json.data);
        setGlobalFeatures(json.data?.pkg_global_features_block || null);
      })
      .catch((err) => console.error("Error fetching packages page:", err));
  }, [locale]);

  const router = useRouter();
  const isMyPage = router.pathname === "/packages";

  return (
    <section className="page_body">
      {!isMyPage && <div className="heading_akm">{packageTitle}</div>}

      <div className="grid grid-cols-1 grid-flow-row lg:grid-flow-col lg:grid-cols-6 gap_akm justify-items-center">
        {/* MARK: Left Sidebar */}
        <div className="box_round_shadow w-full lg:col-span-2">
          {globalFeatures && (
            <>
              <p className="body_text_akm font-bold pb-4">
                {globalFeatures.pkg_global_feature_title}
              </p>
              {globalFeatures.List?.map((feature, index) => (
                <div key={index} className="flex items-start mb-2">
                  <div className="mr-2 rounded-full">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[#03738C]"
                    />
                  </div>
                  <div>{feature.title}</div>
                </div>
              ))}

              {globalFeatures.btrc_button?.btrc_button_link && (
                <Link href={globalFeatures.btrc_button.btrc_button_link}>
                  <button className="items-center mt-2 text-center text-white green_gradient border-0 py-2 px-4 w-full focus:outline-none hover:red_gradient rounded-full">
                    {globalFeatures.btrc_button.btrc_button_title}{" "}
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </Link>
              )}

              {globalFeatures.image?.[0] && (
                <div className="p-14 bounce">
                  <Link href="contact">
                    <img
                      src={getMediaUrl(globalFeatures.image[0].url)}
                      alt={globalFeatures.image[0].alternativeText || ""}
                      className="w-full"
                    />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* MARK: Packages List */}
        <div className="w-full lg:col-span-4 flex flex-col gap-10">
          {categories.map((category) => {
            const packages = category.packages;
            if (!packages?.length) return null;

            return (
              <div key={category.id}>
                <div
                  className="rounded-2xl shadow-xl relative overflow-hidden mb_akm pad_akm"
                  style={gradientStyle(category.theme_color)}
                >
                  <div className="flex flex-row items-center justify-center gap-5">
                    <p className="flex-2 text-2xl font-bold leading-tight text-white">
                      {category.name}
                    </p>
                    <p className="flex-1 text-white font-medium text-sm ">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap_akm">
                  {packages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      themeColor={category.theme_color}
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

const PackageCard = ({ pkg, themeColor }) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl bg-white relative transition duration-300 ease-in-out transform hover:-translate-y-1">
    <div
      className={`h-full rounded-2xl ${
        pkg.is_popular ? "border-2 border-red-500" : "border-2 lg:border-0"
      } flex flex-col relative overflow-hidden`}
    >
      {pkg.is_popular && (
        <span className="bg-red-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl z-10">
          POPULAR
        </span>
      )}

      <div className="grid grid-col-1 md:grid-col-9 grid-flow-row md:grid-flow-col">
        <div
          className="flex flex-row md:col-span-3 justify-center items-center pl-6 md:-skew-x-12 -ml-6 text-white"
          style={gradientStyle(themeColor)}
        >
          <div className="lg:-mt-1 lg:pl-3 md:skew-x-12 py-3">
            <h2 className="text-2xl tracking-widest title-font pl-1 text_red font-extrabold uppercase">
              {pkg.name}
            </h2>
            <div className="flex flex-row">
              <p className="text-5xl font-bold leading-none mr-1">
                {pkg.speed}
              </p>
              <p className="flex items-end text-lg tracking-widest font-medium">
                Mbps
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col justify-center -skew-x-12 pl-16 p-6 bg-gradient-to-b from-white via-gray-100 to-white">
          <div className="skew-x-12">
            {pkg.features?.map((feature, idx) => (
              <div key={idx} className="flex mb-2">
                <div className="mr-2 rounded-full">
                  <FontAwesomeIcon icon={faCircleCheck} className="text_red" />
                </div>
                {feature.texts}
              </div>
            ))}
          </div>
        </div>

        <div
          className="md:col-span-3 flex flex-col justify-center items-center p-6 md:-skew-x-12 -mr-5 text-white"
          style={gradientStyle(themeColor)}
        >
          <div
            className={
              pkg.call_for_price
                ? "text-white text-sm italic font-bold tracking-wide"
                : "text-3xl md:skew-x-12 -ml-4 tracking-wide font-semibold"
            }
          >
            <div className="flex items-center">
              <span>{pkg.call_for_price ? "(Call for Price)" : pkg.price}</span>
              {!pkg.call_for_price && (
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
