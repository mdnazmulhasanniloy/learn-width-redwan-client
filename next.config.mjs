/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "learnwidthredwan-storage.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**", // Matches all paths
      },
      {
        protocol: "https",
        hostname: "livedemo00.template-help.com",
        port: "",
        pathname: "/**", // Matches all paths
      },
    ],
  },
};

export default nextConfig;
