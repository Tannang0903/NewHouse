'use client'

import Link from 'next/link'
import React from 'react'
import NextImage from '../common/NextImage'
import logo from '@/assets/image/logo.png'
import footer from '@/assets/image/footer.jpg'

const Footer = () => {
  return (
    <div className='w-full bg-[#161616] py-10 xl:px-4 lg:px-4 md:px-4 px-2'>
      <div className='max-w-[1200px] m-auto grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-6 text-white'>
        <div className='col-span-1'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-[16px] text-[#FFBA00] pb-2 border-b-[1px] border-[#FFBA00] uppercase font-semibold'>
              DỊCH VỤ CHÍNH
            </h2>
            <ul className='text-[14px] font-normal flex flex-col gap-4'>
              <li>1. Thiết kế nhà phố, villa, nội thất,...</li>
              <li>2. Thi công phần thô</li>
              <li>3. Thi công phần hoàn thiện </li>
              <li>4. Thiết kế và thi công trọn gói </li>
              <li>5. Cải tạo công trình, nhà ở </li>
              <li>6. Tư vấn xây dựng, xin giấy phép xây dựng</li>
              <li>HÃY LIÊN HỆ NGAY VỚI CHÚNG TÔI! </li>
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-[16px] text-[#FFBA00] pb-2 border-b-[1px] border-[#FFBA00] uppercase font-semibold'>
              LIÊN HỆ
            </h2>
            <ul className='text-[14px] font-normal flex flex-col gap-4'>
              <li className='font-semibold text-[18px]'>CÔNG TY TNHH THIẾT KẾ VÀ XÂY DỰNG NEW HOUSE</li>
              <li>Tư vấn thiết kế - thi công nhà trọn gói miền Trung</li>
              <li>Hotline : 0932.511.898 (Mr. Văn) - 0905.404.171 (Mrs. Uyên) </li>
              <li>Mail: newhousecompany.danang@gmail.com</li>
              <li>Cơ Sở Chính: 77 Trần Can, thanh khê, Đà Nẵng.</li>
              <li>Trụ sở chính: 284-286 Lê Quảng Chí, Đà Nẵng</li>
              <li>Chi nhánh Quảng Bình: 35 Lê Lai, Đồng Hới</li>
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-[16px] text-[#FFBA00] pb-2 border-b-[1px] border-[#FFBA00] uppercase font-semibold'>
              KẾT NỐI NEW HOUSE
            </h2>
            <ul>
              <li className='relative'>
                <Link href={'https://www.facebook.com/NewHousethietkexaydungdanang'} target='_blank'>
                  <div className='relative w-full h-[200px]'>
                    <NextImage
                      src={footer}
                      alt='footer'
                      fill
                      className='object-contain object-top lg:object-cover md:object-cover'
                    />
                    <div className='absolute left-2 top-2'>
                      <NextImage
                        src={logo}
                        alt='logo-new-house'
                        width={0}
                        height={0}
                        className='rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]'
                      />
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
