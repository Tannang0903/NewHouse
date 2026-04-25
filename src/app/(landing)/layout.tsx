import Header from '@/components/header'
import Footer from '@/components/footer'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-[80px]'>{children}</main>
      <Footer />
    </>
  )
}
