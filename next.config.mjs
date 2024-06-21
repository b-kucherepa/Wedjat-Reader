/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/build',
}

export default nextConfig;
