import "../styles/globals.css";
import "../styles/custom.scss";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import { IntlProvider } from "react-intl";
import bn from "../public/locales/bn/bn.json";
import en from "../public/locales/en/en.json";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { apiUrl, apiUrl_en } from "../config/config";
import { ApiProvider } from "../lib/ApiContext";
import Head from "next/head";
import ChatBubble from "./components/ChatBubble";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const messages = {
  en,
  bn,
};

function getDirection(locale) {
  return "Itr";
}

export default function App({ Component, pageProps }) {
  const { locale, asPath, pathname } = useRouter(); // REPLACE
  const SKIP = [
    "/404",
    "/_error",
    "/gpt",
    "/chat-show",
    "/chat-text",
    "/scroll",
    "/gridslider",
    "/lang-switcher",
    "/modalTest",
    "/test/image",
  ];
  const path = asPath.split("?")[0].split("#")[0].replace(/\/$/, "");
  const enUrl = `https://www.mazeda.net${path}`;
  const bnUrl = `https://www.mazeda.net/bn${path}`;

  // useEffect(() => {
  //   const fullURL = window.location.href;
  //   const hasEn = /^https?:\/\/[^\/]+\/en\b/.test(fullURL);

  //   if (hasEn) {
  //     Cookies.set("baseApi", apiUrl_en);
  //   } else {
  //     Cookies.set("baseApi", apiUrl);
  //   }
  // }, []);

  return (
    <ApiProvider>
      <NextUIProvider>
        <IntlProvider locale={locale} messages={messages[locale]}>
          {!SKIP.includes(pathname) && (
            <Head>
              <link
                key="canonical"
                rel="canonical"
                href={locale === "bn" ? bnUrl : enUrl}
              />
              <link key="hl-en" rel="alternate" hrefLang="en" href={enUrl} />
              <link key="hl-bn" rel="alternate" hrefLang="bn" href={bnUrl} />
              <link
                key="hl-xd"
                rel="alternate"
                hrefLang="x-default"
                href={enUrl}
              />
            </Head>
          )}
          <Component {...pageProps} dir={getDirection(locale)} />
          <ChatBubble />
        </IntlProvider>
      </NextUIProvider>
    </ApiProvider>
  );
}
