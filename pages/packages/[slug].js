// mazeda-web/pages/packages/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RichText from "../components/RichText";

const SITE_URL = "https://www.mazeda.net";

// One compact row per package: name + speed | features | price
const PackageRow = ({ pkg }) => (
  <div className="grid grid-cols-2 md:grid-cols-12 items-center gap-x-4 gap-y-2 py-3 border-b last:border-b-0 hover:bg-gray-50">
    {/* Name + speed */}
    <div className="md:col-span-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold tracking-widest uppercase text_red">
          {pkg.name}
        </span>
        {pkg.is_popular && (
          <span className="px-1.5 text-[10px] tracking-wider text-white rounded bg_red">
            POPULAR
          </span>
        )}
      </div>
      <div className="leading-none">
        <span className="text-3xl font-bold">{pkg.speed}</span>
        <span className="ml-1 text-sm tracking-widest text_gray">Mbps</span>
      </div>
    </div>

    {/* Price (shown second on mobile, last on desktop) */}
    <div className="text-right md:order-last md:col-span-3">
      {pkg.call_for_price ? (
        <span className="text-sm italic font-semibold text_green">
          (Call for Price)
        </span>
      ) : (
        <>
          <span className="text-2xl font-semibold text_green">
            ৳{pkg.price}
          </span>{" "}
          <span className="text-xs italic text_gray">(Including vat)</span>
        </>
      )}
      <div>
        <Link href="/contact" className="text-sm text_green hover:underline">
          Contact Us{" "}
          <FontAwesomeIcon icon={faArrowRightLong} className="text-xs" />
        </Link>
      </div>
    </div>

    {/* Features (full width under name/price on mobile) */}
    <ul className="col-span-2 md:col-span-6 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text_gray">
      {pkg.features?.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-1">
          <FontAwesomeIcon icon={faCheck} className="text-xs text_green" />
          {feature.texts}
        </li>
      ))}
    </ul>
  </div>
);

const PackageCategoryPage = ({ category }) => {
  const intl = useIntl();
  const allPackagesLabel = intl.messages.component.packageTitle;

  const packages = category.packages || [];
  const title = category.seo_title || `${category.name} Internet Packages`;
  const description =
    category.seo_description ||
    category.subtitle ||
    `Explore ${category.name} internet packages from Mazeda Networks.`;
  const canonicalUrl = `${SITE_URL}/packages/${category.slug}`;
  const ogImage = `${SITE_URL}/images/connect-in-1-hour.png`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mazeda Networks" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <main>
        <Navbar />

        <div className="banner_bg bg-[url('/images/packages-banner.jpg')]">
          <h1 className="banner_title text_shadow_black">{category.name}</h1>
          {category.subtitle && (
            <p className="banner_subtitle text_shadow_black">
              {category.subtitle}
            </p>
          )}
        </div>

        <div className="container_akm">
          <section className="page_body">
            {packages.length > 0 && (
              <div
                className="px-4 bg-white shadow-xl rounded-2xl md:px-6 border-t-4"
                style={{ borderTopColor: category.theme_color || "#03738c" }}
              >
                {packages.map((pkg) => (
                  <PackageRow key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}

            {category.body?.length > 0 && (
              <div className="box_round_shadow mt_akm">
                <RichText content={category.body} />
              </div>
            )}

            <div className="mt_akm text-center">
              <Link
                href="/packages"
                className="inline-block px-4 py-2 text-white rounded-full shadow-md green_gradient hover:red_gradient"
              >
                {allPackagesLabel}
              </Link>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export async function getServerSideProps({ params, locale, res }) {
  const { slug } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/package-categories?locale=${locale}` +
        `&filters[slug][$eq]=${encodeURIComponent(slug)}` +
        `&populate[packages][sort]=order:asc` +
        `&populate[packages][populate]=features`,
    );

    if (!response.ok) throw new Error(`Strapi responded ${response.status}`);

    const json = await response.json();
    const category = json.data?.[0];

    // Unknown slugs (e.g. /packages/anything) return a real 404, not a soft 404
    if (!category) {
      return { notFound: true };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );

    return { props: { category } };
  } catch (err) {
    console.error("Error fetching package category:", err);
    return { notFound: true };
  }
}

export default PackageCategoryPage;
