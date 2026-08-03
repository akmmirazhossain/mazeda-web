// mazeda-web/pages/articles/[slug].js
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const log = 0 ? console.log : () => {};

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const ArticleDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { locale } = router;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=banner_image`,
    )
      .then((res) => res.json())
      .then((json) => {
        // filters return an array, not a single object
        setArticle(json.data?.[0] || null);
      })
      .catch((err) => console.error("Error fetching article:", err));
  }, [slug, locale]);

  if (!article) {
    return (
      <>
        <Head>
          <title>Article</title>
        </Head>
        <main>
          <Navbar />
          <div className="container_akm nav_space_akm">
            <section className="page_body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap_akm">
                <div className="col-span-3 box_round_shadow mt-4 pt-4 sm:mt-0 text-center sm:text-left ">
                  <Skeleton className="subheading_akm border-b mb-3 h-8" />
                  <Skeleton className="relative w-full h-96" />
                  <Skeleton className="pt_akm italic h-6" />
                  <Skeleton className="pt_akm h-32" />
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
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
                  <BlocksRenderer content={article.body} />
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

export default ArticleDetailsPage;
