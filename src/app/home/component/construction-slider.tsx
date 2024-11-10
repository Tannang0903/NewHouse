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
  constructions: Construction[]
}

SwiperCore.use([Navigation, Pagination, Keyboard])

const ConstructionSlider = ({ constructions }: Props) => {
  return (
    <div className='flex flex-col lg:gap-10 md:gap-4 w-full lg:py-8 lg:px-4 max-lg:py-4 m-auto md:mt-10 relative'>
      <div className='overflow-hidden py-10 w-full px-4 hidden lg:block'>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          navigation={true}
          pagination={true}
          keyboard={true}
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
  )
}

export default ConstructionSlider
