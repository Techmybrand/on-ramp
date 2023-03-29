/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com', 'fusionbucket.s3.eu-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
