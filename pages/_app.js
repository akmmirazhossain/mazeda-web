import "../styles/globals.css";
import "../styles/custom.scss";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import { IntlProvider } from "react-intl";
import bn from "../public/locales/bn/bn.json";
import en from "../public/locales/en/en.json";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { apiUrl, apiUrl_en } from "../config/config";
import { ApiProvider } from "../lib/ApiContext";

const messages = {
  en,
  bn,
};

function getDirection(locale) {
  return "Itr";
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

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
          <Component {...pageProps} dir={getDirection(locale)} />
        </IntlProvider>
      </NextUIProvider>
    </ApiProvider>
  );
}
