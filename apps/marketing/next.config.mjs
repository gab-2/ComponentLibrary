const dashboardOrigin = process.env.DASHBOARD_ORIGIN ?? 'http://localhost:3102';
const docsOrigin = process.env.DOCS_ORIGIN ?? 'http://localhost:3103';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: `${docsOrigin}/docs`
      },
      {
        source: '/docs/:path*',
        destination: `${docsOrigin}/docs/:path*`
      },
      {
        source: '/dashboard',
        destination: `${dashboardOrigin}/dashboard`
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardOrigin}/dashboard/:path*`
      }
    ];
  }
};

export default nextConfig;
