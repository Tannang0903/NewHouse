'use client'

import Link from 'next/link'
import classNames from 'classnames'
import { useState } from 'react'
import { routes } from '@/constants/routes'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)

  return (
    <div
      className={classNames(
        'transition-all duration-300 fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center',
        { 'translate-x-0': isOpen, 'translate-x-full': !isOpen }
      )}
    >
      <div className='bg-white w-full h-full overflow-auto transform transition-transform duration-300 flex flex-col'>
        <ul className='flex flex-col font-medium mt-[80px] rounded-lg text-[#191825]/50'>
          <Link
            href={routes.HOME}
            className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
            onClick={onClose}
          >
            <i className='fa-solid fa-house w-6 text-center'></i>
            <span>TRANG CHỦ</span>
          </Link>
          <Link
            href={routes.INTRODUCE}
            className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
            onClick={onClose}
          >
            <i className='fa-solid fa-marker w-6 text-center'></i>
            <span>GIỚI THIỆU</span>
          </Link>
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
            <ul className='flex flex-col text-sm text-[#191825]/50 mt-2'>
              <Link
                href={routes.SERVICES.DESIGN}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thiết kế nhà phố, villa, nội thất,...
              </Link>
              <Link
                href={routes.SERVICES.ROUGH_PARTS_CONSTRUCTION}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thi công phần thô
              </Link>
              <Link
                href={routes.SERVICES.COMPLETED_CONSTRUCTION}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thi công phần hoàn thiện
              </Link>
              <Link
                href={routes.SERVICES.DESIGN_AND_CONSTRUCTION}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thiết kế và thi công trọn gói
              </Link>
              <Link
                href={routes.SERVICES.RENOVATION}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Cải tạo công trình, nhà ở
              </Link>
              <Link
                href={routes.SERVICES.CONSULTING}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Tư vấn xây dựng, xin giấy phép xây dựng
              </Link>
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
            <ul className='flex flex-col text-sm text-[#191825]/50 mt-2'>
              <Link
                href={routes.PROJECT.TOWNHOUSE}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Nhà phố
              </Link>
              <Link
                href={routes.PROJECT.VILLA}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Villa - Biệt thự
              </Link>
              <Link
                href={routes.PROJECT.FACADE_DESIGN}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thiết kế mặt tiền
              </Link>
              <Link
                href={routes.PROJECT.INTERIOR_DESIGN}
                onClick={onClose}
                className='py-3 hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 pl-10'
              >
                Thiết kế nội thất
              </Link>
            </ul>
          )}
          <Link
            href='#'
            className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
            onClick={onClose}
          >
            <i className='fa-solid fa-circle-dollar-to-slot w-6 text-center'></i>
            <span>BÁO GIÁ</span>
          </Link>
          <Link
            href={routes.BLOG}
            className='hover:text-[#cca539] hover:bg-[#fbf7ed] cursor-pointer transition-all duration-300 p-4 flex items-center gap-2'
            onClick={onClose}
          >
            <i className='fa-solid fa-newspaper w-6 text-center'></i>
            <span>BLOG</span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default MobileMenu
