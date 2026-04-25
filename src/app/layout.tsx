import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['vietnamese'], weight: ['100', '300', '400', '500', '700', '900'] })

// Root layout - KHÔNG có Header/Footer
// Landing page dùng (landing)/layout.tsx
// Admin page dùng admin/(protected)/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>NewHouse</title>
        <link
          rel='icon'
          type='image/svg+xml'
          href='https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-1/278112594_349612030521697_1092861730634011129_n.png?stp=dst-png_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=MSQ-gsDvRuUQ7kNvwF9NfwL&_nc_oc=Adlm9Gf12c--LvSeRBB4hTVxNxrrP0xJUbRIW9apFvw0PTZrBPvMkBP2MNs5zUT2ZNA&_nc_zt=24&_nc_ht=scontent.fdad1-1.fna&_nc_gid=QzBefeRVCdwWguxWVujJEw&oh=00_AfE2hOmvOiDdtmea48W698DoWnLedfMvovp4vVa8XKjKJw&oe=68019292'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
          integrity='sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
