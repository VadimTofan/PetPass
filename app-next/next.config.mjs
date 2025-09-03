/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 👈 allow all hosts
      },
    ],
  },
};

export default nextConfig;
