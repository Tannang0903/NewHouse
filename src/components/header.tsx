'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/image/logo.png'

const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-[#161616]'>
      <div className='h-[80px] max-w-[1200px] w-full flex items-center justify-between m-auto text-white'>
        <Link href={'#!'}>
          <Image src={logo} alt='logo-new-house' className='w-[60px] h-[60px] rounded-full' />
        </Link>
        <ul className='flex gap-8 list-none'>
          <li className='hover:text-[#cca539]'>
            <Link href='#!'>TRANG CHỦ</Link>
          </li>
          <li className='hover:text-[#cca539]'>
            <Link href='#!'>GIỚI THIỆU</Link>
          </li>
          <li className='group relative hover:text-[#cca539]'>
            <Link href='#!' className='menu-hover'>
              DỊCH VỤ
            </Link>
            <ul className='invisible absolute left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%] '>
              <li className='py-[6px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                <Link href='#!'>Thiết kế & thi công nội thất</Link>
              </li>
              <li className='py-[6px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                <Link href='#!'>Thiết kế kiến trúc</Link>
              </li>
              <li className='py-[6px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                <Link href='#!'>Thi công phần thô</Link>
              </li>
              <li className='py-[6px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                <Link href='#!'>Thi công hoàn thiện</Link>
              </li>
              <li className='py-[6px] px-4'>
                <Link href='#!'>Xây nhà trọn gói Đà Nẵng</Link>
              </li>
            </ul>
          </li>
          <li className='group relative hover:text-[#cca539]'>
            <Link href='#!' className='menu-hover'>
              DỰ ÁN
            </Link>
            <ul className='invisible absolute z-50 flex w-[240px] flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible'>
              <li>
                <Link href='#!'>Nhà 2 tầng</Link>
              </li>
              <li>
                <Link href='#!'>Nhà 3 tầng</Link>
              </li>
              <li>
                <Link href='#!'>Nhà 4 tầng</Link>
              </li>
              <li>
                <Link href='#!'>Mẫu Nhà Cấp 4 Đẹp</Link>
              </li>
              <li>
                <Link href='#!'>Căn hộ, Nhà trọ, Chung cư</Link>
              </li>
              <li>
                <Link href='#!'>Toà nhà văn phòng - Khách sạn</Link>
              </li>
            </ul>
          </li>
          <li className='hover:text-[#cca539]'>
            <Link href='#!'>BÁO GIÁ</Link>
          </li>
          <li className='hover:text-[#cca539]'>
            <Link href='#!'>KIẾN THỨC</Link>
          </li>
        </ul>
        <div>
          <span>0972 910 046</span>
        </div>
      </div>
    </div>
  )
}

export default Header
