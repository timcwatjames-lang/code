import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  serverExternalPackages: ['bcryptjs'],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
