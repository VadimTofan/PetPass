/** @type {import('next').NextConfig} */
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
      { source: "/api/:path*", destination: "https://petpass-fulf.onrender.com/api/:path*" },
      { source: "/auth/:path*", destination: "https://petpass-fulf.onrender.com/auth/:path*" },
    ];
  },
};

export default nextConfig;
