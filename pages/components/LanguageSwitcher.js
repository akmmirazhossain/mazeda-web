// components/LanguageSwitcher.js

import Link from "next/link";
import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const { locales, locale: currentLocale } = useRouter();

  return (
    <div>
      {[...locales].sort().map((locale) => (
        <Link key={locale} href="/" locale={locale}>
          <div
            style={{
              cursor: "pointer",
              marginRight: "10px",
              fontWeight: locale === currentLocale ? "bold" : "normal",
            }}
          >
            {locale.toUpperCase()}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
