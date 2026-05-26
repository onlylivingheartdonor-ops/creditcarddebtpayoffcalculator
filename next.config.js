/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  // Redirect non-www to www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'creditcarddebtpayoffcalculator.com' }],
        destination: 'https://www.creditcarddebtpayoffcalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig