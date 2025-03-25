import type { NextConfig } from 'next';

export default {
  devIndicators: false,
  experimental: { serverActions: { bodySizeLimit: '5mb' } }
} as NextConfig;
