/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Railway deployment: use standalone output
  // Comment out for local dev if it causes issues with Monaco
  // output: 'standalone',

  // Disable image optimization
  images: {
    unoptimized: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Forge',
    NEXT_PUBLIC_APP_VERSION: '0.2.0',
  },

  // Webpack config
  webpack: (config, { isServer }) => {
    // Fix for Monaco editor in standalone mode
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },

  // Experimental
  experimental: {
    // Optimize for production
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
