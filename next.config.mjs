/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pg', '@prisma/adapter-pg'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'scontent.fdad1-1.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-2.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-3.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad1-4.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.fdad2-1.fna.fbcdn.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}

export default nextConfig
