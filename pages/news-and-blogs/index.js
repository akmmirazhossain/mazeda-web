// mazeda-web/pages/articles/index.js
import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const log = 0 ? console.log : () => {};

const getMediaUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

const ArticlesPage = () => {
  const { locale } = useRouter();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?locale=${locale}&sort=publishedAt:desc&populate[0]=thumb_image`,
    )
      .then((res) => res.json())
      .then((json) => {
        log("🔵 articles:", json.data);
        setArticles(json.data || []);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, [locale]);

  return (
    <>
      <Head>
        <title>News & Blogs</title>
        <meta
          name="description"
          content="Read the latest news, updates, and articles from Mazeda Networks."
        />
      </Head>
      <main>
        <Navbar />

        <div className="banner_bg bg-[url('/images/articles_banner.webp')]">
          <h1 className="banner_title text_shadow_black">News & Blogs</h1>
        </div>

        <div className="container_akm ">
          <section className="page_body">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap_akm">
              {articles.map((article) => (
                <Link href={`/news-and-blogs/${article.slug}`} key={article.id}>
                  <div className="rounded-t-2xl rounded-2xl shadow-xl bg-white hover:shadow-2xl relative transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="relative w-full h-64">
                      <Image
                        src={getMediaUrl(article.thumb_image?.url)}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                      />
                    </div>

                    <div className="pad_akm relative">
                      <div className="mb-1">
                        <p className="subheading_akm line-clamp-2">
                          {article.title}
                        </p>
                      </div>

                      <div className="mt-1 mb-3 text-justify line-clamp-5">
                        {article.excerpt}
                      </div>

                      <div>
                        <p className="font-semibold text_green">Read More...</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ArticlesPage;
