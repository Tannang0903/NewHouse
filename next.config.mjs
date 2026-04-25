/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Facebook CDN (cũ)
      { protocol: 'https', hostname: 'scontent.fdad1-1.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-2.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-3.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-4.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad2-1.fna.fbcdn.net' },
      // Cloudinary
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Placeholder (dev)
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}

export default nextConfig
