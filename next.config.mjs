// mazeda-web/next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.mazeda.net", "localhost"],
  },
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
