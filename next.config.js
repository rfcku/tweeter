/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn4.iconfinder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"cdn4.iconfinder.com"',
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig
