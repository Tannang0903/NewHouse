import { routes } from '@/constants/routes'
import Link from 'next/link'

const DesktopMenu = () => {
  return (
    <ul className='xl:flex md:flex lg:flex hidden gap-8 list-none text-[14px] h-full items-center'>
      <li className='hover:text-[#cca539] h-full flex items-center'>
        <Link href={routes.HOME}>TRANG CHỦ</Link>
      </li>
      <li className='hover:text-[#cca539] h-full flex items-center'>
        <Link href={routes.INTRODUCE}>GIỚI THIỆU</Link>
      </li>
      <li className='group relative hover:text-[#cca539] h-full flex items-center'>
        <p className='menu-hover cursor-pointer'>DỊCH VỤ</p>
        <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.SERVICES.DESIGN}>Thiết kế nhà phố, villa, nội thất,...</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.SERVICES.ROUGH_PARTS_CONSTRUCTION}>Thi công phần thô</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.SERVICES.COMPLETED_CONSTRUCTION}>Thi công phần hoàn thiện</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.SERVICES.DESIGN_AND_CONSTRUCTION}>Thiết kế và thi công trọn gói</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.SERVICES.RENOVATION}>Cải tạo công trình, nhà ở</Link>
          </li>
          <li className='py-[8px] px-4 hover:text-[#cca539]'>
            <Link href={routes.SERVICES.CONSULTING}>Tư vấn xây dựng, xin giấy phép xây dựng</Link>
          </li>
        </ul>
      </li>
      <li className='group relative hover:text-[#cca539] h-full flex items-center'>
        <p className='menu-hover cursor-pointer'>DỰ ÁN</p>
        <ul className='invisible absolute top-[80px] left-[50%] z-50 flex flex-col bg-[#111] text-white shadow-xl group-hover:visible w-[240px] translate-x-[-50%]'>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.PROJECT.TOWNHOUSE}>Nhà phố</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.PROJECT.VILLA}>Villa - Biệt thự</Link>
          </li>
          <li className='py-[8px] px-4 border-b-[1px] border-[#717171] hover:text-[#cca539]'>
            <Link href={routes.PROJECT.FACADE_DESIGN}>Thiết kế mặt tiền</Link>
          </li>
          <li className='py-[8px] px-4 hover:text-[#cca539]'>
            <Link href={routes.PROJECT.INTERIOR_DESIGN}>Thiết kế nội thất</Link>
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
  )
}

export default DesktopMenu
