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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          { type: "host", value: "www.mazeda.net" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://www.mazeda.net/:path*",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
