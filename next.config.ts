const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname for now (be more specific in production)
      },
      {
        protocol: 'http', // If you use http in development
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors:true,
  },
  // output: 'export'
};

export default nextConfig;