import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'
import commitment from '@/assets/image/commitment.png'
import Image from 'next/image'
import { constructionWorks } from '../api/mockData'
import staff1 from '@/assets/image/staff-1.jpg'
import staff7 from '@/assets/image/staff-7.jpg'

const IntroducePage = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <div className='max-w-[1200px] w-full m-auto py-10 flex flex-col gap-6'>
          <h1 className='font-semibold text-[24px]'>
            Công ty TNHH Thiết kế và Xây dựng New House Đơn vị TƯ VẤN - THIẾT KẾ - THI CÔNG xây dựng trọn gói uy tín.
          </h1>
          <div className='flex flex-col gap-4'>
            <Image
              src={staff1}
              alt='staff'
              width={1200}
              height={600}
              className='object-cover object-bottom h-[600px] w-full'
            />
            <Image
              src={staff7}
              alt='ui/ux review check'
              width={1200}
              height={600}
              className='object-cover object-bottom h-[600px] w-full'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-[20px] font-semibold'>1. HIỂU VỀ NEW HOUSE</h2>
            <ul className='flex flex-col gap-4 font-light text-justify'>
              <li>
                Bằng kinh nghiệm và năng lực của những người sáng lập, New House tự hào là nhà thầu đáng tin cậy cung
                cấp các giải pháp kiến trúc hiện đại - xây dựng các công trình dân dụng với công năng hiệu quả và bền
                vững theo thời gian.
              </li>
              <li>
                Chúng tôi tin rằng, bằng tâm huyết cùng sự am hiểu sâu sắc về Kiến trúc và Xây dựng sẽ góp phần đáp ứng
                mọi yêu cầu và sự hài lòng tối đa của Quý khách hàng từ việc tư vấn đến giai đoạn hoàn thiện công trình
                và <b>&ldquo;Chìa Khóa Trao Tay&rdquo;.</b>
              </li>
              <li>
                Chúng tôi coi việc xây dựng ngôi nhà là một hành trình quan trọng, nơi mà mỗi không gian đều phản ánh
                đẳng cấp và phong cách sống của chính chủ nhân, New House cam kết đồng hành và mang lại giá trị tốt nhất
                trong mỗi dự án của Quý khách hàng.
              </li>
              <li>
                Hãy để NEW HOUSE đồng hành và kiến tạo ước mơ, xây dựng tổ ấm và tạo nên những không gian sống đẹp và
                hạnh phúc!
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-[20px] font-semibold'>2. GIÁ TRỊ CỐT LÕI </h2>
            <ul className='flex flex-col gap-4 font-light text-justify'>
              <li>
                <b>SÁNG TẠO:</b> Thiết kế dẫn đầu xu hướng, khác biệt, đáp ứng đúng sở thích và yêu cầu khách hàng.
              </li>
              <li>
                <b>CHUYÊN NGHIỆP:</b> Đội ngũ Kiến Trúc Sư, Kỹ Sư tâm huyết, nhiều năm kinh nghiệm, vững chuyên môn,
                tuân thủ các tiêu chuẩn kỹ thuật nghiêm ngặt, quản lý công trình chuyên nghiệp, chất lượng và bền vững.
              </li>
              <li>
                <b>TRÁCH NHIỆM:</b> Cam kết hoàn thành công trình đúng tiến độ, chất lượng và an toàn.
              </li>
              <li>
                <b>THÔNG TIN MINH BẠCH:</b> Rõ ràng và minh bạch trong thiết kế tính toán kết cấu cho tới khâu thi công.
                Đúng giá đúng chất lượng.
              </li>
              <li>
                <b>TẬN TÂM:</b> Lắng nghe, thấu hiểu và nỗ lực cống hiến hết mình vì sự hài lòng tối đa của khách hàng.
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <Image src={commitment} alt='commitment' className='object-cover object-bottom w-full' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {constructionWorks.items.slice(0, 6).map((item) => (
              <div key={item.id} className='relative w-full h-[400px]'>
                <Image src={item.imageUrl} alt={item.name} fill className='object-cover object-bottom' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default IntroducePage
