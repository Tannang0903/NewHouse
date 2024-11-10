'use client'
import { constructionWorks, designWorks } from '@/app/api/mockData'
import CompanyInfo from './company-info'
import ConstructionSlider from './construction-slider'

const Container = () => {
  return (
    <div className='mt-[80px] bg-black'>
      <CompanyInfo />
      <ConstructionSlider constructions={designWorks} />
      <ConstructionSlider constructions={constructionWorks} />
    </div>
  )
}

export default Container
