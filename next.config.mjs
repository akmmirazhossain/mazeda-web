// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Specify remote patterns for image domains
    remotePatterns: [
      // Define the remote pattern with hostname
      {
        // Hostname of the remote image domain
        hostname: "mazedanetworks.net",
      },
    ],
  },
};

// module.exports = {
//   images: {
//     domains: ["new.mazedanetworks.net"],
//   },
// };

export default nextConfig;
