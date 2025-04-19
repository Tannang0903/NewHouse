'use client'

import { memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { constructionWorks } from '../api/mockData'
import commitment from '@/assets/image/commitment.png'
import staff1 from '@/assets/image/staff-1.jpg'
import staff7 from '@/assets/image/staff-7.jpg'

const PageTitle = memo(() => (
  <h1 className='font-semibold text-[24px]'>
    Công ty TNHH Thiết kế và Xây dựng New House Đơn vị TƯ VẤN - THIẾT KẾ - THI CÔNG xây dựng trọn gói uy tín.
  </h1>
))

const StaffImages = memo(() => (
  <div className='flex flex-col gap-4'>
    <ImageWithLoading
      src={staff1}
      alt='Đội ngũ nhân viên New House'
      width={1200}
      height={600}
      className='object-cover object-bottom h-[600px] w-full'
      priority
    />
    <ImageWithLoading
      src={staff7}
      alt='Đội ngũ kỹ sư New House'
      width={1200}
      height={600}
      className='object-cover object-bottom h-[600px] w-full'
    />
  </div>
))

interface ImageWithLoadingProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

const ImageWithLoading = memo(({ src, alt, className = '', ...props }: ImageWithLoadingProps) => (
  <div className='relative'>
    <Image
      src={src}
      alt={alt}
      className={`${className} transition-all duration-300`}
      placeholder='blur'
      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPDY2ODYyTEhMR0BGRlNCRkJHYGFjYWM4OTtbXV16Y3ZlYWVtXWv/2wBDARUXFyAeIBohHB8hLSgrLW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      {...props}
    />
  </div>
))

const AboutSection = memo(() => (
  <div className='flex flex-col gap-4'>
    <h2 className='text-[20px] font-semibold'>1. HIỂU VỀ NEW HOUSE</h2>
    <ul className='flex flex-col gap-4 font-light text-justify'>
      <li>
        Bằng kinh nghiệm và năng lực của những người sáng lập, New House tự hào là nhà thầu đáng tin cậy cung cấp các
        giải pháp kiến trúc hiện đại - xây dựng các công trình dân dụng với công năng hiệu quả và bền vững theo thời
        gian.
      </li>
      <li>
        Chúng tôi tin rằng, bằng tâm huyết cùng sự am hiểu sâu sắc về Kiến trúc và Xây dựng sẽ góp phần đáp ứng mọi yêu
        cầu và sự hài lòng tối đa của Quý khách hàng từ việc tư vấn đến giai đoạn hoàn thiện công trình và{' '}
        <b>&ldquo;Chìa Khóa Trao Tay&rdquo;.</b>
      </li>
      <li>
        Chúng tôi coi việc xây dựng ngôi nhà là một hành trình quan trọng, nơi mà mỗi không gian đều phản ánh đẳng cấp
        và phong cách sống của chính chủ nhân, New House cam kết đồng hành và mang lại giá trị tốt nhất trong mỗi dự án
        của Quý khách hàng.
      </li>
      <li>
        Hãy để NEW HOUSE đồng hành và kiến tạo ước mơ, xây dựng tổ ấm và tạo nên những không gian sống đẹp và hạnh phúc!
      </li>
    </ul>
  </div>
))

const CoreValues = memo(() => (
  <div className='flex flex-col gap-4'>
    <h2 className='text-[20px] font-semibold'>2. GIÁ TRỊ CỐT LÕI </h2>
    <ul className='flex flex-col gap-4 font-light text-justify'>
      <li>
        <b>SÁNG TẠO:</b> Thiết kế dẫn đầu xu hướng, khác biệt, đáp ứng đúng sở thích và yêu cầu khách hàng.
      </li>
      <li>
        <b>CHUYÊN NGHIỆP:</b> Đội ngũ Kiến Trúc Sư, Kỹ Sư tâm huyết, nhiều năm kinh nghiệm, vững chuyên môn, tuân thủ
        các tiêu chuẩn kỹ thuật nghiêm ngặt, quản lý công trình chuyên nghiệp, chất lượng và bền vững.
      </li>
      <li>
        <b>TRÁCH NHIỆM:</b> Cam kết hoàn thành công trình đúng tiến độ, chất lượng và an toàn.
      </li>
      <li>
        <b>THÔNG TIN MINH BẠCH:</b> Rõ ràng và minh bạch trong thiết kế tính toán kết cấu cho tới khâu thi công. Đúng
        giá đúng chất lượng.
      </li>
      <li>
        <b>TẬN TÂM:</b> Lắng nghe, thấu hiểu và nỗ lực cống hiến hết mình vì sự hài lòng tối đa của khách hàng.
      </li>
    </ul>
  </div>
))

const ProjectGallery = memo(() => (
  <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4'>
    {constructionWorks.items.slice(0, 6).map((item) => (
      <div key={item.id} className='relative w-full h-[400px] overflow-hidden group'>
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className='object-cover object-bottom transition-transform duration-300 group-hover:scale-105'
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPDY2ODYyTEhMR0BGRlNCRkJHYGFjYWM4OTtbXV16Y3ZlYWVtXWv/2wBDARUXFyAeIBohHB8hLSgrLW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        />
      </div>
    ))}
  </div>
))

const IntroducePage = () => {
  return (
    <article className='max-w-[1200px] w-full m-auto py-10 flex flex-col gap-6 xl:px-0 lg:px-0 md:px-0 px-2'>
      <PageTitle />
      <StaffImages />
      <AboutSection />
      <CoreValues />
      <div className='flex flex-col gap-4'>
        <ImageWithLoading src={commitment} alt='Cam kết của New House' className='object-cover object-bottom w-full' />
      </div>
      <ProjectGallery />
    </article>
  )
}

PageTitle.displayName = 'PageTitle'
StaffImages.displayName = 'StaffImages'
ImageWithLoading.displayName = 'ImageWithLoading'
AboutSection.displayName = 'AboutSection'
CoreValues.displayName = 'CoreValues'
ProjectGallery.displayName = 'ProjectGallery'
IntroducePage.displayName = 'IntroducePage'

export default memo(IntroducePage)
