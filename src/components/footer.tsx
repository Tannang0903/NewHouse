'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/image/logo.png'

const Footer = () => {
  return (
    <div className='w-full bg-[#161616] py-10 px-4'>
      <div className='max-w-[1200px] m-auto grid grid-cols-6 gap-6 text-white'>
        <div className='col-span-2'>
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
        <div className='col-span-2'>
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
        <div className='col-span-2'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-[16px] text-[#FFBA00] pb-2 border-b-[1px] border-[#FFBA00] uppercase font-semibold'>
              KẾT NỐI NEW HOUSE
            </h2>
            <ul>
              <li className='relative'>
                <Link href={'https://www.facebook.com/NewHousethietkexaydungdanang'} target='_blank'>
                  <img
                    src='https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/480798549_1084206653728894_1929986192652889701_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=TsEvnMUczyEQ7kNvwFfeBTW&_nc_oc=AdmGk-yTsxcqyd0Hb5g4QzhLFu6ZbHC3dp-8ZCoru5uVohZ0CvJcyaXoSsxM_ezttJc&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=QzBefeRVCdwWguxWVujJEw&oh=00_AfF0ZG22Idrd_fYUV2OXSrakbgUdpCVzLF7NLjFxi2MGOg&oe=68017C6A'
                    alt='ui/ux review check'
                    className='object-cover w-full'
                  />
                  <div className='absolute left-2 top-2'>
                    <Image src={logo} alt='logo-new-house' className='w-[60px] h-[60px] rounded-full' />
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
