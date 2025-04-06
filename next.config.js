/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Supprimé: output: 'export' (bloque les API routes)
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
//test ok