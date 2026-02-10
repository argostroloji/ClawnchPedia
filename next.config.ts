import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./content/**/*'],
      '/api/**/*': ['./content/**/*'], // Just in case
    },
  },
};

export default nextConfig;
