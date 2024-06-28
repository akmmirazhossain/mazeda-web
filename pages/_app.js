import "../styles/globals.css";
import "../styles/custom.scss";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import { IntlProvider } from "react-intl";
import bn from "../public/locales/bn/bn.json";
import en from "../public/locales/en/en.json";

const messages = {
  en,
  bn,
};
function getDirection(locale) {
  return "Itr";
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <NextUIProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} dir={getDirection(locale)} />
      </IntlProvider>
    </NextUIProvider>
  );
}
