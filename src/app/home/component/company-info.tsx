'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { companyImage, companyStaffImage } from '@/app/api/mockData'
import { Fragment } from 'react'

const CompanyInfo = () => {
  return (
    <Fragment>
      <Swiper className='flex h-[calc(100vh-80px)]'>
        {companyImage.map((item, index) => (
          <SwiperSlide key={index} className='relative'>
            <img
              src={item.image}
              alt='ui/ux review check'
              className='xl:object-contain lg:object-contain  object-cover h-full w-full'
            />
            <div className='flex flex-col justify-center items-center absolute bg-[#ffba00] bottom-0 left-[50%] translate-x-[-50%] z-50'>
              <h2 className='px-4 py-2 border-b-[2px] border-[#000] w-full text-center text-[18px] font-bold'>
                NEW HOUSE
              </h2>
              <div className='flex flex-col justify-center items-center px-4 py-2 font-light text-[14px]'>
                <p className='text-center'>Tư vấn Thiết kế và Thi công Xây dựng Đà Nẵng</p>
                <p className='text-center'>Hotline: 0932.511.898</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper className='flex xl:h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] h-[400px] mt-[40px]'>
        {companyStaffImage.map((item, index) => (
          <SwiperSlide key={index} className='relative'>
            <img
              src={item.image}
              alt='ui/ux review check'
              className='xl:object-contain lg:object-contain object-cover h-full w-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  )
}

export default CompanyInfo
