/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "livedemo00.template-help.com",
        port: "",
        pathname: "/**", // Matches all paths
      },
      {
        protocol: "https",
        hostname: "learnwidthredwan-storage.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**", // Matches all paths
      },
    ],
  },

  // images: {
  //   domains: [
  //     "livedemo00.template-help.com",
  //     "learnwidthredwan-storage.s3.eu-north-1.amazonaws.com",
  //   ],
  // },
};

export default nextConfig;
