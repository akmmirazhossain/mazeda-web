// mazeda-web/pages/offers/[offerLink].js
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import RichText from "../components/RichText";

const SITE_URL = "https://www.mazeda.net";

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const isOfferExpired = (expiryDate) => {
  if (!expiryDate) return false;
  return new Date() > new Date(expiryDate);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OfferDetailsPage = ({ offer }) => {
  const expired = isOfferExpired(offer.expiry_date);
  const canonicalUrl = `${SITE_URL}/offers/${offer.documentId}`;
  const description =
    offer.excerpt || `Check out ${offer.title} from Mazeda Networks.`;
  const ogImage = offer.banner_image?.url
    ? getMediaUrl(offer.banner_image.url)
    : `${SITE_URL}/images/connect-in-1-hour.png`;

  return (
    <>
      <Head>
        <title>{offer.title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Expired offers stay reachable for users but shouldn't rank */}
        {expired && <meta name="robots" content="noindex, follow" />}

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Mazeda Networks" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={offer.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={offer.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                {expired && (
                  <div className="bg_green text-white p-4 rounded-t-lg mb-4 text-center">
                    <p className="text-lg font-semibold">
                      This Offer Has Expired
                    </p>
                    <p className="text-sm">
                      This offer expired on {formatDate(offer.expiry_date)}
                    </p>
                  </div>
                )}
                <h1 className="subheading_akm border-b mb-3">{offer.title}</h1>
                <div className="relative w-full h-96">
                  <Image
                    src={getMediaUrl(offer.banner_image?.url)}
                    alt={offer.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
                {offer.excerpt && (
                  <div className="pt_akm italic">{offer.excerpt}</div>
                )}
                <div className="pt_akm">
                  <RichText content={offer.body} />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export async function getServerSideProps({ params, locale, res }) {
  const { offerLink } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/offers/${offerLink}` +
        `?locale=${locale}&populate[0]=banner_image`,
    );

    // Strapi returns 404 for invalid/non-existent documentId — this is
    // exactly what stops junk paths like /offers/support, /offers/about,
    // /offers/50-percent-off from soft-404ing at 200.
    if (response.status === 404) {
      return { notFound: true };
    }
    if (!response.ok) throw new Error(`Strapi responded ${response.status}`);

    const json = await response.json();
    const offer = json.data;

    if (!offer) {
      return { notFound: true };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );

    return { props: { offer } };
  } catch (err) {
    console.error("Error fetching offer:", err);
    return { notFound: true };
  }
}

export default OfferDetailsPage;
