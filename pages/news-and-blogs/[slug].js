// mazeda-web/pages/news-and-blogs/[slug].js
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

const ArticleDetailsPage = ({ article }) => {
  const canonicalUrl = `${SITE_URL}/news-and-blogs/${article.slug}`;
  const description =
    article.excerpt || `Read ${article.title} on Mazeda Networks.`;
  const ogImage = article.banner_image?.url
    ? getMediaUrl(article.banner_image.url)
    : `${SITE_URL}/images/connect-in-1-hour.png`;

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Mazeda Networks" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <section className="page_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
              <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                <h1 className="subheading_akm border-b mb-3">
                  {article.title}
                </h1>
                {article.banner_image?.url && (
                  <div className="relative w-full h-96">
                    <Image
                      src={getMediaUrl(article.banner_image.url)}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl"
                    />
                  </div>
                )}
                {article.excerpt && (
                  <div className="pt_akm italic">{article.excerpt}</div>
                )}
                <div className="pt_akm">
                  <RichText content={article.body} />
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
  const { slug } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?locale=${locale}` +
        `&filters[slug][$eq]=${encodeURIComponent(slug)}` +
        `&populate[0]=banner_image`,
    );

    if (!response.ok) throw new Error(`Strapi responded ${response.status}`);

    const json = await response.json();
    const article = json.data?.[0];

    if (!article) {
      return { notFound: true };
    }

    // edge cache via Cloudflare — article content doesn't change every second
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );

    return { props: { article } };
  } catch (err) {
    console.error("Error fetching article:", err);
    return { notFound: true };
  }
}

export default ArticleDetailsPage;
