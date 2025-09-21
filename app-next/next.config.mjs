/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile photos
      "petpass-fulf.onrender.com", // your backend
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
