/** @type {import('next').NextConfig} */
const backendBaseUrl = (process.env.NEXT_PUBLIC_DB_ACCESS || process.env.NEXT_PUBLIC_API_URL || "https://petpass.fly.dev").replace(/\/$/, "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendBaseUrl}/api/:path*` },
      { source: "/auth/:path*", destination: `${backendBaseUrl}/auth/:path*` },
    ];
  },
};

export default nextConfig;
