import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Redirect non-www to www for consistency
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'petcarebooker.com',
          },
        ],
        destination: 'https://www.petcarebooker.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
