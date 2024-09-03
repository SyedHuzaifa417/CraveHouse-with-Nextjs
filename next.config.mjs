/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
