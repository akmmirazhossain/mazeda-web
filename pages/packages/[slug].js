// mazeda-web/pages/packages/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useIntl } from "react-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RichText from "../components/RichText";
import { PackageCard, gradientStyle } from "../components/PackagesSection";

const SITE_URL = "https://www.mazeda.net";

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
              <div className="grid grid-cols-1 gap_akm">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    themeColor={category.theme_color}
                  />
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
                style={
                  category.theme_color
                    ? gradientStyle(category.theme_color)
                    : undefined
                }
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
