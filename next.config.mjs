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
      // http://www.mazeda.net/* → https://www.mazeda.net/*
      {
        source: "/:path*",
        has: [
          { type: "host", value: "www.mazeda.net" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://www.mazeda.net/:path*",
        permanent: true, // 301
      },
      // mazeda.net/* (bare, any protocol) → https://www.mazeda.net/*
      {
        source: "/:path*",
        has: [{ type: "host", value: "mazeda.net" }],
        destination: "https://www.mazeda.net/:path*",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
