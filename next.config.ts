import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./content/**/*'],
    '/api/**/*': ['./content/**/*'],
  },
};

export default nextConfig;
