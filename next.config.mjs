const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true, // middleware handles slashes in one hop
  images: { domains: ["api.mazeda.net", "localhost"] },
  i18n: { locales: ["en", "bn"], defaultLocale: "en", localeDetection: false },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          { type: "host", value: "www.mazeda.net" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://www.mazeda.net/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mazeda.net" }],
        destination: "https://www.mazeda.net/:path*",
        statusCode: 301,
      },
    ];
  },
};
export default nextConfig;
