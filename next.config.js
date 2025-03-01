/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
        pathname: '/**',
      },
    ],
    // domains: [
    //   "medusa-public-images.s3.eu-west-1.amazonaws.com",
    //   "images.unsplash.com", // Add Unsplash to allowed domains
    //   "player.vimeo.com", // Add Vimeo for video thumbnails
    // ],
  },
  reactStrictMode: true,
  features: {
    productionBrowserSourceMaps: true,
  },
}

