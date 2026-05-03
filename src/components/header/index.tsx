'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { routes } from '@/constants/routes'
import NextImage from '../common/NextImage'
import logo from '@/assets/image/logo.png'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import { IconHamburger } from '@/components/icons'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <div>
        <header className='fixed top-0 w-full bg-[#161616] z-[100] xl:px-36 lg:px-20 md:px-14 max-md:px-2'>
          <div className='h-[80px] max-w-[1200px] w-full flex items-center justify-between m-auto text-white'>
            <Link href={routes.HOME}>
              <NextImage src={logo} alt='logo-new-house' width={60} height={60} className='rounded-full' />
            </Link>
            <DesktopMenu />
            <div className='xl:flex lg:flex md:flex hidden items-center gap-4'>
              <span className='xl:flex lg:flex hidden'>0932.511.898</span>
              <i className='fa-brands fa-windows text-[40px]'></i>
            </div>
            <button
              className='text-[2.8rem] transition-all hover:text-[#cca539] xl:hidden lg:hidden md:hidden p-4 rounded-[6px] hover:bg-[#cca539]/10'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IconHamburger className='lg:w-8 lg:h-8 w-6 h-6' />
            </button>
          </div>
        </header>
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </Fragment>
  )
}

export default Header
