// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["apis.mazedanetworks.net"],
  },
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "bn",
    localeDetection: false,
  },
};

export default nextConfig;
