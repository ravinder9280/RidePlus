/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["img.clerk.com"], // ✅ allow Clerk profile images
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
