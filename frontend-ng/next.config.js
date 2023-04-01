/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          }
          // {
          //   key: 'Content-Security-Policy',
          //   value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://matomo.trafex.nl https://vitals.vercel-insights.com https://cdn.vercel-insights.com; font-src: 'self' data:; connect-src 'self' https://matomo.trafex.nl https://backend.clipboard.ninja; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; base-uri 'self';form-action 'self'",
          // }
        ],
      },
    ]
  }
})

module.exports = nextConfig
