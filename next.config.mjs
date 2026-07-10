// mazeda-web/next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "apis.mazedanetworks.net",
      "data.mazedanetworks.net",
      "mzadmin.dalbhathdev.xyz",
      "localhost",
    ],
  },
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
