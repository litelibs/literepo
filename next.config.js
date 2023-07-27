/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/path/:path*",
        destination: "/", // access the param :path* via 'destination: "/:path*",'
      },
    ];
  },
};

module.exports = nextConfig;
