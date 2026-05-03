'use client'

import { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import CardItem from './card-item'
import { IconCalendar } from '@/components/icons'
import { ConstructionSliderProps } from '@/interface'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperConfig = {
  slidesPerView: 3,
  spaceBetween: 50,
  navigation: true,
  pagination: true,
  keyboard: { enabled: true },
  modules: [Navigation, Pagination, Keyboard],
  breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
}

const SectionHeader = memo(({ title, description }: Pick<ConstructionSliderProps, 'title' | 'description'>) => (
  <div className='text-white border-t-[1px] border-[#FFBA00] py-10'>
    <div className='flex flex-col gap-4 items-center mx-auto w-full xl:w-[60%] lg:w-[60%] md:w-[80%] max-md:w-full xl:px-4 lg:px-4 md:px-4'>
      <h2 className='text-[27px] text-[#FFBA00] leading-[100%]'>{title}</h2>
      <p className='text-[16px] font-light text-justify'>{description}</p>
    </div>
  </div>
))

const EmptyState = memo(() => (
  <div className='flex w-full items-center justify-center py-10'>
    <div className='text-center'>
      <div className='inline-flex rounded-full bg-[#c6f8ff] p-4'>
        <IconCalendar className='w-16 h-16' />
      </div>
      <h3 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800'>
        Không có công trình vào thời điểm này
      </h3>
    </div>
  </div>
))

const ConstructionSlider = ({ title, description, constructions }: ConstructionSliderProps) => {
  const hasConstructions = constructions.length > 0

  return (
    <section className='m-auto md:mt-10' aria-labelledby='construction-title'>
      <SectionHeader title={title} description={description} />

      <div className='lg:gap-10 md:gap-4 w-full relative xl:px-4 lg:px-4 md:px-4'>
        {hasConstructions ? (
          <div className='overflow-hidden block'>
            <Swiper
              {...swiperConfig}
              className='px-6 !overflow-visible flex'
              aria-label='Danh sách công trình xây dựng'
            >
              {constructions.map((construction) => (
                <SwiperSlide key={construction.id}>
                  <CardItem construction={construction} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  )
}

SectionHeader.displayName = 'SectionHeader'
EmptyState.displayName = 'EmptyState'
ConstructionSlider.displayName = 'ConstructionSlider'

export default memo(ConstructionSlider)
