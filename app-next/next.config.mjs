// next.config.mjs

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${BACKEND_URL}/auth/:path*`,
      }
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "petpass-fulf.onrender.com",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
