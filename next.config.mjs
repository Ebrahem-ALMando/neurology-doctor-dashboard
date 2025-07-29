// /** @type {import('next').NextConfig} */
// const nextConfig = {

//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    swcMinify: false,       // ⛔ تعطيل SWC minifier المسبب للمشكلة
    swcPlugins: [],         // إزالة أي SWC Plugins غير مرغوبة
  },
  compiler: {
    reactRemoveProperties: true // (اختياري) يحذف الخصائص المخصصة وقت البناء
  },
}

export default nextConfig
