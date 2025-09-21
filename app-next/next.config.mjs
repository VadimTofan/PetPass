const isProd = process.env.NODE_ENV === "production";

// Trim trailing slashes to avoid double // later
const RAW_BACKEND = process.env.NEXT_PUBLIC_DB_ACCESS || "";
const BACKEND_URL = RAW_BACKEND.replace(/\/+$/, "");

if (isProd && !/^https?:\/\//.test(BACKEND_URL)) {
  throw new Error("NEXT_PUBLIC_DB_ACCESS must be set to a full URL (https://...) in production.");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    if (!BACKEND_URL) return [];

    return [
      { source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` },
      { source: "/auth/:path*", destination: `${BACKEND_URL}/auth/:path*` },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "petpass-fulf.onrender.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
