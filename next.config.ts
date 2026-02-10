import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - feature is supported but types are missing in this version
    outputFileTracingIncludes: {
      '/': ['./content/**/*'],
      '/api/**/*': ['./content/**/*'],
    },
  },
};

export default nextConfig;
