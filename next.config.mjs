/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  swcMinify: false,
  webpack: (config) => {
    config.optimization.minimize = false;
    config.optimization.minimizer = [];
    return config;
  },
}
export default nextConfig;
