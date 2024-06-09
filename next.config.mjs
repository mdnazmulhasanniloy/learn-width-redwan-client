/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["learnwidthredwan-storage.s3.eu-north-1.amazonaws.com"], // Replace with your S3 bucket domain
  // },

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
