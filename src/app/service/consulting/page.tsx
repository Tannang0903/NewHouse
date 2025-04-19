import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const ConsultingPage = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <div className='max-w-[1200px] w-full m-auto py-10 flex flex-col gap-6'>
          Tư vấn xây dựng, xin giấy phép xây dựng
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ConsultingPage
