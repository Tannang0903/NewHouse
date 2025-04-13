'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/image/logo.png'
import { useState } from 'react'
import classNames from 'classnames'
import Button from './button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <header className='fixed top-0 w-full bg-[#161616] z-[100]'>
        <div className='h-[80px] max-w-[1200px] w-full flex items-center justify-between m-auto text-white'>
          <Link href={'#'}>
            <Image src={logo} alt='logo-new-house' className='w-[60px] h-[60px] rounded-full' />
          </Link>
          <ul className='flex gap-8 list-none text-[14px] h-full items-center '>
            <li className='hover:text-[#cca539] h-full flex items-center'>
              <Link href='#'>TRANG CHỦ</Link>
            </li>
            <li className='hover:text-[#cca539] h-full flex items-center'>
              <Link href='#'>GIỚI THIỆU</Link>
            </li>
            <li className='group relative hover:text-[#cca539] h-full flex items-center'>
              <Link href='#' className='menu-hover'>
                DỊCH VỤ
              </Link>
              <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Thiết kế & thi công nội thất</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Thiết kế kiến trúc</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Thi công phần thô</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Thi công hoàn thiện</Link>
                </li>
                <li className='py-[8px] px-4 border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Xây nhà trọn gói Đà Nẵng</Link>
                </li>
              </ul>
            </li>
            <li className='group relative hover:text-[#cca539] h-full flex items-center'>
              <Link href='#' className='menu-hover'>
                DỰ ÁN
              </Link>
              <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Nhà 2 tầng</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Nhà 3 tầng</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Nhà 4 tầng</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Mẫu Nhà Cấp 4 Đẹp</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Căn hộ, Nhà trọ, Chung cư</Link>
                </li>
                <li className='py-[8px] px-4 border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Toà nhà văn phòng - Khách sạn</Link>
                </li>
              </ul>
            </li>
            <li className='hover:text-[#cca539] h-full flex items-center'>
              <Link href='#'>BÁO GIÁ</Link>
            </li>
            <li className='group relative hover:text-[#cca539] h-full flex items-center'>
              <Link href='#' className='menu-hover'>
                KIẾN THỨC
              </Link>
              <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Kiến thức xây nhà</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Kiến thức phong thuỷ</Link>
                </li>
                <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Cẩm nang thi công</Link>
                </li>
                <li className='py-[8px] px-4 border-[#717171] hover:text-[#cca539]'>
                  <Link href='#'>Câu hỏi thường gặp</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className='flex items-center gap-4'>
            <span>0932.511.898</span>
            <i className='fa-brands fa-windows text-[40px]'></i>
          </div>
        </div>
      </header>
      {/* <div
        className={classNames(
          'transition-all duration-300 fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center',
          {
            'translate-x-0': isMenuOpen,
            'translate-x-full': !isMenuOpen,
          }
        )}
      >
        <div className='bg-white w-full  h-full transform transition-transform duration-300 flex flex-col'>
          <div className='p-4 flex items-center gap-12'>
            <Button
              classNameButton='text-[2.8rem] transition-all hover:text-[#26C6DA] xl:hidden space-y-4'
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='lg:w-8 lg:h-8 w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
              >
                <path d='M4 6l16 0'></path>
                <path d='M4 12l16 0'></path>
                <path d='M4 18l16 0'></path>
              </svg>
            </Button>
          </div>

          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50  text-[#191825]/50'>
            <Link
              href={'./#'}
              className='cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2'
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              <span>Trang chủ</span>
            </Link>
            <NavLink
              to={path.list_events}
              className={({ isActive }) =>
                classNames(
                  'cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2',
                  {
                    'text-[#26C6DA] bg-slate-300': isActive
                  }
                )
              }
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                />
              </svg>

              <span>Sự kiện</span>
            </NavLink>
            <NavLink
              to={path.calendar_clients}
              className={({ isActive }) =>
                classNames(
                  'cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2',
                  {
                    'text-[#26C6DA] bg-slate-300': isActive
                  }
                )
              }
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                />
              </svg>

              <span>Lịch</span>
            </NavLink>
          </ul>
        </div>
      </div> */}
    </div>
  )
}

export default Header
