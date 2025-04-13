'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/image/logo.png'

const Footer = () => {
  return (
    <div className='w-full bg-[#161616]'>
      <div className='max-w-[1280px] m-auto grid grid-cols-4 gap-8 text-white'>
        <div className='col-span-1'>
          <div>
            <Link href={'#'}>
              <Image src={logo} alt='logo-new-house' className='w-[60px] h-[60px] rounded-full' />
            </Link>
          </div>
          <div>
            <ul>
              <li>H</li>
              <li>Y</li>
              <li>T</li>
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className=''>
            <h2>CÔNG TY TNHH THIẾT KẾ VÀ XÂY DỰNG SBS</h2>
            <ul>
              <li>SBS HOUSE đơn vị thiết kế thi công trọn gói miền Trung và miền Nam</li>
            </ul>
          </div>
          <div className=''>
            <h2>DỊCH VỤ</h2>
            <ul>
              <li>Thiết kế và thi công nội thất</li>
              <li>Thiết kế kiến trúc</li>
              <li>Thi công phần thô</li>
              <li>Thi công phần hoàn thiện</li>
              <li>Thi công trọn gói</li>
            </ul>
          </div>
          <div className=''>
            <h2>MẪU NHÀ ĐẸP</h2>
            <ul>
              <li>Nhà phố 2 tầng</li>
              <li>Nhà phố 3 tầng</li>
              <li>Nhà phố 4 tầng</li>
              <li>Biệt thự đẹp</li>
              <li>Nhà cấp 4</li>
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className=''>
            <h2>THÔNG TIN LIÊN HỆ</h2>
            <ul>
              <li>0972 910 046</li>
              <li>Trụ sở chính: 284-286 Lê Quảng Chí, Đà Nẵng</li>
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className=''>
            <h2>ĐỐI TÁC TIN CẬY</h2>
            <ul>
              <li>SBS VILLA</li>
              <li>SBS DOOR</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
