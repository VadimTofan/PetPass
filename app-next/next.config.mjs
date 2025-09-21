/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "https://petpass-fulf.onrender.com/api/:path*" },
      { source: "/auth/:path*", destination: "https://petpass-fulf.onrender.com/auth/:path*" },
    ];
  },
};

export default nextConfig;
