'use client'

import Link from 'next/link'
import NavLink from 'next/link'
import Image from 'next/image'
import logo from '@/assets/image/logo.png'
import { Fragment } from '@emotion/react/jsx-runtime'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Fragment>
      <div>
        <header
          className={classNames('fixed top-0 w-full bg-[#161616] z-[100] xl:px-36 lg:px-20 md:px-14 max-md:px-5', {})}
        >
          <div className='h-[80px] max-w-[1200px] w-full flex items-center justify-between m-auto text-white'>
            <Link href={'#'}>
              <Image src={logo} alt='logo-new-house' className='w-[60px] h-[60px] rounded-full' />
            </Link>
            <ul className='xl:flex md:flex lg:flex hidden gap-8 list-none text-[14px] h-full items-center'>
              <li className='hover:text-[#cca539] h-full flex items-center'>
                <Link href='/home'>TRANG CHỦ</Link>
              </li>
              <li className='hover:text-[#cca539] h-full flex items-center'>
                <Link href='/introduce'>GIỚI THIỆU</Link>
              </li>
              <li className='group relative hover:text-[#cca539] h-full flex items-center'>
                <p className='menu-hover cursor-pointer'>DỊCH VỤ</p>
                <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/service/design'>Thiết kế nhà phố, villa, nội thất,...</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/service/rough-parts-construction'>Thi công phần thô</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/service/completed-construction'>Thi công phần hoàn thiện</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/service/design-and-construction'>Thiết kế và thi công trọn gói</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/service/renovation'>Cải tạo công trình, nhà ở</Link>
                  </li>
                  <li className='py-[8px] px-4 hover:text-[#cca539]'>
                    <Link href='/service/consulting'>Tư vấn xây dựng, xin giấy phép xây dựng</Link>
                  </li>
                </ul>
              </li>
              <li className='group relative hover:text-[#cca539] h-full flex items-center'>
                <p className='menu-hover cursor-pointer'>DỰ ÁN</p>
                <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/project/town-house'>Nhà phố</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/project/villa'>Villa - Biệt thự</Link>
                  </li>
                  <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
                    <Link href='/project/facade-design'>Thiết kế mặt tiền</Link>
                  </li>
                  <li className='py-[8px] px-4 hover:text-[#cca539]'>
                    <Link href='/project/interior-design'>Thiết kế nội thất</Link>
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
            <div className='xl:flex lg:flex md:flex hidden items-center gap-4'>
              <span className='xl:flex lg:flex hidden'>0932.511.898</span>
              <i className='fa-brands fa-windows text-[40px]'></i>
            </div>
            <button
              className='text-[2.8rem] transition-all hover:text-[#cca539] xl:hidden lg:hidden md:hidden p-4 rounded-[6px] hover:bg-[#cca539]/10'
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
            </button>
          </div>
        </header>
        <div
          className={classNames(
            'transition-all duration-300 fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center',
            {
              'translate-x-0': isMenuOpen,
              'translate-x-full': !isMenuOpen,
            }
          )}
        >
          <div className='bg-white w-full h-full overflow-auto transform transition-transform duration-300 flex flex-col'>
            <ul className='flex flex-col font-medium mt-[80px] rounded-lg text-[#191825]/50'>
              <NavLink
                href='/home'
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={handleMenuToggle}
              >
                <i className='fa-solid fa-house w-6 text-center'></i>
                <span>TRANG CHỦ</span>
              </NavLink>
              <NavLink
                href='/introduce'
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={handleMenuToggle}
              >
                <i className='fa-solid fa-marker w-6 text-center'></i>
                <span>GIỚI THIỆU</span>
              </NavLink>
              <div
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
              >
                <i className='fa-solid fa-headset w-6 text-center'></i>
                <span>DỊCH VỤ</span>
                <i
                  className={classNames('fa-solid ml-auto transition-transform duration-300', {
                    'fa-chevron-up rotate-180': isServiceDropdownOpen,
                    'fa-chevron-down': !isServiceDropdownOpen,
                  })}
                />
              </div>
              {isServiceDropdownOpen && (
                <ul
                  className={classNames(
                    'flex flex-col text-sm text-[#191825]/50 overflow-hidden transition-all duration-500 ease-in-out',
                    {
                      'opacity-100 mt-2': isServiceDropdownOpen,
                      'opacity-0': !isServiceDropdownOpen,
                    }
                  )}
                >
                  <NavLink
                    href='/service/design'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thiết kế nhà phố, villa, nội thất,...
                  </NavLink>
                  <NavLink
                    href='/service/rough-parts-construction'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thi công phần thô
                  </NavLink>
                  <NavLink
                    href='/service/completed-construction'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thi công phần hoàn thiện
                  </NavLink>
                  <NavLink
                    href='/service/design-and-construction'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thiết kế và thi công trọn gói
                  </NavLink>
                  <NavLink
                    href='/service/renovation'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Cải tạo công trình, nhà ở
                  </NavLink>
                  <NavLink
                    href='/service/consulting'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Tư vấn xây dựng, xin giấy phép xây dựng
                  </NavLink>
                </ul>
              )}
              <div
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={() => setIsProjectDropdownOpen((prev) => !prev)}
              >
                <i className='fa-solid fa-person-digging w-6 text-center'></i>
                <span>DỰ ÁN</span>
                <i
                  className={classNames('fa-solid ml-auto transition-transform duration-300', {
                    'fa-chevron-up rotate-180': isProjectDropdownOpen,
                    'fa-chevron-down': !isProjectDropdownOpen,
                  })}
                />
              </div>
              {isProjectDropdownOpen && (
                <ul
                  className={classNames(
                    'flex flex-col text-sm text-[#191825]/50 overflow-hidden transition-all duration-500 ease-in-out',
                    {
                      'opacity-100 mt-2': isProjectDropdownOpen,
                      'opacity-0': !isProjectDropdownOpen,
                    }
                  )}
                >
                  <NavLink
                    href='/project/town-house'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Nhà phố
                  </NavLink>
                  <NavLink
                    href='/project/villa'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Villa - Biệt thự
                  </NavLink>
                  <NavLink
                    href='/project/facade-design'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thiết kế mặt tiền
                  </NavLink>
                  <NavLink
                    href='/project/interior-design'
                    onClick={handleMenuToggle}
                    className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
                  >
                    Thiết kế nội thất
                  </NavLink>
                </ul>
              )}
              <NavLink
                href=''
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={handleMenuToggle}
              >
                <i className='fa-solid fa-circle-dollar-to-slot w-6 text-center'></i>
                <span>BÁO GIÁ</span>
              </NavLink>
              <NavLink
                href=''
                className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
                onClick={handleMenuToggle}
              >
                <i className='fa-solid fa-book-atlas  w-6 text-center'></i>
                <span>KIẾN THỨC</span>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
