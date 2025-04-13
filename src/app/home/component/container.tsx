'use client'
import { constructionWorks, designWorks } from '@/app/api/mockData'
import CompanyInfo from './company-info'
import ConstructionSlider from './construction-slider'

const Container = () => {
  return (
    <div className='mt-[80px] bg-black'>
      <CompanyInfo />
      <ConstructionSlider
        title={designWorks.title}
        description={designWorks.description}
        constructions={designWorks.items}
      />
      <ConstructionSlider
        title={constructionWorks.title}
        description={constructionWorks.description}
        constructions={constructionWorks.items}
      />
    </div>
  )
}

export default Container
