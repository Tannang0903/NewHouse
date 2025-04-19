'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import CardItem from './card-item'
import { Construction } from '@/interface/construction'

interface Props {
  title: string
  description: string
  constructions: Construction[]
}

SwiperCore.use([Navigation, Pagination, Keyboard])

const ConstructionSlider = ({ title, description, constructions }: Props) => {
  return (
    <div className='m-auto md:mt-10'>
      <div className='text-white border-t-[1px] border-[#FFBA00] py-10'>
        <div className='flex flex-col gap-4 items-center mx-auto w-full xl:w-[60%] lg:w-[60%] md:w-[80%] max-md:w-full px-4'>
          <h2 className='text-[27px] text-[#FFBA00] leading-[100%]'>{title}</h2>
          <p className='text-[16px] font-light text-justify'>{description}</p>
        </div>
      </div>
      <div className='lg:gap-10 md:gap-4 w-full relative'>
        <div className='overflow-hidden px-4 block'>
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            navigation={true}
            pagination={true}
            keyboard={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, Navigation, Keyboard]}
            className='px-6 !overflow-visible flex'
          >
            {constructions.map((construction, index) => (
              <SwiperSlide key={index}>
                <CardItem construction={construction} />
              </SwiperSlide>
            ))}
            {constructions.length === 0 && (
              <div className='flex w-full items-center justify-center'>
                <div className='text-center'>
                  <div className='inline-flex rounded-full bg-[#c6f8ff] p-4'>
                    <svg xmlns='http://www.w3.org/2000/svg' id='calendar' className='w-16 h-16'>
                      <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
                    </svg>
                  </div>
                  <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800 '>
                    Không có công trình vào thời điểm này
                  </h1>
                </div>
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ConstructionSlider
