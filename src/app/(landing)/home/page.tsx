import React from 'react'
import CompanyInfo from './component/company-info'
import ConstructionSlider from './component/construction-slider'
import { getConstructionWorks, getDesignWorks, getInteriorWorks } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [designWorks, constructionWorks, interiorWorks] = await Promise.all([
    getDesignWorks(),
    getConstructionWorks(),
    getInteriorWorks(),
  ])

  const designImages = designWorks.map((w) => w.images[0]).filter(Boolean) as string[]

  return (
    <div>
      <div className='bg-black xl:px-0 lg:px-0 md:px-0 px-2'>
        <CompanyInfo designImages={designImages} />
        <ConstructionSlider
          title='CÔNG TRÌNH THIẾT KẾ'
          description='Mỗi năm, NEW HOUSE thực hiện hàng trăm công trình thiết kế ở mọi miền đất nước. Phong cách thiết kế chính của NEW HOUSE là hiện đại - tối giản - tiện nghi - thông thoáng.'
          constructions={designWorks}
        />
        <ConstructionSlider
          title='CÔNG TRÌNH THI CÔNG'
          description='Tất cả công trình thi công do NEW HOUSE thực hiện đều đảm bảo những giải pháp mới và tối ưu nhất nhằm mang đến một sản phẩm kiên cố, bền vững.'
          constructions={constructionWorks}
        />
        <ConstructionSlider
          title='NỘI THẤT'
          description='NEW HOUSE cung cấp giải pháp thiết kế và thi công nội thất trọn gói, tối ưu công năng sử dụng và tạo nên không gian sống đẹp, tiện nghi, phù hợp với phong cách sống của từng gia đình.'
          constructions={interiorWorks}
        />
      </div>
    </div>
  )
}
