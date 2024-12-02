import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  scope: '/service/',
});

export default withPWA(nextConfig);
